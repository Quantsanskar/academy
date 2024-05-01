import React, { useState} from 'react';
import styles from '../styles/studentSignIn.module.css';
import { useRouter } from 'next/router';
const StudentSignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const router=useRouter();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/student');
            const data = await response.json();
            const foundStudent = data.find(student => student.username === username && student.password === password);
            if (foundStudent) {
                localStorage.setItem('username', username);
                router.push('/studentportal')
            } else {
                setErrorMessage('User not found. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };

    return (
        <div className={styles.background}>
            <div className={styles.shape}></div>
            <div className={styles.shape}></div>
            <form className={styles.form} onSubmit={handleLogin}>
                <h3>Login Here</h3>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Email or Phone" id="username" value={username} onChange={handleUsernameChange} />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" value={password} onChange={handlePasswordChange} />
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default StudentSignIn;
