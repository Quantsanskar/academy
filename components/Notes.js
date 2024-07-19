import { useState, useEffect } from 'react';
import styles from '../styles/Notes.module.css';
import notesData from '../data/notesData';

const Notes = () => {
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [showChooseClassMsg, setShowChooseClassMsg] = useState(true);
    const [selectedNote, setSelectedNote] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/student');
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            const loggedInUsername = localStorage.getItem('username');
            const loggedInUser = data.find(user => user.username === loggedInUsername);
            if (loggedInUser) {
                setUserData(loggedInUser);
                setSelectedClass(loggedInUser.clas);
                setShowChooseClassMsg(false);
            } else {
                console.log('Logged-in user data not found.');
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    const openNote = (note) => {
        setSelectedNote(note);
    };

    const closeNote = () => {
        setSelectedNote(null);
    };

    useEffect(() => {
        if (userData && userData.subjects) {
            const filteredSubjects = userData.subjects.split('\r\n');
            const filteredNotesData = filteredSubjects.map((subject) => {
                const subjectData = notesData.find((data) => data.subjects.some((s) => s.name === subject));
                if (subjectData) {
                    const notes = subjectData.subjects.find((s) => s.name === subject).chapters.flatMap((chapter) => chapter.notes);
                    return { subject, notes };
                } else {
                    return { subject, notes: [] };
                }
            });
            setFilteredNotes(filteredNotesData);
        }
    }, [userData]);

    return (
        <div className={styles.notesContainer}>
            <header className={styles.header}>
                <h1 className={styles.title}>Your Study Notes</h1>
                <div className={styles.classSelector}>
                    <label htmlFor="classSelect">Class:</label>
                    <select id="classSelect" value={selectedClass} className={styles.select}>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                    </select>
                </div>
            </header>

            {showChooseClassMsg && <p className={styles.message}>Please choose your class.</p>}

            <div className={styles.subjectsGrid}>
                {filteredNotes.map((subjectData, index) => (
                    <div key={index} className={styles.subjectCard}>
                        <h2 className={styles.subjectTitle}>{subjectData.subject}</h2>
                        <ul className={styles.notesList}>
                            {subjectData.notes.map((note, noteIndex) => (
                                <li key={noteIndex} className={styles.noteItem}>
                                    <button onClick={() => openNote(note)} className={styles.noteButton}>
                                        {note.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {selectedNote && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={closeNote}>&times;</button>
                        <iframe className={styles.pdfViewer} src={selectedNote.filePath} title="Notes PDF"></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notes;