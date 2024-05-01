import { useState, useEffect } from 'react';
import testdata from '../data/testdata';
import styles from '../styles/Tests.module.css';

const Tests = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [userSubjects, setUserSubjects] = useState([]);
    const [showChooseClassMsg, setShowChooseClassMsg] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/student');
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const userData = await response.json();
            const loggedInUsername = localStorage.getItem('username');
            const loggedInUser = userData.find(user => user.username === loggedInUsername);
            if (loggedInUser) {
                setSelectedClass(loggedInUser.clas);
                setUserSubjects(loggedInUser.subjects.split('\r\n')); // Split subjects into an array
                setShowChooseClassMsg(false);
                console.log("data found");
                console.log(selectedClass, userSubjects);
            } else {
                console.log('Logged-in user data not found.');
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    return (
        <div className={styles.testsContainer}>
            <div className={styles.classSelector}>
                <label htmlFor="classSelect">Select Class:</label>
                <select id="classSelect" value={selectedClass}>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                </select>
                {showChooseClassMsg && <p>Please choose your class.</p>}
            </div>
            <div className={styles.testsList}>
                {testdata.map(({ class: className, subjects }) => (
                    className === selectedClass && (
                        <div key={className} className={styles.classTests}>
                            <h2>{className}</h2>
                            {subjects.map(({ name: subjectName, chapters }) => (
                                userSubjects.includes(subjectName) && (
                                    <div key={subjectName}>
                                        <h3>{subjectName}</h3>
                                        {chapters.map(({ name: chapterName, tests }) => (
                                            <div key={chapterName} className={styles.chapterTests}>
                                                <h4>{chapterName}</h4>
                                                {tests.map(({ title, pdfUrl, solutionPdfUrl }, index) => (
                                                    <div key={index} className={styles.testItem}>
                                                        <h5>{title}</h5>
                                                        <div className={styles.pdfLinks}>
                                                            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Test PDF</a>
                                                            <a href={solutionPdfUrl} target="_blank" rel="noopener noreferrer">Solution PDF</a>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )
                            ))}
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Tests;
