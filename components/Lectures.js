// Lectures.js

import { useState, useEffect } from 'react';
import LectureData from '../data/lectureData';
import styles from '../styles/Lectures.module.css';

const Lectures = () => {
    const [filteredLectures, setFilteredLectures] = useState([]);
    const [selectedClass, setSelectedClass] = useState('Class 11');
    const [showChooseClassMsg, setShowChooseClassMsg] = useState(false);

    useEffect(() => {
        handleClassChange({ target: { value: selectedClass } });
    }, [selectedClass]);

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
        setShowChooseClassMsg(false);
        if (event.target.value === 'Class 11') {
            setFilteredLectures(LectureData.filter(data => data.class === 'Class 11'));
        } else if (event.target.value === 'Class 12') {
            setFilteredLectures(LectureData.filter(data => data.class === 'Class 12'));
        } else {
            setFilteredLectures([]);
        }
    };

    return (
        <div className={styles.lecturesContainer}>
            <div className={styles.chooseClass}>
                <label htmlFor="classSelect">Choose a class:</label>
                <select id="classSelect" value={selectedClass} onChange={handleClassChange}>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                </select>
                {showChooseClassMsg && <p>Please choose your class.</p>}
            </div>
            <div className={styles.lectureList}>
                {filteredLectures.map((classData, classIndex) => (
                    <div key={classIndex}>
                        <h2>{classData.class}</h2>
                        {classData.subjects.map((subject, subjectIndex) => (
                            <div key={subjectIndex}>
                                <h3>{subject.name}</h3>
                                {subject.chapters.map((chapter, chapterIndex) => (
                                    <div key={chapterIndex}>
                                        <h4>{chapter.name}</h4>
                                        {chapter.lectures.map((lecture, lectureIndex) => (
                                            <div key={lectureIndex} className={styles.lectureItem}>
                                                <h5>{lecture.title}</h5>
                                                <video controls controlsList="nodownload">
                                                    <source src={lecture.videoUrl} />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Lectures;
