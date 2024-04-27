// Attendance.js

import { useState } from 'react';
import styles from '../styles/Attendance.module.css';

const Attendance = () => {
    // Dummy attendance data
    const [attendanceData] = useState([
        { subject: 'Chemistry', totalClasses: 20, attendedClasses: 16 },
        { subject: 'Computer Science', totalClasses: 18, attendedClasses: 15 }
    ]);

    // Calculate total attendance percentage
    const totalAttendancePercentage = ((attendanceData.reduce((total, { attendedClasses }) => total + attendedClasses, 0) /
        attendanceData.reduce((total, { totalClasses }) => total + totalClasses, 0)) *
        100).toFixed(2);

    // Determine message based on attendance percentage
    const attendanceMessage =
        totalAttendancePercentage < 85
            ? 'Please attend the classes regularly.'
            : 'Maintain this attendance!';

    return (
        <div className={styles.attendanceContainer}>
            <table className={styles.attendanceTable}>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Total Classes</th>
                        <th>Classes Attended</th>
                        <th>Classes Missed</th>
                        <th>Attendance Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceData.map(({ subject, totalClasses, attendedClasses }) => (
                        <tr key={subject}>
                            <td>{subject}</td>
                            <td>{totalClasses}</td>
                            <td>{attendedClasses}</td>
                            <td>{totalClasses - attendedClasses}</td>
                            <td>{((attendedClasses / totalClasses) * 100).toFixed(2)}%</td>
                        </tr>
                    ))}
                    <tr>
                        <td>Total</td>
                        <td>{attendanceData.reduce((total, { totalClasses }) => total + totalClasses, 0)}</td>
                        <td>{attendanceData.reduce((total, { attendedClasses }) => total + attendedClasses, 0)}</td>
                        <td>
                            {attendanceData.reduce(
                                (total, { totalClasses, attendedClasses }) => total + totalClasses - attendedClasses,
                                0
                            )}
                        </td>
                        <td>{totalAttendancePercentage}%</td>
                    </tr>
                </tbody>
            </table>
            <p className={styles.attendanceMessage}>{attendanceMessage}</p>
        </div>
    );
};

export default Attendance;
