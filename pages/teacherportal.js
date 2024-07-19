import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../styles/TeacherPortal.module.css";
import { useRouter } from 'next/router';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const TeacherPortal = () => {
    const [students, setStudents] = useState([]);
    const [selectedUsername, setSelectedUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [studentProfile, setStudentProfile] = useState(null);
    const [performanceData, setPerformanceData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchStudents();
        checkAuthentication();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/student');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error.message);
        }
    };

    const fetchUserData = async (username) => {
        try {
            const attendanceEndpoints = [
                'http://127.0.0.1:8000/api/attendancechem11',
                'http://127.0.0.1:8000/api/attendancechem12',
                'http://127.0.0.1:8000/api/attendancecs11',
                'http://127.0.0.1:8000/api/attendancecs12'
            ];

            const userDataPromises = attendanceEndpoints.map(async (endpoint) => {
                try {
                    const response = await axios.get(endpoint);
                    const userData = response.data.find((item) => item.username === username);
                    return userData || "Data not available";
                } catch (error) {
                    console.error(`Error fetching data from ${endpoint}:`, error.message);
                    return "Data not available";
                }
            });

            const userDataValues = await Promise.all(userDataPromises);

            setUserData({
                chem11: userDataValues[0],
                chem12: userDataValues[1],
                cs11: userDataValues[2],
                cs12: userDataValues[3]
            });

            const profileData = students.find((student) => student.username === username);
            setStudentProfile(profileData);

            // Fetch performance data
            const performanceEndpoints = [
                'http://127.0.0.1:8000/api/markschem11',
                'http://127.0.0.1:8000/api/markschem12',
                'http://127.0.0.1:8000/api/markscs11',
                'http://127.0.0.1:8000/api/markscs12'
            ];

            const performancePromises = performanceEndpoints.map(async endpoint => {
                const response = await axios.get(endpoint);
                return response.data.filter(entry => entry.username === username);
            });

            const performanceResults = await Promise.all(performancePromises);
            setPerformanceData(performanceResults.flat());

        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    const handleUsernameSelect = (username) => {
        setSelectedUsername(username);
        fetchUserData(username);
    };

    const handleLogout = () => {
        router.push('/');
        localStorage.clear();
    };

    const checkAuthentication = () => {
        const isAuthenticated = localStorage.getItem('username');
        if (!isAuthenticated) {
            router.push('/');
        }
    };

    const getChartData = () => {
        if (!performanceData) return null;

        const labels = performanceData.map(data => data.title);
        const datasets = [
            {
                label: 'Marks Obtained',
                data: performanceData.map(data => data.marks_obtained),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'Total Marks',
                data: performanceData.map(data => data.total_marks),
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }
        ];

        return { labels, datasets };
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Student Performance',
            },
        },
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Teacher Portal</h1>
                <button onClick={handleLogout} className={styles.logoutBtn}>Log Out</button>
            </header>
            
            <main className={styles.main}>
                <section className={styles.studentSelect}>
                    <h2>Select Student</h2>
                    <select onChange={(e) => handleUsernameSelect(e.target.value)} className={styles.selectDropdown}>
                        <option value="">Select a student...</option>
                        {students.map((student) => (
                            <option key={student.username} value={student.username}>
                                {student.name} ({student.username})
                            </option>
                        ))}
                    </select>
                </section>

                {studentProfile && (
                    <section className={styles.studentProfile}>
                        <h2>Student Profile</h2>
                        <div className={styles.profileGrid}>
                            <div><strong>Name:</strong> {studentProfile.name}</div>
                            <div><strong>Username:</strong> {studentProfile.username}</div>
                            <div><strong>Fee Status:</strong> {studentProfile.fees}</div>
                            <div><strong>Class:</strong> {studentProfile.clas}</div>
                            <div><strong>Stream:</strong> {studentProfile.stream}</div>
                            <div><strong>Subjects:</strong> {studentProfile.subjects}</div>
                            <div><strong>Mobile:</strong> {studentProfile.mobile}</div>
                            <div><strong>Parent's Mobile:</strong> {studentProfile.par_mobile}</div>
                            <div><strong>Email:</strong> {studentProfile.email}</div>
                        </div>
                    </section>
                )}

                {userData && (
                    <section className={styles.attendance}>
                        <h2>Attendance</h2>
                        <div className={styles.attendanceGrid}>
                            {['Chemistry 11', 'Chemistry 12', 'Computer Science 11', 'Computer Science 12'].map((subject, index) => (
                                <div key={index} className={styles.attendanceCard}>
                                    <h3>{subject}</h3>
                                    {userData[Object.keys(userData)[index]] !== "Data not available" ? (
                                        <>
                                            <p>Total Classes: {userData[Object.keys(userData)[index]].total_classes}</p>
                                            <p>Classes Attended: {userData[Object.keys(userData)[index]].classes_attended}</p>
                                            <p>Absent Days: {userData[Object.keys(userData)[index]].absent_days}</p>
                                            <p>Absent Dates: {userData[Object.keys(userData)[index]].absent_date}</p>
                                        </>
                                    ) : (
                                        <p>Data not available</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {performanceData && (
                    <section className={styles.performance}>
                        <h2>Performance</h2>
                        <div className={styles.performanceGraph}>
                            <Line options={chartOptions} data={getChartData()} />
                        </div>
                        <div className={styles.reportCard}>
                            <h3>Report Card</h3>
                            <table className={styles.reportTable}>
                                <thead>
                                    <tr>
                                        <th>Subject</th>
                                        <th>Marks Obtained</th>
                                        <th>Total Marks</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {performanceData.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data.title}</td>
                                            <td>{data.marks_obtained}</td>
                                            <td>{data.total_marks}</td>
                                            <td>{data.remarks}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default TeacherPortal;