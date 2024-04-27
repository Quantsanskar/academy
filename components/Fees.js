import { useState } from 'react';
import styles from '../styles/Fees.module.css';
import feeData from '../data/feeData.js';

const Fees = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
    };




    return (
        <div className={styles.feesContainer}>
            <h2>Fee Status</h2>
            <div className={styles.studentList}>
                {feeData.map((student, index) => (
                    <div key={index} className={styles.studentItem} onClick={() => handleSelectStudent(student)}>
                        <h3>{student.studentName}</h3>
                        <p>Roll Number: {student.rollNumber}</p>
                        <p>Admission Number: {student.admissionNumber}</p>
                    </div>
                ))}
            </div>
            {selectedStudent && (
                <div className={styles.receipt}>
                    <h3>Fee Receipt</h3>
                    <p>Name: {selectedStudent.studentName}</p>
                    <p>Roll Number: {selectedStudent.rollNumber}</p>
                    <p>Admission Number: {selectedStudent.admissionNumber}</p>
                    <p>Total Fees: {selectedStudent.totalFees}</p>
                    <p>Fees Paid: {selectedStudent.feesPaid}</p>
                    <p>Fees Due: {selectedStudent.feesDue}</p>
                    <p>Payment Deadline: {selectedStudent.paymentDeadline}</p>
                </div>
            )}
        </div>
    );
};

export default Fees;
