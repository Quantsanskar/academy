// Lectures.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Lectures.module.css';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const Lectures = () => {
    const [filteredLectures, setFilteredLectures] = useState([]);
    const [selectedLecture, setSelectedLecture] = useState(null);
    const [userData, setUserData] = useState(null);
    const [activeSubject, setActiveSubject] = useState(null);
    const [allLectures, setAllLectures] = useState([]);

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (userData) {
            fetchAllLectures();
        }
    }, [userData]);

    const fetchUserData = async () => {
        try {
            const loggedInUsername = localStorage.getItem('username');
            const response = await axios.get(`${API_BASE_URL}/student`);
            const allStudentsData = response.data;
            const userData = allStudentsData.find(student => student.username === loggedInUsername);
            
            if (userData) {
                setUserData(userData);
            } else {
                console.log('Logged-in user data not found.');
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    const fetchAllLectures = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/lectures/`);
            setAllLectures(response.data);
            filterLectures(response.data);
        } catch (error) {
            console.error('Error fetching lectures data:', error.message);
        }
    };

    const filterLectures = (lectures) => {
        if (!userData || !userData.subjects || lectures.length === 0) return;

        const userSubjects = userData.subjects.split('\r\n');
        const userClass = userData.clas;

        const filteredLecturesData = userSubjects.map(subject => {
            const subjectLectures = lectures.filter(lecture =>
                lecture.subject === subject && lecture.class_name === userClass
            );
            return { subject, lectures: subjectLectures };
        });

        setFilteredLectures(filteredLecturesData);
        setActiveSubject(filteredLecturesData[0]?.subject);
    };

    const openLecture = (lecture) => {
        setSelectedLecture(lecture);
    };

    const closeLecture = () => {
        setSelectedLecture(null);
    };

    return (
        <div className={styles.lecturesContainer}>
            <header className={styles.header}>
                <h1>My Lectures <span className={styles.emoji}>📚✨</span></h1>
            </header>

            <main className={styles.mainContent}>
                <nav className={styles.subjectNav}>
                    {filteredLectures.map((subjectData, index) => (
                        <button
                            key={index}
                            className={`${styles.subjectButton} ${activeSubject === subjectData.subject ? styles.active : ''}`}
                            onClick={() => setActiveSubject(subjectData.subject)}
                        >
                            {subjectData.subject} <span className={styles.emoji}>📚</span>
                        </button>
                    ))}
                </nav>

                <section className={styles.lecturesList}>
                    {filteredLectures.find(s => s.subject === activeSubject)?.lectures.map((lecture, lectureIndex) => (
                        <div key={lectureIndex} className={styles.lectureItem}>
                            <h3>{lecture.title} <span className={styles.emoji}>🎓</span></h3>
                            <p>Chapter: {lecture.chapter} <span className={styles.emoji}>📖</span></p>
                            <button onClick={() => openLecture(lecture)}>
                                Watch Video <span className={styles.emoji}>🎥</span>
                            </button>
                        </div>
                    ))}
                </section>
            </main>

            {selectedLecture && (
                <div className={styles.lectureModal} onClick={closeLecture}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={closeLecture}>×</button>
                        <h2>{selectedLecture.title} <span className={styles.emoji}>🌟</span></h2>
                        <div className={styles.videoPlayerContainer}>
                            <video
                                src={selectedLecture.video}
                                controls
                                width="100%"
                                height="100%"
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Lectures;