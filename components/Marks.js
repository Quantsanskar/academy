// Marks.js

import { useState } from 'react';
import styles from '../styles/Marks.module.css';
import marksData from '../data/marksData';

const Marks = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [filteredMarks, setFilteredMarks] = useState([]);

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
                <select id="classSelect" value={selectedClass} onChange={handleClassChange}>
                    <option value="">Select Class</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                </select>
                <label htmlFor="subjectSelect">Choose a subject:</label>
                <select id="subjectSelect" value={selectedSubject} onChange={handleSubjectChange}>
                    <option value="">Select Subject</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Computer Science">Computer Science</option>
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
