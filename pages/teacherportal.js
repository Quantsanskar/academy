import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../styles/TeacherPortal.module.css";

const TeacherPortal = () => {
    const [students, setStudents] = useState([]);
    const [selectedUsername, setSelectedUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [studentProfile, setStudentProfile] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/student');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error.message);
        }
    };

    const fetchUserData = async (username) => {
        try {
            const attendanceEndpoints = [
                'http://127.0.0.1:8000/api/attendancechem11',
                'http://127.0.0.1:8000/api/attendancechem12',
                'http://127.0.0.1:8000/api/attendancecs11',
                'http://127.0.0.1:8000/api/attendancecs12'
            ];

            const userDataPromises = attendanceEndpoints.map(async (endpoint) => {
                try {
                    const response = await axios.get(endpoint);
                    const userData = response.data.find((item) => item.username === username);
                    return userData || "Data not available";
                } catch (error) {
                    console.error(`Error fetching data from ${endpoint}:`, error.message);
                    return "Data not available";
                }
            });

            const userDataValues = await Promise.all(userDataPromises);

            setUserData({
                chem11: userDataValues[0],
                chem12: userDataValues[1],
                cs11: userDataValues[2],
                cs12: userDataValues[3]
            });

            const profileData = students.find((student) => student.username === username);
            setStudentProfile(profileData);
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    const handleUsernameSelect = (username) => {
        setSelectedUsername(username);
        fetchUserData(username);
    };

    return (
        <div className={styles.container}>
            <h1>Teacher Portal</h1>
            <div className={styles.dropdown}>
                <label htmlFor="username">Select Username:</label>
                <select id="username" onChange={(e) => handleUsernameSelect(e.target.value)}>
                    <option value="">Select...</option>
                    {students.map((student) => (
                        <option key={student.username} value={student.username}>
                            {student.name} ({student.username})
                        </option>
                    ))}
                </select>
            </div>
            {studentProfile && (
                <div className={styles.profile}>
                    <h2>Student Profile</h2>
                    <p><strong>Name:</strong> {studentProfile.name}</p>
                    <p><strong>Username:</strong> {studentProfile.username}</p>
                    <p><strong>Class:</strong> {studentProfile.clas}</p>
                    <p><strong>Stream:</strong> {studentProfile.stream}</p>
                    <p><strong>Subjects:</strong> {studentProfile.subjects}</p>
                    <p><strong>Mobile:</strong> {studentProfile.mobile}</p>
                    <p><strong>Parent's Mobile:</strong> {studentProfile.par_mobile}</p>
                    <p><strong>Email:</strong> {studentProfile.email}</p>
                </div>
            )}
            {userData && (
                <div className={styles.userData}>
                    <h2>User Data</h2>
                    <p><strong>Username:</strong> {selectedUsername}</p>
                    <h3>Attendance</h3>
                    <div className={styles.attendance}>
                        <div>
                            <h4>Chemistry 11</h4>
                            <p>{userData.chem11 !== "Data not available" ? `Total Classes: ${userData.chem11.total_classes}, Classes Attended: ${userData.chem11.classes_attended}, Absent Days: ${userData.chem11.absent_days}, Absent Dates: ${userData.chem11.absent_date}` : "Data not available"}</p>
                        </div>
                        <div>
                            <h4>Chemistry 12</h4>
                            <p>{userData.chem12 !== "Data not available" ? `Total Classes: ${userData.chem12.total_classes}, Classes Attended: ${userData.chem12.classes_attended}, Absent Days: ${userData.chem12.absent_days}, Absent Dates: ${userData.chem12.absent_date}` : "Data not available"}</p>
                        </div>
                        <div>
                            <h4>Computer Science 11</h4>
                            <p>{userData.cs11 !== "Data not available" ? `Total Classes: ${userData.cs11.total_classes}, Classes Attended: ${userData.cs11.classes_attended}, Absent Days: ${userData.cs11.absent_days}, Absent Dates: ${userData.cs11.absent_date}` : "Data not available"}</p>
                        </div>
                        <div>
                            <h4>Computer Science 12</h4>
                            <p>{userData.cs12 !== "Data not available" ? `Total Classes: ${userData.cs12.total_classes}, Classes Attended: ${userData.cs12.classes_attended}, Absent Days: ${userData.cs12.absent_days}, Absent Dates: ${userData.cs12.absent_date}` : "Data not available"}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherPortal;
