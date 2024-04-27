// Notes.js

import { useState, useEffect } from 'react';
import styles from '../styles/Notes.module.css';
import notesData from '../data/notesData';

const Notes = () => {
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [selectedClass, setSelectedClass] = useState('Class 11');
    const [showChooseClassMsg, setShowChooseClassMsg] = useState(true);

    useEffect(() => {
        handleClassChange({ target: { value: selectedClass } });
    }, [selectedClass]);

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
        setShowChooseClassMsg(false);
        if (event.target.value === 'Class 11') {
            setFilteredNotes(notesData.filter(data => data.class === 'Class 11'));
        } else if (event.target.value === 'Class 12') {
            setFilteredNotes(notesData.filter(data => data.class === 'Class 12'));
        } else {
            setFilteredNotes([]);
        }
    };

    return (
        <div className={styles.notesContainer}>
            <div className={styles.chooseClass}>
                <label htmlFor="classSelect">Choose a class:</label>
                <select id="classSelect" value={selectedClass} onChange={handleClassChange}>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                </select>
                {showChooseClassMsg && <p>Please choose your class.</p>}
            </div>

            <div className={styles.notesList}>
                {filteredNotes.map((classData, classIndex) => (
                    <div key={classIndex}>
                        <h2>{classData.class}</h2>
                        {classData.subjects.map((subject, subjectIndex) => (
                            <div key={subjectIndex}>
                                <h3>{subject.name}</h3>
                                {subject.chapters.map((chapter, chapterIndex) => (
                                    <div key={chapterIndex}>
                                        <h4>{chapter.name}</h4>
                                        {chapter.notes.map((note, noteIndex) => (
                                            <div key={noteIndex} className={styles.noteItem}>
                                                <h5>{note.title}</h5>
                                                <a href={note.filePath} target="_blank" rel="noopener noreferrer">View PDF</a>
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

export default Notes;
