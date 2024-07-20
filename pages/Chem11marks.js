import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Chem11marks.module.css';

const Chem11marks = () => {
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        title: '',
        username: '',
        total_marks: '',
        marks_obtained: '',
        remarks: '',
        mobile: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/markschem11', formData);
            alert('Data submitted successfully');
        } catch (error) {
            console.error('Error submitting marks data:', error.message);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2>Chemistry 11 Marks Form</h2>
            <form onSubmit={handleSubmit}>
                <label className={styles.label}>Name:</label>
                <input className={styles.input} type="text" name="name" value={formData.name} onChange={handleChange} /><br />
                <label className={styles.label}>Subject:</label>
                <input className={styles.input} type="text" name="subject" value={formData.subject} onChange={handleChange} /><br />
                <label className={styles.label}>Title:</label>
                <input className={styles.input} type="text" name="title" value={formData.title} onChange={handleChange} /><br />
                <label className={styles.label}>Username:</label>
                <input className={styles.input} type="text" name="username" value={formData.username} onChange={handleChange} /><br />
                <label className={styles.label}>Total Marks:</label>
                <input className={styles.input} type="text" name="total_marks" value={formData.total_marks} onChange={handleChange} /><br />
                <label className={styles.label}>Marks Obtained:</label>
                <input className={styles.input} type="text" name="marks_obtained" value={formData.marks_obtained} onChange={handleChange} /><br />
                <label className={styles.label}>Remarks:</label>
                <input className={styles.input} type="text" name="remarks" value={formData.remarks} onChange={handleChange} /><br />
                <label className={styles.label}>Mobile:</label>
                <input className={styles.input} type="text" name="mobile" value={formData.mobile} onChange={handleChange} /><br />
                <button className={styles.submitButton} type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Chem11marks;
