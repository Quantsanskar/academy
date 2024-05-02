import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/AdminPortal.module.css';

const AdminPortal = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState('');

    const router = useRouter();

    const handleSectionClick = (section) => {
        setSelectedSection(section);
        setIsNavOpen(false);
        
    };

    const handleLogout = () => {
        router.push('/');
        localStorage.clear();
    };

    // useEffect(() => {
    //     const checkAuthentication = async () => {
    //         try {
    //             // Check if user is authenticated (you need to implement this logic)
    //             const isAuthenticated = localStorage.getItem('username'); // Example: Check for authentication token

    //             if (!isAuthenticated) {
    //                 router.push('/'); // Redirect to sign-in page if not authenticated
    //             }
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     };

    //     // Check authentication when the component mounts
    //     checkAuthentication();
    // }, [router]);

    return (
        <div className={styles.container}>
            <div className={styles.nav}>
            <div className={`${styles.navPanel} ${isNavOpen ? styles.navPanelOpen : ''}`}>
                    <ul>
                        <li onClick={() => handleSectionClick('uploadChem11Attendance')}>Upload Chem11 Attendance</li>
                        <li onClick={() => handleSectionClick('uploadChem12Attendance')}>Upload Chem12 Attendance</li>
                        <li onClick={() => handleSectionClick('uploadCs11Attendance')}>Upload Cs11 Attendance</li>
                        <li onClick={() => handleSectionClick('uploadCs12Attendance')}>Upload Cs12 Attendance</li>
                        <button onClick={handleLogout}>Log Out</button>
                    </ul>
                </div>
            </div>
            <div className={styles.mainContent}>
                {!selectedSection && (
                    <div className={styles.sectionContent}>
                        <h2>Welcome to the Admin Portal!</h2>
                        <p>Hi there! Welcome to the Admin Portal. Please select a section from the navigation panel to get started.</p>
                    </div>
                )}
                {selectedSection && (
                    <div className={styles.sectionContent}>
                        <h2>{selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)}</h2>
                        {selectedSection === 'notes' && <Notes />}
                        {selectedSection === 'notes' && <Notes />}
                        {selectedSection === 'notes' && <Notes />}
                        {selectedSection === 'notes' && <Notes />}



                        {/* Add content for selected section here */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPortal;
