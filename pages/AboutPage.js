import React, { useEffect, useRef } from 'react';
import styles from '../styles/AboutPage.module.css';

const AboutPage = () => {
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.visible);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sectionRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            sectionRefs.current.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Welcome to Studyphora Institute</h1>
                <nav className={styles.nav}>
                    <ul>
                        <li><a href="#about">About</a></li>
                        <li><a href="#history">History</a></li>
                        <li><a href="#staff">Staff</a></li>
                        <li><a href="#results">Results</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </header>

            <section id="about" className={styles.section} ref={el => sectionRefs.current[0] = el}>
                <h2>About Us</h2>
                <p>Studyphora Institute is a leading educational institution committed to nurturing young minds and fostering academic excellence. Our state-of-the-art facilities and innovative teaching methods create an environment where students can thrive and reach their full potential.</p>
            </section>

            <section id="history" className={styles.section} ref={el => sectionRefs.current[1] = el}>
                <h2>Our Rich History</h2>
                <p>Founded in 1975, Studyphora Institute has a proud history of academic achievement and community engagement. What started as a small local school has grown into a renowned institution, shaping the futures of thousands of students over the past five decades.</p>
                <p>Our commitment to innovation in education has led to numerous accolades and recognition as one of the top educational institutions in the region.</p>
            </section>

            <section id="staff" className={styles.section} ref={el => sectionRefs.current[2] = el}>
                <h2>Our Dedicated Staff</h2>
                <p>At Studyphora, we pride ourselves on our team of highly qualified and passionate educators. Our staff includes:</p>
                <ul>
                    <li>Over 50 PhDs in various disciplines</li>
                    <li>Award-winning researchers and authors</li>
                    <li>Industry experts bringing real-world experience to the classroom</li>
                </ul>
                <p>Our low student-to-teacher ratio ensures personalized attention and support for every student.</p>
            </section>

            <section id="results" className={styles.section} ref={el => sectionRefs.current[3] = el}>
                <h2>Outstanding Results</h2>
                <p>Year after year, Studyphora Institute produces exceptional results:</p>
                <ul>
                    <li>98% graduation rate</li>
                    <li>85% of graduates accepted into top-tier universities</li>
                    <li>Over 50 national academic competition winners in the last 5 years</li>
                    <li>Consistently ranked in the top 5% of schools nationwide</li>
                </ul>
            </section>

            <section id="contact" className={styles.section} ref={el => sectionRefs.current[4] = el}>
                <h2>Contact Us</h2>
                <address>
                    123 Education Lane<br />
                    Learnville, Knowledge State 54321<br />
                    Phone: (555) 123-4567<br />
                    Email: info@studyphora.edu
                </address>
            </section>

            <footer className={styles.footer}>
                <p>&copy; 2024 Studyphora Institute. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AboutPage;