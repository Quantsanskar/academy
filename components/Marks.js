import { useState, useEffect } from 'react';
import styles from '../styles/Marks.module.css';
import marksData from '../data/marksData';

const Marks = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [filteredMarks, setFilteredMarks] = useState([]);
    const [userSubjects, setUserSubjects] = useState([]);

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
            } else {
                console.log('Logged-in user data not found.');
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
        filterMarks(event.target.value, selectedSubject);
    };

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
        filterMarks(selectedClass, event.target.value);
    };

    const filterMarks = (selectedClass, selectedSubject) => {
        const filtered = marksData.filter(data => data.class === selectedClass && data.subject === selectedSubject);
        setFilteredMarks(filtered.length ? filtered[0].marks : []);
    };

    return (
        <div className={styles.marksContainer}>
            <div className={styles.chooseClass}>
                <label htmlFor="classSelect">Choose a class:</label>
                <select id="classSelect" value={selectedClass}>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                </select>
                <label htmlFor="subjectSelect">Choose a subject:</label>
                <select id="subjectSelect" value={selectedSubject} onChange={handleSubjectChange}>
                    <option value="">Select Subject</option>
                    {userSubjects.map((subject, index) => (
                        <option key={index} value={subject}>{subject}</option>
                    ))}
                </select>
            </div>

            {filteredMarks.length > 0 && (
                <div className={styles.marksList}>
                    <table>
                        <thead>
                            <tr>
                                <th>Date of Tests</th>
                                <th>Topic</th>
                                <th>Marks Obtained</th>
                                <th>Total Marks</th>
                                <th>Percentage</th>
                                <th>Remark</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMarks.map((mark, index) => (
                                <tr key={index}>
                                    <td>{mark.date}</td>
                                    <td>{mark.topic}</td>
                                    <td>{mark.marksObtained}</td>
                                    <td>{mark.totalMarks}</td>
                                    <td>{mark.percentage}</td>
                                    <td>{mark.remark}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Marks;
