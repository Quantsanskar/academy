import { useState, useEffect } from 'react';
import styles from '../styles/Marks.module.css';

const Marks = () => {
    const [marksData, setMarksData] = useState([]);
    const [loggedInUsername, setLoggedInUsername] = useState('');

    useEffect(() => {
        // Get logged-in username from localStorage
        const username = localStorage.getItem('username');
        if (username) {
            setLoggedInUsername(username);
            // Fetch marks data for the logged-in user
            fetchMarksData(username);
        }
    }, []);

    const fetchMarksData = async (username) => {
        try {
            // Fetch marks data for all students from backend APIs
            const responses = await Promise.all([
                fetch(`http://127.0.0.1:8000/api/reportchem11`),
                fetch(`http://127.0.0.1:8000/api/reportchem12`),
                fetch(`http://127.0.0.1:8000/api/reportcs11`),
                fetch(`http://127.0.0.1:8000/api/reportcs12`)
            ]);

            const data = await Promise.all(responses.map(async (response) => {
                if (response.ok) {
                    return await response.json();
                }
                return [];
            }));

            // Filter marks data to get only the marks of the logged-in user
            const userMarks = data.flat().filter((mark) => mark.username === username);

            setMarksData(userMarks);
        } catch (error) {
            console.error('Error fetching marks data:', error.message);
        }
    };

    return (
        <div className={styles.marksContainer}>
            <h2>Your Marks</h2>
            <div className={styles.marksList}>
                {marksData.map((mark, index) => (
                    <div key={index} className={styles.markItem}>
                        <h3>{mark.subject}</h3>
                        <p>Date: {mark.date}</p>
                        <p>Topic: {mark.topic}</p>
                        <p>Marks Obtained: {mark.marksObtained}</p>
                        <p>Total Marks: {mark.totalMarks}</p>
                        <p>Percentage: {mark.percentage}</p>
                        <p>Remark: {mark.remark}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marks;
