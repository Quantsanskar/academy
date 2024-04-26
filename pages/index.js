import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Importing useRouter from 'next/router'
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Index = () => {
    const [whyChooseVisible, setWhyChooseVisible] = useState(false);
    const [programsVisible, setProgramsVisible] = useState(false);

    const router = useRouter(); // Using useRouter hook
    useEffect(() => {
        const handleScroll = () => {
            const whyChooseSection = document.querySelector(`.${styles.whyChoose}`);
            const programsSection = document.querySelector(`.${styles.programsSection}`);

            if (whyChooseSection) {
                const whyChooseTop = whyChooseSection.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (whyChooseTop < windowHeight * 0.8) {
                    setWhyChooseVisible(true);
                }
            }

            if (programsSection) {
                const programsTop = programsSection.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (programsTop < windowHeight * 0.8) {
                    setProgramsVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call handleScroll initially to check visibility
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className={styles.container}>
                <Head>
                    <title>A and G Academy</title>
                    <meta name="description" content="A and G Academy - Your Path to Success" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className={styles.headerBackground}></div>
                <div className={styles.header}>
                    <img src="/ag_logo.png" alt="A and G Academy Logo" className={styles.headerLogo} />
                </div>

                {/* Navbar */}
                <nav className={styles.navbar}>
                    <ul className={styles.navList}>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About A&G</a></li>
                        <li><a href="#">A&G Results</a></li>
                        <li className={styles.dropdown}>
                            <a href="#">Student Zone</a>
                            <div className={styles.dropdownContent}>
                                <a href="#">Student Portal</a>
                            </div>
                        </li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </nav>

                {/* Institute Logo and Tagline */}
                <div className={styles.instituteInfo}>
                    <img src="/ag_logo.png" alt="Institute Logo" className={styles.instituteLogo} />
                    <p className={styles.tagline}>It's time to learn....</p>
                </div>

                {/* Admission Pamphlets Section */}
                <div className={styles.admissionPamphlets}>
                    {/* Left: Animated Admission Templates */}
                    <div className={styles.admissionTemplates}>
                        {/* Dummy GIF */}
                        <img src="/join sus.jpg" alt="Dummy Image" className={styles.admissionImage} />
                    </div>
                    {/* Right: Attractive Container with Service Intro */}
                    <div className={styles.servicesContainer}>
                        <h2>Welcome to Our Academy</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et lectus eu enim mattis aliquet id vel nisi.</p>
                        <button className={styles.aboutUsButton}>About Us</button>
                    </div>
                </div>




                {/* Why Choose A & G Section */}
                <div className={styles.whyChoose}>
                    <h2 className={whyChooseVisible ? styles.visible : ''}>Why Choose A & G</h2>
                    <div className={styles.features}>
                        <div className={`${styles.feature} ${whyChooseVisible ? styles.animated : ''}`}>
                            <h3>Time Tested</h3>
                            <p>Our methods have been proven effective over time.</p>
                        </div>
                        <div className={`${styles.feature} ${whyChooseVisible ? styles.animated : ''}`}>
                            <h3>Learning Pedagogy</h3>
                            <p>We follow a structured and effective learning pedagogy.</p>
                        </div>
                        <div className={`${styles.feature} ${whyChooseVisible ? styles.animated : ''}`}>
                            <h3>Highest Success Rate</h3>
                            <p>Our students achieve top results consistently.</p>
                        </div>
                        <div className={`${styles.feature} ${whyChooseVisible ? styles.animated : ''}`}>
                            <h3>Learn from Best Teachers</h3>
                            <p>Our faculty comprises experienced and knowledgeable teachers.</p>
                        </div>
                        <div className={`${styles.feature} ${whyChooseVisible ? styles.animated : ''}`}>
                            <h3>Personal Mentorship</h3>
                            <p>We provide personalized mentorship to each student.</p>
                        </div>
                        <div className={`${styles.feature} ${whyChooseVisible ? styles.animated : ''}`}>
                            <h3>Scientifically Designed Study Material</h3>
                            <p>Our study material is meticulously crafted based on scientific principles.</p>
                        </div>
                        <div className={`${styles.feature} ${whyChooseVisible ? styles.animated : ''}`}>
                            <h3>Highly Competitive Peer Group</h3>
                            <p>Join a community of motivated and high-achieving peers.</p>
                        </div>
                    </div>
                </div>

                {/* Our Programs Section */}
                <div className={styles.programsSection}>
                    <div className={styles.programsHeadingContainer}>
                        <h2 className={programsVisible ? styles.visible : ''}>Our Programs</h2>
                    </div>
                    {/* Programs Container */}
                    <div className={styles.programsContainer}>
                        <p className={styles.programsDescription}>
                            Learn from our comprehensive classroom programs designed to help you achieve your academic goals. Our expert faculty and personalized approach ensure the best learning experience for every student.
                        </p>
                        <button className={styles.exploreButton} onClick={() => router.push('/studentsignin')}>Explore Now</button>
                    </div>
                </div>

                {/* Student's Journey */}
                <div className={styles.studentJourney}>
                    <div className={styles.journeyImage}></div>
                    <div className={styles.slogan}>
                        <p>Your all concerns are solved at <span>A&G</span></p>
                        <div className={styles.gradientLine}></div>
                    </div>
                </div>

                {/* Our Trailblazers */}
                <div className={styles.trailBlazersSection}>
                    <h2 className={styles.sectionHeading}>Our Trail Blazers</h2>
                    <div className={styles.profilesContainer}>
                        <div className={styles.profile}>
                            <img src="/founder.png" alt="Profile 1" className={styles.profileImage} />
                            <div className={styles.profileDetails}>
                                <h3>John Doe</h3>
                                <p>Batch: 2023</p>
                                <p>Percentage: 98%</p>
                                <p className={styles.feedback}>"A&G Academy has truly transformed my academic journey. I'm grateful for the guidance and support."</p>
                            </div>
                        </div>
                        <div className={styles.profile}>
                            <img src="/cofounder.png" alt="Profile 2" className={styles.profileImage} />
                            <div className={styles.profileDetails}>
                                <h3>Jane Smith</h3>
                                <p>Batch: 2023</p>
                                <p>Percentage: 97%</p>
                                <p className={styles.feedback}>"The personalized approach and expert faculty at A&G Academy helped me excel in my studies."</p>
                            </div>
                        </div>
                        <div className={styles.profile}>
                            <img src="/web-developer.jpeg" alt="Profile 3" className={styles.profileImage} />
                            <div className={styles.profileDetails}>
                                <h3>Michael Johnson</h3>
                                <p>Batch: 2023</p>
                                <p>Percentage: 96%</p>
                                <p className={styles.feedback}>"A&G Academy provided me with the tools and resources to achieve my academic goals."</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className={styles.footer}>
                    <div className={styles.footerContainer}>
                        {/* Contact Us */}
                        <div className={styles.contactUs}>
                            <h3>Contact Us</h3>
                            <p>Email: contact@example.com</p>
                            <p>Phone: +1 123-456-7890</p>
                            <p>Address: 123 Main Street, City, Country</p>
                        </div>
                        {/* Policies */}
                        <div className={styles.policies}>
                            <h3>Policies</h3>
                            <ul>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms of Service</a></li>
                                <li><a href="#">Refund Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    {/* Copyright Line */}
                    <div className={styles.copyright}>
                        © 2024 STUDYPHORA | ALL RIGHTS RESERVED
                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;
