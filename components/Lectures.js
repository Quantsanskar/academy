import { useState, useEffect } from 'react';
import styles from '../styles/Lectures.module.css';
import lectureData from '../data/lectureData';

const Lectures = () => {
    const [filteredLectures, setFilteredLectures] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [showChooseClassMsg, setShowChooseClassMsg] = useState(true);
    const [selectedLecture, setSelectedLecture] = useState(null);
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
        }
    }, [userData]);

    return (
        <div className={styles.lecturesContainer}>
            <div className={styles.chooseClass}>
                <label htmlFor="classSelect">Choose a class:</label>
                <select id="classSelect" value={selectedClass}>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                </select>
                {showChooseClassMsg && <p>Please choose your class.</p>}
            </div>

            <div className={styles.lecturesList}>
                {filteredLectures.map((subjectData, index) => (
                    <div key={index}>
                        <h2>{subjectData.subject}</h2>
                        {subjectData.lectures.map((lecture, lectureIndex) => (
                            <div key={lectureIndex} className={styles.lectureItem}>
                                <h3>{lecture.title}</h3>
                                <button onClick={() => openLecture(lecture)}>Watch Video</button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {selectedLecture && (
                <div className={styles.lectureModal}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={closeLecture}>Close</button>
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
