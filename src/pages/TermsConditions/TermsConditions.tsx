import React, { useEffect } from 'react';
import '../PrivacyPolicy/privacyPolicy.scss'; // Reusing shared legal styles
import VisualHeader from '../../components/VisualHeader/VisualHeader';

const TermsConditions: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page terms-conditions">
            {/* Background elements */}
            <div className="bg-glow-1"></div>
            <div className="bg-glow-2"></div>

            <div className="legal-header">
                <VisualHeader
                    badge="Legal"
                    title="Terms &"
                    gradient_title="Conditions"
                    subtitle="Understanding our agreement and the rules of the HirePilot platform."
                />
            </div>

            <div className="legal-content glass-panel">
                <section>
                    <h2>1. Agreement to Terms</h2>
                    <p>
                        By accessing or using HirePilot, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the service.
                    </p>
                </section>

                <section>
                    <h2>2. Use License</h2>
                    <p>
                        Permission is granted to temporarily use the materials (information or software) on HirePilot's website for personal, non-commercial transitory viewing only.
                    </p>
                    <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                    <ul>
                        <li>Modify or copy the materials.</li>
                        <li>Use the materials for any commercial purpose.</li>
                        <li>Attempt to decompile or reverse engineer any software contained on HirePilot.</li>
                        <li>Remove any copyright or other proprietary notations from the materials.</li>
                    </ul>
                </section>

                <section>
                    <h2>3. Disclaimer</h2>
                    <p>
                        The materials on HirePilot are provided on an 'as is' basis. HirePilot makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                </section>

                <section>
                    <h2>4. Limitations</h2>
                    <p>
                        In no event shall HirePilot or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on HirePilot.
                    </p>
                </section>

                <section>
                    <h2>5. Governing Law</h2>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws of Karnataka, India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TermsConditions;
