// Tests.js
import { useState, useEffect } from 'react';
import testdata from '../data/testdata';
import styles from '../styles/Tests.module.css';

const Tests = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [userSubjects, setUserSubjects] = useState([]);
    const [showChooseClassMsg, setShowChooseClassMsg] = useState(false);
    const [activeTab, setActiveTab] = useState('tests');

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
                setUserSubjects(loggedInUser.subjects.split('\r\n'));
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

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
    };

    return (
        <div className={styles.testsContainer}>
            <div className={styles.header}>
                <h1>Tests and Solutions</h1>
                <div className={styles.classSelector}>
                    <label htmlFor="classSelect">Select Class:</label>
                    <select id="classSelect" value={selectedClass} onChange={handleClassChange}>
                        <option value="">Select</option>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                    </select>
                </div>
            </div>
            {showChooseClassMsg && <p className={styles.warning}>Please choose your class.</p>}
            
            <div className={styles.tabsContainer}>
                <button 
                    className={`${styles.tabButton} ${activeTab === 'tests' ? styles.active : ''}`}
                    onClick={() => setActiveTab('tests')}
                >
                    Tests
                </button>
                <button 
                    className={`${styles.tabButton} ${activeTab === 'solutions' ? styles.active : ''}`}
                    onClick={() => setActiveTab('solutions')}
                >
                    Solutions
                </button>
            </div>

            <div className={styles.contentContainer}>
                {testdata.map(({ class: className, subjects }) => (
                    className === selectedClass && (
                        <div key={className} className={styles.classTests}>
                            {subjects.map(({ name: subjectName, chapters }) => (
                                userSubjects.includes(subjectName) && (
                                    <div key={subjectName} className={styles.subjectSection}>
                                        <h2>{subjectName}</h2>
                                        {chapters.map(({ name: chapterName, tests }) => (
                                            <div key={chapterName} className={styles.chapterTests}>
                                                <h3>{chapterName}</h3>
                                                <div className={styles.testGrid}>
                                                    {tests.map(({ title, pdfUrl, solutionPdfUrl }, index) => (
                                                        <div key={index} className={styles.testItem}>
                                                            <h4>{title}</h4>
                                                            {activeTab === 'tests' && (
                                                                <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.pdfLink}>
                                                                    Test PDF
                                                                </a>
                                                            )}
                                                            {activeTab === 'solutions' && (
                                                                <a href={solutionPdfUrl} target="_blank" rel="noopener noreferrer" className={styles.pdfLink}>
                                                                    Solution PDF
                                                                </a>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
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