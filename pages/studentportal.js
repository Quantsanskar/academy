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
import PerformanceGraph from '../components/PerformanceGraph';

const StudentPortal = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState('');
    const [filteredLectures, setFilteredLectures] = useState([]);
    const [studentData, setStudentData] = useState(null);
    const [performanceData, setPerformanceData] = useState([]);

    const router = useRouter();

    const handleSectionClick = (section) => {
        setSelectedSection(section);
        setIsNavOpen(false);
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
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const username = localStorage.getItem('username');

                if (!username) {
                    router.push('/');
                } else {
                    // Fetch student data
                    const studentResponse = await fetch(`http://127.0.0.1:8000/api/student`);
                    const studentData = await studentResponse.json();
                    const student = studentData.find(s => s.username === username);
                    setStudentData(student);

                    if (student) {
                        // Manually set API endpoints
                        const apiEndpoints = [
                            'http://127.0.0.1:8000/api/markschem11',
                            'http://127.0.0.1:8000/api/markschem12',
                            'http://127.0.0.1:8000/api/markscs11',
                            'http://127.0.0.1:8000/api/markscs12'
                        ];

                        // Fetch performance data
                        const performancePromises = apiEndpoints.map(async endpoint => {
                            const response = await fetch(endpoint);
                            const data = await response.json();
                            return data.filter(entry => entry.username === username);
                        });

                        const performanceResults = await Promise.all(performancePromises);
                        setPerformanceData(performanceResults.flat());
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        checkAuthentication();
    }, [router]);

    return (
        <div className={styles.container}>
            <div className={styles.nav}>
                <div
                    className={`${styles.hamburger} ${isNavOpen ? styles.open : ''}`}
                    onClick={toggleNavPanel}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={styles.navList}>
                    <li onClick={() => handleSectionClick('notes')}>Notes</li>
                    <li onClick={() => handleSectionClick('lectures')}>Lectures</li>
                    <li onClick={() => handleSectionClick('tests')}>Tests</li>
                    <li onClick={() => handleSectionClick('attendance')}>Attendance</li>
                    <li onClick={() => handleSectionClick('marks')}>Marks</li>
                    <li onClick={() => handleSectionClick('pyqs')}>PYQs</li>
                    <li onClick={() => handleSectionClick('performance')}>Performance</li>
                    <li><button onClick={handleLogout} className={styles.logout}>Log Out</button></li>
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
                    <li onClick={() => handleSectionClick('performance')}>Performance</li>
                    <li><button onClick={handleLogout} className={styles.logout}>Log Out</button></li>
                </ul>
            </div>
            <div className={styles.mainContent}>
                {!selectedSection && (
                    <div className={styles.sectionContent}>
                        <h2>Welcome to the Student Portal!</h2>
                        <p>Please select a section from the navigation panel to get started.</p>
                    </div>
                )}
                {selectedSection && (
                    <div className={styles.sectionContent}>
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
                        {selectedSection === 'performance' && (
                            <PerformanceGraph data={performanceData} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentPortal;