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

    // const handleClassChange = (event) => {
    //     setSelectedClass(event.target.value);
    // };

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
                // Find the subject object in notesData
                const subjectData = notesData.find((data) => data.subjects.some((s) => s.name === subject));
                if (subjectData) {
                    // Extract the notes for the found subject
                    const notes = subjectData.subjects.find((s) => s.name === subject).chapters.flatMap((chapter) => chapter.notes);
                    return { subject, notes };
                } else {
                    return { subject, notes: [] }; // Subject not found in notesData
                }
            });
            setFilteredNotes(filteredNotesData);
        }
    }, [userData]);


    return (
        <div className={styles.notesContainer}>
            <div className={styles.chooseClass}>
                <label htmlFor="classSelect">Choose a class:</label>
                <select id="classSelect" value={selectedClass}>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                </select>
                {showChooseClassMsg && <p>Please choose your class.</p>}
            </div>

            <div className={styles.notesList}>
                {filteredNotes.map((subjectData, index) => (
                    <div key={index}>
                        <h2>{subjectData.subject}</h2>
                        {subjectData.notes.map((note, noteIndex) => (
                            <div key={noteIndex} className={styles.noteItem}>
                                <h3>{note.title}</h3>
                                <button onClick={() => openNote(note)}>View PDF</button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {selectedNote && (
                <div className={styles.noteModal}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={closeNote}>Close</button>
                        <iframe className={styles.pdfViewer} src={selectedNote.filePath} title="Notes PDF"></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notes;
