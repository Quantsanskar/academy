// Tests.js

import { useState } from 'react';
import testdata from '../data/testdata';
import styles from '../styles/Tests.module.css';

const Tests = () => {
    const [selectedClass, setSelectedClass] = useState('Class 11');

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
    };

    return (
        <div className={styles.testsContainer}>
            <div className={styles.classSelector}>
                <label htmlFor="classSelect">Select Class:</label>
                <select id="classSelect" value={selectedClass} onChange={handleClassChange}>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                </select>
            </div>
            <div className={styles.testsList}>
                {testdata.map(({ class: className, subjects }) => (
                    className === selectedClass && (
                        <div key={className} className={styles.classTests}>
                            <h2>{className}</h2>
                            {subjects.map(({ name: subjectName, chapters }) => (
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
                            ))}
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Tests;
