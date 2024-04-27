// FancyPage.js

import React from 'react';
import styles from '../styles/AboutPage.module.css';

const FancyPage = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Welcome to our Institute</h1>
                <nav className={styles.nav}>
                    <ul>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </header>

            <section id="about" className={styles.section}>
                <h2>About Us</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </section>

            <section id="services" className={styles.section}>
                <h2>Our Services</h2>
                <p>Nulla facilisi. Mauris efficitur eros non lectus consequat, vel dapibus lectus bibendum.</p>
            </section>

            <section id="contact" className={styles.section}>
                <h2>Contact Us</h2>
                <p>Curabitur euismod felis vitae lorem placerat, at fermentum nisi ullamcorper.</p>
            </section>

            <footer className={styles.footer}>
                <p>&copy; 2024 Fancy Page. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default FancyPage;
