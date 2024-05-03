import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from "../styles/CS11att.css";
const CS11Attendance = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [attendanceStatus, setAttendanceStatus] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/attendancecs11');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error.message);
        }
    };

    const handleAttendanceSubmit = async (student) => {
        if (!student || !attendanceStatus) return;

        try {
            // Submit attendance
            await axios.post('http://127.0.0.1:8000/api/attendancecs11', {
                username: student.username,
                status: attendanceStatus,
            });
            if(attendanceStatus==="absent"){
                await axios.post('http://127.0.0.1:8000/api/send-sms-request/',{
                    phone_number: student.mobile,
                    message: `Your ward ${student.name} is absent today.`
                });
            }

            alert('Attendance submitted successfully');
        } catch (error) {
            console.error('Error submitting attendance:', error.message);
        }
    };


    const handleStudentSelect = (student) => {
        setSelectedStudent(student);
    };

    const handleStatusChange = (status) => {
        setAttendanceStatus(status);
    };

    return (
        <div className="container">
            <h1>CS 11 Attendance</h1>
            <div>
                {students.map((student) => (
                    <div key={student.id} className="student">
                        <p>{student.name}</p>
                        <div className="buttons">
                            <button className={`button ${attendanceStatus === 'present' && selectedStudent === student ? 'present' : ''}`} onClick={() => { handleStudentSelect(student); handleStatusChange('present'); }}>Present</button>
                            <button className={`button ${attendanceStatus === 'absent' && selectedStudent === student ? 'absent' : ''}`} onClick={() => { handleStudentSelect(student); handleStatusChange('absent'); }}>Absent</button>
                            <button className="submit-button" onClick={() => handleAttendanceSubmit(student)}>Submit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CS11Attendance;