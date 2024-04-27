import { useState, useEffect } from 'react';
import styles from '../styles/pyqs.module.css';
import pyqsData from '../data/pyqsData';

const Pyqs = () => {
    const [filteredPyqs, setFilteredPyqs] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedYearRange, setSelectedYearRange] = useState('');

    useEffect(() => {
        filterPyqs(selectedClass, selectedSubject, selectedYearRange);
    }, [selectedClass, selectedSubject, selectedYearRange]);

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    };

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
    };

    const handleYearRangeChange = (event) => {
        setSelectedYearRange(event.target.value);
    };

    const filterPyqs = (selectedClass, selectedSubject, selectedYearRange) => {
        setFilteredPyqs(pyqsData.filter(data =>
            data.class === selectedClass &&
            data.subject === selectedSubject &&
            data.yearRange === selectedYearRange
        ));
    };

    return (
        <div className={styles.pyqsContainer}>
            <div className={styles.selectors}>
                <label htmlFor="classSelect">Choose a class:</label>
                <select id="classSelect" value={selectedClass} onChange={handleClassChange}>
                    <option value="">Select</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                </select>
                <label htmlFor="subjectSelect">Choose a subject:</label>
                <select id="subjectSelect" value={selectedSubject} onChange={handleSubjectChange}>
                    <option value="">Select</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Computer Science">Computer Science</option>
                </select>
                <label htmlFor="yearRangeSelect">Choose a year range:</label>
                <select id="yearRangeSelect" value={selectedYearRange} onChange={handleYearRangeChange}>
                    <option value="">Select</option>
                    <option value="2018-2023">2018-2023</option>
                    <option value="2012-2017">2012-2017</option>
                    <option value="2006-2011">2006-2011</option>
                    <option value="2000-2005">2000-2005</option>
                </select>
            </div>
            <div className={styles.pyqsList}>
                {filteredPyqs.map((pyq, index) => (
                    <div key={index} className={styles.pyqItem}>
                        <h3>{pyq.chapter}</h3>
                        <div className={styles.pdfLinks}>
                            <a href={pyq.pyqPdfLink} target="_blank" rel="noopener noreferrer">PYQ PDF</a>
                            <a href={pyq.solPdfLink} target="_blank" rel="noopener noreferrer">Solution PDF</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pyqs;
