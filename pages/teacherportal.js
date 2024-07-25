import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../styles/TeacherPortal.module.css";
import { useRouter } from 'next/router';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ArcElement,
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
            const allPerformanceData = performanceResults.flat();
    
            // Filter out duplicate entries based on the 'title' field
            const uniquePerformanceData = allPerformanceData.filter((v, i, a) => 
                a.findIndex(t => t.title === v.title) === i
            );
    
            setPerformanceData(uniquePerformanceData);

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

    // const getChartData = () => {
    //     if (!performanceData) return null;

    //     const labels = performanceData.map(data => data.title);
    //     const datasets = [
    //         {
    //             label: 'Marks Obtained',
    //             data: performanceData.map(data => data.marks_obtained),
    //             borderColor: 'rgba(75, 192, 192, 0.8)',
    //             backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //             tension: 0.1
    //         },
    //         {
    //             label: 'Total Marks',
    //             data: performanceData.map(data => data.total_marks),
    //             borderColor: 'rgba(255, 99, 132, 0.8)',
    //             backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //             tension: 0.1
    //         }
    //     ];

    //     return { labels, datasets };
    // };

    const getPieChartData = (subject) => {
        if (!userData || !userData[subject]) return null;

        const { classes_attended, absent_days } = userData[subject];
        const total = classes_attended + absent_days;

        return {
            labels: ['Classes Attended', 'Absent Days'],
            datasets: [
                {
                    data: [classes_attended, absent_days],
                    backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                    borderWidth: 1,
                },
            ],
        };
    };

    // const chartOptions = {
    //     responsive: true,
    //     plugins: {
    //         legend: {
    //             position: 'top',
    //         },
    //         title: {
    //             display: true,
    //             text: 'Student Performance',
    //             font: {
    //                 size: 18,
    //                 weight: 'bold',
    //             }
    //         },
    //     },
    // };

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Attendance',
                font: {
                    size: 16,
                    weight: 'bold',
                }
            },
        },
    };

    const getChartData = () => {
        if (!performanceData || performanceData.length === 0) return null;
    
        const labels = performanceData.map(data => data.title);
        const marksObtained = performanceData.map(data => data.marks_obtained);
        const totalMarks = performanceData.map(data => data.total_marks);
    
        return {
            labels,
            datasets: [
                {
                    label: 'Marks Obtained',
                    data: marksObtained,
                    backgroundColor: 'rgba(75, 192, 192, 0.8)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    borderRadius: 10,
                    barThickness: 30,
                },
                {
                    label: 'Total Marks',
                    data: totalMarks,
                    backgroundColor: 'rgba(255, 99, 132, 0.8)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    borderRadius: 10,
                    barThickness: 30,
                },
            ],
        };
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Student Performance',
                font: {
                    size: 18,
                    weight: 'bold',
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 20
                }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeOutBounce'
        }
    };


    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Teacher Portal</h1>
                <button onClick={handleLogout} className={styles.logoutBtn}>Log Out</button>
            </header>

            <main className={styles.main}>
                <section className={styles.studentSelect}>
                    <h2 className={styles.sectionHeading}>Select Student</h2>
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
                        <h2 className={styles.sectionHeading}>Student Profile</h2>
                        <div className={styles.profileGrid}>
                            <div className={styles.profileCard}><strong>Name:</strong> {studentProfile.name}</div>
                            <div className={styles.profileCard}><strong>Username:</strong> {studentProfile.username}</div>
                            <div className={styles.profileCard}><strong>Fee Status:</strong> {studentProfile.fees}</div>
                            <div className={styles.profileCard}><strong>Class:</strong> {studentProfile.clas}</div>
                            <div className={styles.profileCard}><strong>Stream:</strong> {studentProfile.stream}</div>
                            <div className={styles.profileCard}><strong>Subjects:</strong> {studentProfile.subjects}</div>
                            <div className={styles.profileCard}><strong>Mobile:</strong> {studentProfile.mobile}</div>
                            <div className={styles.profileCard}><strong>Parent's Mobile:</strong> {studentProfile.par_mobile}</div>
                            <div className={styles.profileCard}><strong>Email:</strong> {studentProfile.email}</div>
                        </div>
                    </section>
                )}

                {userData && (
                    <section className={styles.attendance}>
                        <h2 className={styles.sectionHeading}>Attendance</h2>
                        <div className={styles.attendanceGrid}>
                            {['chem11', 'chem12', 'cs11', 'cs12'].map((subject, index) => {
                                if (userData[subject] !== "Data not available") {
                                    return (
                                        <div key={index} className={styles.attendanceCard}>
                                            <h3 className={styles.subHeading}>
                                                {['Chemistry 11', 'Chemistry 12', 'Computer Science 11', 'Computer Science 12'][index]}
                                            </h3>
                                            <div className={styles.pieChartContainer}>
                                                <Pie data={getPieChartData(subject)} options={pieChartOptions} />
                                            </div>
                                            <p>Total Classes: {userData[subject].total_classes}</p>
                                            <p>Classes Attended: {userData[subject].classes_attended}</p>
                                            <p>Absent Days: {userData[subject].absent_days}</p>
                                            <p><strong>Absent Dates:</strong></p>
                                            <div className={styles.absentDatesContainer}>
                                                {userData[subject].absent_date.split(',').map((date, index) => (
                                                    <span key={index} className={styles.absentDate}>
                                                        {date.trim() === 'unknown' ? 'Unknown' : new Date(date.trim()).toLocaleDateString()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </section>
                )}

                {performanceData && (
                    <section className={styles.performance}>
                        <h2 className={styles.sectionHeading}>Performance</h2>
                        <div className={styles.performanceGraph}>
                            <Bar options={chartOptions} data={getChartData()} height={300} />
                        </div>
                        <div className={styles.reportCard}>
                            <h3 className={styles.subHeading}>Report Card</h3>
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