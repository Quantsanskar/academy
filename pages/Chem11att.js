import { useState, useEffect } from 'react';

const Chem11Attendance = () => {
    const [students, setStudents] = useState([]);
    const [presentStudents, setPresentStudents] = useState([]);
    const [absentStudents, setAbsentStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/attendancechem11');
            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error.message);
        }
    };

    const handlePresentToggle = (student) => {
        if (presentStudents.includes(student)) {
            setPresentStudents(presentStudents.filter((s) => s !== student));
            setAbsentStudents([...absentStudents, student]);
        } else {
            setPresentStudents([...presentStudents, student]);
            setAbsentStudents(absentStudents.filter((s) => s !== student));
        }
    };

    const handleSubmit = async () => {
        try {
            // Update attendance for present students
            await Promise.all(
                presentStudents.map(async (student) => {
                    const response = await fetch(`http://127.0.0.1:8000/api/attendancechem11`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: student.id,
                            total_classes: parseInt(student.total_classes) + 1,
                            classes_attended: parseInt(student.classes_attended) + 1,
                        }),
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to update attendance for ${student.name}`);
                    }
                })
            );

            // Update absent days for absent students
            await Promise.all(
                absentStudents.map(async (student) => {
                    const response = await fetch(`http://127.0.0.1:8000/api/attendancechem11`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: student.id,
                            absent_days: parseInt(student.absent_days) + 1,
                        }),
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to update attendance for ${student.name}`);
                    }
                })
            );

            // Reset state
            setPresentStudents([]);
            setAbsentStudents([]);
            alert('Attendance updated successfully');
        } catch (error) {
            console.error('Error updating attendance:', error.message);
        }
    };

    return (
        <div>
            <h1>Chemistry 11 Attendance</h1>
            <div>
                {students.map((student) => (
                    <div key={student.id}>
                        <p>{student.name}</p>
                        <div>
                            <label>
                                Present
                                <input
                                    type="checkbox"
                                    checked={presentStudents.includes(student)}
                                    onChange={() => handlePresentToggle(student)}
                                />
                            </label>
                            <label>
                                Absent
                                <input
                                    type="checkbox"
                                    checked={absentStudents.includes(student)}
                                    onChange={() => handlePresentToggle(student)}
                                />
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Chem11Attendance;
