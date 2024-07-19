import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LectureData from '../data/lectureData';
import styles from '../styles/StudentPortal.module.css';
import Lectures from '../components/Lectures';
import Notes from '../components/Notes';
import Tests from '../components/Tests';
import Attendance from '../components/Attendance';
import Marks from '../components/Marks';
import Pyqs from '../components/pyqs';

const StudentPortal = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState('');
    const [filteredLectures, setFilteredLectures] = useState([]);
    const [hamburgerClass, setHamburgerClass] = useState('');

    const router = useRouter();

    const handleSectionClick = (section) => {
        setSelectedSection(section);
        setIsNavOpen(false);
        setHamburgerClass('');
        if (section === 'lectures') {
            setFilteredLectures(LectureData);
        } else {
            setFilteredLectures([]);
        }
    };

    const handleLogout = () => {
        router.push('/');
        localStorage.clear();
    };

    const toggleNavPanel = () => {
        setIsNavOpen(!isNavOpen);
        setHamburgerClass(!isNavOpen ? 'change' : '');
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const isAuthenticated = localStorage.getItem('username');

                if (!isAuthenticated) {
                    router.push('/');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        checkAuthentication();
    }, [router]);

    return (
        <div className={`${styles.globalReset} ${styles.container}`}>
            <div className={styles.nav}>
                <div
                    className={`${styles.hamburger} ${hamburgerClass}`}
                    onClick={toggleNavPanel}
                >
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>
                <ul>
                    <li onClick={() => handleSectionClick('notes')}>Notes</li>
                    <li onClick={() => handleSectionClick('lectures')}>Lectures</li>
                    <li onClick={() => handleSectionClick('tests')}>Tests</li>
                    <li onClick={() => handleSectionClick('attendance')}>Attendance</li>
                    <li onClick={() => handleSectionClick('marks')}>Marks</li>
                    <li onClick={() => handleSectionClick('pyqs')}>PYQs</li>
                    <button onClick={handleLogout} className={styles.logout}>Log Out</button>
                </ul>
            </div>
            <div
                className={`${styles.navPanel} ${isNavOpen ? styles.open : ''}`}
            >
                <ul>
                    <li onClick={() => handleSectionClick('notes')}>Notes</li>
                    <li onClick={() => handleSectionClick('lectures')}>Lectures</li>
                    <li onClick={() => handleSectionClick('tests')}>Tests</li>
                    <li onClick={() => handleSectionClick('attendance')}>Attendance</li>
                    <li onClick={() => handleSectionClick('marks')}>Marks</li>
                    <li onClick={() => handleSectionClick('pyqs')}>PYQs</li>
                    <button onClick={handleLogout} className={styles.logout}>Log Out</button>
                </ul>
            </div>
            <div className={styles.mainContent}>
                {!selectedSection && (
                    <div className={styles.sectionContent1}>
                        <h2>Welcome to the Student Portal!</h2>
                        <p>Please select a section from the navigation panel to get started.</p>
                    </div>
                )}
                {selectedSection && (
                    <div className={styles.sectionContent2}>
                        <h2>
                            {selectedSection.charAt(0).toUpperCase() +
                                selectedSection.slice(1)}
                        </h2>
                        {selectedSection === 'lectures' && (
                            <Lectures filteredLectures={filteredLectures} />
                        )}
                        {selectedSection === 'notes' && <Notes />}
                        {selectedSection === 'tests' && <Tests />}
                        {selectedSection === 'attendance' && <Attendance />}
                        {selectedSection === 'marks' && <Marks />}
                        {selectedSection === 'pyqs' && <Pyqs />}
                        {/* Add content for other sections here */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentPortal;
