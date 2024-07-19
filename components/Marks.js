import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Marks.module.css';

const Marks = () => {
    const [loggedInUsername, setLoggedInUsername] = useState('');
    const [marksData, setMarksData] = useState([]);

    useEffect(() => {
        // Fetch logged in username from localStorage
        const username = localStorage.getItem('username');
        if (username) {
            setLoggedInUsername(username);
            fetchMarksData(username);
        }
    }, []);

    const fetchMarksData = async (username) => {
        try {
            // Fetch marks data from each API
            const chem11Response = await axios.get(`http://127.0.0.1:8000/api/markschem11`);
            const chem12Response = await axios.get(`http://127.0.0.1:8000/api/markschem12`);
            const cs11Response = await axios.get(`http://127.0.0.1:8000/api/markscs11`);
            const cs12Response = await axios.get(`http://127.0.0.1:8000/api/markscs12`);

            // Check if username exists in each API data and set marksData accordingly
            let userData = [];
            if (chem11Response.data.find(item => item.username === username)) {
                userData = [...userData, ...chem11Response.data];
            }
            if (chem12Response.data.find(item => item.username === username)) {
                userData = [...userData, ...chem12Response.data];
            }
            if (cs11Response.data.find(item => item.username === username)) {
                userData = [...userData, ...cs11Response.data];
            }
            if (cs12Response.data.find(item => item.username === username)) {
                userData = [...userData, ...cs12Response.data];
            }

            setMarksData(userData);
        } catch (error) {
            console.error('Error fetching marks data:', error.message);
        }
    };

    const getGradeClass = (marksObtained, totalMarks) => {
        const percentage = (marksObtained / totalMarks) * 100;
        if (percentage >= 90) return styles.gradeA;
        if (percentage >= 80) return styles.gradeB;
        if (percentage >= 70) return styles.gradeC;
        if (percentage >= 60) return styles.gradeD;
        return styles.gradeF;
    };

    const getGrade = (marksObtained, totalMarks) => {
        const percentage = (marksObtained / totalMarks) * 100;
        if (percentage >= 90) return 'A';
        if (percentage >= 80) return 'B';
        if (percentage >= 70) return 'C';
        if (percentage >= 60) return 'D';
        return 'F';
    };

    return (
        <div className={styles.marksContainer}>
            <div className={styles.reportHeader}>
                <h1>Student Report Card</h1>
                <p>Academic Year 2023-2024</p>
            </div>

            <div className={styles.marksList}>
                {marksData.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Title</th>
                                <th>Total Marks</th>
                                <th>Marks Obtained</th>
                                <th>Grade</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marksData.map((item, index) => (
                                <tr key={index}>
                                    <td className={styles.subjectName}>{item.subject}</td>
                                    <td>{item.title}</td>
                                    <td>{item.total_marks}</td>
                                    <td>{item.marks_obtained}</td>
                                    <td className={`${styles.grade} ${getGradeClass(item.marks_obtained, item.total_marks)}`}>
                                        {getGrade(item.marks_obtained, item.total_marks)}
                                    </td>
                                    <td>{item.remarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No marks data available</p>
                )}
            </div>

            <div className={styles.reportFooter}>
                <p className={styles.teacherSignature}>Signed: Class Teacher</p>
            </div>
        </div>
    );
};

export default Marks;