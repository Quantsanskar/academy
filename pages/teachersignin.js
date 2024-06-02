import React, { useState } from 'react';
import styles from '../styles/TeacherSignIn.module.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you can add your login logic
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className={styles.container} onClick={() => { }}>
            <div className={styles.top} />
            <div className={styles.bottom} />
            <div className={styles.center}>
                <h2>Please Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;