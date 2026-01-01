import React from 'react'
import './featurecard.scss'

interface FeatureCardType {
    title: string,
    desc: string,
    icon: any,
}

const FeatureCard: React.FC<FeatureCardType> = (feature) => {
    return (
        <div className="feature-card">
            <div className="card-border-gradient"></div>
            <div className="feature-card-inner">
                <div className="feature-icon-box">
                    {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
            </div>
        </div>
    )
}

export default FeatureCard