import React from 'react'
import './hiwcard.scss'

interface HIWCardType {
    step: string,
    Icon: any,
    title: string,
    desc: string

}

const HIWCard: React.FC<HIWCardType> = ({ step, Icon, title, desc }) => {
    return (
        <div className="hiw-card">
            <div className="hiw-step-pill">Step {step}</div>

            <div className="hiw-icon-box">
                {Icon}
            </div>

            <h3 className="hiw-card-title">{title}</h3>
            <p className="hiw-card-desc">{desc}</p>
        </div>
    )
}

export default HIWCard