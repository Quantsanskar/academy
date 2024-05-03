import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from "../styles/Chem12att.css";
const Chem12Attendance = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [attendanceStatus, setAttendanceStatus] = useState('');
    const [absentDate, setAbsentDate] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false);
    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/attendancechem12');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error.message);
        }
    };

    const handleAttendanceSubmit = async (student) => {
        if (!student || !attendanceStatus) return;
        setLoading(true);
        setSubmit(false);
        try {
            // Submit attendance
            await axios.post('http://127.0.0.1:8000/api/attendancechem12', {
                username: student.username,
                status: attendanceStatus,
                absent_date: absentDate,
            });
            if (attendanceStatus === "absent") {
                await axios.post('http://127.0.0.1:8000/api/send-sms-request/', {
                    phone_number: student.mobile,
                    message: `Your ward ${student.name} is absent today.`
                });
            }

            alert('Attendance submitted successfully');
            setLoading(false);
            setSubmit(true);
        } catch (error) {
            console.error('Error submitting attendance:', error.message);
            setLoading(false);
        }
    };


    const handleStudentSelect = (student) => {
        setSelectedStudent(student);
    };

    const handleStatusChange = (status) => {
        setAttendanceStatus(status);
    };
    const handleDateChange = (event) => {
        setAbsentDate(event.target.value);
    };

    return (
        <div className="container">
            <h1>Chemistry 12 Attendance</h1>
            <div>
                {students.map((student) => (
                    <div key={student.id} className="student">
                        <p>{student.name}</p>
                        <div className="buttons">
                            <button className={`button ${attendanceStatus === 'present' && selectedStudent === student ? 'present' : ''}`} onClick={() => { handleStudentSelect(student); handleStatusChange('present'); }}>Present</button>
                            <button className={`button ${attendanceStatus === 'absent' && selectedStudent === student ? 'absent' : ''}`} onClick={() => { handleStudentSelect(student); handleStatusChange('absent'); }}>Absent</button>
                            <input
                                type="date"
                                value={absentDate}
                                onChange={handleDateChange}
                                className="date-input"
                            />
                            <button className="submit-button" onClick={() => handleAttendanceSubmit(student)}>{loading ? <Spinner1 /> : 'Submit'}{submit ? <Spinner2 /> : ''}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
const Spinner1 = () => (
    <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
);
const Spinner2 = () => (
    <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Submitted</span>
    </div>
);


export default Chem12Attendance;