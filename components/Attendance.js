import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '../styles/Attendance.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Attendance = () => {
    const [attendanceData, setAttendanceData] = useState({});
    const [loggedInUsername, setLoggedInUsername] = useState('');

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setLoggedInUsername(username);
            fetchAttendanceData(username);
        }
    }, []);

    const fetchAttendanceData = async (username) => {
        try {
            const responses = await Promise.all([
                fetch(`http://127.0.0.1:8000/api/attendancechem11`),
                fetch(`http://127.0.0.1:8000/api/attendancechem12`),
                fetch(`http://127.0.0.1:8000/api/attendancecs11`),
                fetch(`http://127.0.0.1:8000/api/attendancecs12`),
            ]);

            const data = await Promise.all(responses.map(async (response) => {
                if (response.ok) {
                    return await response.json();
                }
                return [];
            }));

            const subjects = ['Chemistry 11', 'Chemistry 12', 'Computer Science 11', 'Computer Science 12'];
            const attendanceObject = {};
            subjects.forEach((subject, index) => {
                const userAttendance = data[index].filter((record) => record.username === username);
                attendanceObject[subject] = userAttendance;
            });

            setAttendanceData(attendanceObject);
        } catch (error) {
            console.error('Error fetching attendance data:', error.message);
        }
    };

    const getChartData = (subject) => {
        const data = attendanceData[subject][0];
        return {
            labels: ['Classes Attended', 'Absent Days'],
            datasets: [
                {
                    label: 'Attendance',
                    data: [data.classes_attended, data.absent_days],
                    backgroundColor: ['rgba(75, 192, 192, 0.9)', 'rgba(228, 43, 43, 0.9)'],
                    borderColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
                    borderWidth: 1,
                },
            ],
        };
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Attendance Overview',
            },
        },
    };

    return (
        <div className={styles.attendanceContainer}>
            <h1 className={styles.title}>Attendance Report</h1>
            <div className={styles.userInfo}>
                <p>Student: <span>{loggedInUsername}</span></p>
            </div>
            {Object.entries(attendanceData).map(([subject, data]) => (
                <div key={subject} className={styles.subjectSection}>
                    {/* <h2 className={styles.subjectTitle}>{subject}</h2> */}
                    {data.map((record, index) => (
                        <div key={index} className={styles.attendanceCard}>
                            <div className={styles.attendanceHeader}>
                                <h3>{record.subject}</h3>
                                <p className={styles.mobile}>Mobile: {record.mobile}</p>
                            </div>
                            <div className={styles.chartContainer}>
                                <Bar data={getChartData(subject)} options={chartOptions} />
                            </div>
                            <div className={styles.attendanceStats}>
                                <div className={styles.statItem}>
                                    <span className={styles.statLabel}>Total Classes:</span>
                                    <span className={styles.statValue}>{record.total_classes}</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statLabel}>Classes Attended:</span>
                                    <span className={styles.statValue}>{record.classes_attended}</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statLabel}>Absent Days:</span>
                                    <span className={styles.statValue}>{record.absent_days}</span>
                                </div>
                            </div>
                            <div className={styles.absentDates}>
                                <span className={styles.absentLabel}>Absent Dates:</span>
                                <div className={styles.absentDatesList}>
                                    {record.absent_date.split(',').map((date, i) => (
                                        <span key={i} className={styles.absentDatePacket}>{date.trim()}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Attendance;