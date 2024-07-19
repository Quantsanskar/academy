// Lectures.js
import { useState, useEffect } from 'react';
import styles from '../styles/Lectures.module.css';
import lectureData from '../data/lectureData';

const Lectures = () => {
    const [filteredLectures, setFilteredLectures] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [showChooseClassMsg, setShowChooseClassMsg] = useState(true);
    const [selectedLecture, setSelectedLecture] = useState(null);
    const [userData, setUserData] = useState(null);
    const [activeSubject, setActiveSubject] = useState(null);

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

    const openLecture = (lecture) => {
        setSelectedLecture(lecture);
    };

    const closeLecture = () => {
        setSelectedLecture(null);
    };

    useEffect(() => {
        if (userData && userData.subjects) {
            const filteredSubjects = userData.subjects.split('\r\n');
            const filteredLecturesData = filteredSubjects.map((subject) => {
                const subjectData = lectureData.find((data) => data.subjects.some((s) => s.name === subject));
                if (subjectData) {
                    const lectures = subjectData.subjects.find((s) => s.name === subject).chapters.flatMap((chapter) => chapter.lectures);
                    return { subject, lectures };
                } else {
                    return { subject, lectures: [] };
                }
            });
            setFilteredLectures(filteredLecturesData);
            setActiveSubject(filteredLecturesData[0]?.subject);
        }
    }, [userData]);

    return (
        <div className={styles.lecturesContainer}>
            <header className={styles.header}>
                <h1>My Lectures</h1>
                <div className={styles.classSelector}>
                    <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                        <option value="">Select Class</option>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                    </select>
                </div>
            </header>

            <main className={styles.mainContent}>
                <nav className={styles.subjectNav}>
                    {filteredLectures.map((subjectData, index) => (
                        <button
                            key={index}
                            className={`${styles.subjectButton} ${activeSubject === subjectData.subject ? styles.active : ''}`}
                            onClick={() => setActiveSubject(subjectData.subject)}
                        >
                            {subjectData.subject}
                        </button>
                    ))}
                </nav>

                <section className={styles.lecturesList}>
                    {filteredLectures.find(s => s.subject === activeSubject)?.lectures.map((lecture, lectureIndex) => (
                        <div key={lectureIndex} className={styles.lectureItem}>
                            <h3>{lecture.title}</h3>
                            <button onClick={() => openLecture(lecture)}>Watch Video</button>
                        </div>
                    ))}
                </section>
            </main>

            {selectedLecture && (
                <div className={styles.lectureModal}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={closeLecture}>×</button>
                        <h2>{selectedLecture.title}</h2>
                        <video className={styles.videoPlayer} controls controlsList='nodownload'>
                            <source src={selectedLecture.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Lectures;