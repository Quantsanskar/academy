import { useState, useEffect } from 'react';
import styles from '../styles/Attendance.module.css';

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

    return (
        <div className={styles.attendanceContainer}>
            <h1 className={styles.title}>Attendance Report</h1>
            <div className={styles.userInfo}>
                <p>Student: <span>{loggedInUsername}</span></p>
            </div>
            {Object.entries(attendanceData).map(([subject, data]) => (
                <div key={subject} className={styles.subjectSection}>
                    <h2 className={styles.subjectTitle}>{subject}</h2>
                    {data.map((record, index) => (
                        <div key={index} className={styles.attendanceCard}>
                            <div className={styles.attendanceHeader}>
                                <h3>{record.subject}</h3>
                                <p className={styles.mobile}>Mobile: {record.mobile}</p>
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
                                <span className={styles.absentValue}>{record.absent_date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Attendance;