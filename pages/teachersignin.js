import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/TeacherSignIn.module.css';
import { useRouter } from 'next/router';


const LoginForm = () => {
    const [enteredusername, setEnteredUsername] = useState('');
    const [enteredpassword, setEnteredPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter('');



    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/teacher');
            const data = await response.json();
            const foundTeacher = data.find(teacher => teacher.username === enteredusername && teacher.password === enteredpassword);
            if (foundTeacher) {
                localStorage.setItem('username', enteredusername);
                router.push('/teacherportal')
            } else {
                setError('User not found. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };
    return (
        <div className={styles.container} onClick={() => { }}>
            <div className={styles.top} />
            <div className={styles.bottom} />
            <div className={styles.center}>
                <h2>Please Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username" className={styles.label}>Username</label>
                        <input
                            type="email"
                            id="username"
                            className={styles.input}
                            placeholder="Enter your email"
                            value={enteredusername}
                            onChange={(e) => setEnteredUsername(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            placeholder="Enter your password"
                            value={enteredpassword}
                            onChange={(e) => setEnteredPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.button}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
