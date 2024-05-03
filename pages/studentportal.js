// StudentPortal.js

import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import LectureData from '../data/lectureData'; // Assuming you have lecture data stored in a separate file
import styles from '../styles/StudentPortal.module.css';
import Lectures from '../components/Lectures';
import Notes from '../components/Notes';
import Tests from '../components/Tests';
import Attendance from '../components/Attendance';
import Marks from '../components/Marks';
import Pyqs from '../components/pyqs';
import Fees from '../components/Fees';

const StudentPortal = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState('');
    const [filteredLectures, setFilteredLectures] = useState([]);

    const router = useRouter();
    const handleSectionClick = (section) => {
        setSelectedSection(section);
        setIsNavOpen(false);
        if (section === 'lectures') {
            setFilteredLectures(LectureData);
        } else {
            setFilteredLectures([]); // Reset filtered lectures for other sections
        }
    };

    const handleLogout = () => {
        router.push('/');
        localStorage.clear();
        
    };
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                // Check if user is authenticated (you need to implement this logic)
                const isAuthenticated = localStorage.getItem('username'); // Example: Check for authentication token

                if (!isAuthenticated) {
                    router.push('/'); // Redirect to sign-in page if not authenticated
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        // Check authentication when the component mounts
        checkAuthentication();
    }, [router]);

    return (
        <div className={styles.container}>
            <div className={styles.nav}>

                <div className={styles.navPanel}>
                    <ul>
                        <li onClick={() => handleSectionClick('notes')}>Notes</li>
                        <li onClick={() => handleSectionClick('lectures')}>Lectures</li>
                        <li onClick={() => handleSectionClick('tests')}>Tests</li>
                        <li onClick={() => handleSectionClick('attendance')}>Attendance</li>
                        <li onClick={() => handleSectionClick('marks')}>Marks</li>
                        <li onClick={() => handleSectionClick('pyqs')}>PYQs</li>
                        <li onClick={() => handleSectionClick('feestatus')}>Fee Status</li>
                        <li onClick={() => handleSectionClick('batch')}>Batch Details</li>
                        <li onClick={() => handleSectionClick('teachers')}>Teachers</li>
                        <button onClick={handleLogout}>Log Out</button>
                    </ul>
                </div>
            </div>
            <div className={styles.mainContent}>
                {!selectedSection && (
                    <div className={styles.sectionContent1}>
                        <h2>Welcome to the Student Portal!</h2>
                        <p>Hi there! Welcome to the Student Portal. Please select a section from the navigation panel to get started.</p>
                    </div>
                )}
                {selectedSection && (
                    <div className={styles.sectionContent2}>
                        <h2>{selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)}</h2>
                        {selectedSection === 'lectures' && <Lectures filteredLectures={filteredLectures} />}
                        {selectedSection === 'notes' && <Notes />}
                        {selectedSection === 'tests' && <Tests />}
                        {selectedSection === 'attendance' && <Attendance />}
                        {selectedSection === 'marks' && <Marks />}
                        {selectedSection === 'pyqs' && <Pyqs />}
                        {selectedSection === 'fees' && <Fees />}
                        {/* Add content for other sections here */}
                    </div>
                )}

            </div>

        </div>
    );
};

export default StudentPortal;
