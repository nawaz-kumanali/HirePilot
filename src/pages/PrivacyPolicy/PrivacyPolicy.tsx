import React, { useEffect } from 'react';
import './privacyPolicy.scss';

const PrivacyPolicy: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page privacy-policy">
            <div className="legal-header">
                <h1 className="gradient-text">Privacy Policy</h1>
                <p className="last-updated">Last Updated: January 2026</p>
            </div>

            <div className="legal-content glass-panel">
                <section>
                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to HirePilot ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy.
                        If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
                    </p>
                </section>

                <section>
                    <h2>2. Information We Collect</h2>
                    <p>
                        We collect personal information that you provide to us such as name, email address, and professional background when you register on the platform.
                        We also collect data through your interactions with our AI tools, mock interviews, and courses to improve your experience.
                    </p>
                </section>

                <section>
                    <h2>3. How We Use Your Information</h2>
                    <ul>
                        <li>To provide and maintain our Service.</li>
                        <li>To notify you about changes to our Service.</li>
                        <li>To provide AI-driven feedback on your interview performance.</li>
                        <li>To monitor the usage of our Service and detect technical issues.</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Data Security</h2>
                    <p>
                        The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.
                        While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                    </p>
                </section>

                <section>
                    <h2>5. Your Privacy Rights</h2>
                    <p>
                        You have the right to access, update, or delete the information we have on you. Whenever made possible, you can access, update or request deletion of your personal information directly within your account settings section.
                    </p>
                </section>

                <section>
                    <h2>6. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at:
                        <a href="mailto:iamnawazahmad777@gmail.com">iamnawazahmad777@gmail.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
