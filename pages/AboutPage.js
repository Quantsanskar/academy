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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada odio ac lacus tincidunt, in eleifend tortor scelerisque. Sed eget scelerisque orci, a condimentum libero.</p>
                <p>Etiam ullamcorper metus quis metus fringilla, id sagittis sapien suscipit. Vivamus auctor, lectus nec egestas lobortis, lorem velit ultricies purus, vitae dapibus nisi lacus vel enim.</p>
            </section>

            <section id="services" className={styles.section}>
                <h2>Our Real-Time Services</h2>
                <ul>
                    <li>Service 1</li>
                    <li>Service 2</li>
                    <li>Service 3</li>
                    <li>Service 4</li>
                </ul>
            </section>

            <section id="contact" className={styles.section}>
                <h2>Contact Us</h2>
                <address>
                    123 Main St<br />
                    City, State 12345<br />
                    Phone: 123-456-7890<br />
                    Email: example@example.com
                </address>
            </section>

            <footer className={styles.footer}>
                <p>&copy; 2024 STUDYPHORA. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default FancyPage;
