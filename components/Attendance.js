import { useState, useEffect } from 'react';
import styles from '../styles/Attendance.module.css';

const Attendance = () => {
    const [attendanceData, setAttendanceData] = useState({});
    const [loggedInUsername, setLoggedInUsername] = useState('');

    useEffect(() => {
        // Get logged-in username from localStorage
        const username = localStorage.getItem('username');
        if (username) {
            setLoggedInUsername(username);
            // Fetch attendance data for the logged-in user
            fetchAttendanceData(username);
        }
    }, []);

    const fetchAttendanceData = async (username) => {
        try {
            // Fetch attendance data for the logged-in user from backend APIs
            const responses = await Promise.all([
                fetch(`http://127.0.0.1:8000/api/attendancechem11`),
                fetch(`http://127.0.0.1:8000/api/attendancechem12`),
                fetch(`http://127.0.0.1:8000/api/attendancecs11`),
                fetch(`http://127.0.0.1:8000/api/attendancecs12`)
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
                // Filter data to get only the attendance of the logged-in user
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
            {Object.entries(attendanceData).map(([subject, data]) => (
                <div key={subject} className={styles.subjectSection}>
                    {/* <h2>{subject}</h2> */}
                    {data.map((record, index) => (
                        <div key={index} className={styles.attendanceData}>
                            <h4>Subject: {record.subject}</h4>
                            <p>Username: {record.username}</p>
                            <p>Total Classes: {record.total_classes}</p>
                            <p>Classes Attended: {record.classes_attended}</p>
                            <p>Absent Days: {record.absent_days}</p>
                            <p>Mobile: {record.mobile}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Attendance;
