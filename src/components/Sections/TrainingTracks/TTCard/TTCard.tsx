import { ArrowRight } from 'lucide-react'
import React from 'react'
import './ttcard.scss'
import { Link } from 'react-router-dom'


interface TTCardType {
    id: string,
    color: string,
    tag?: string,
    icon: any,
    title: string,
    desc: string
}

const TTCard: React.FC<TTCardType> = (track) => {
    return (
        <div
            className="track-card"
            style={{ '--accent-color': track.color } as React.CSSProperties}
        >
            {track.tag && (
                <span className={`track-tag ${track.tag.toLowerCase().replace(' ', '-')}`}>
                    {track.tag}
                </span>
            )}

            <div className="track-icon-container">
                <div className="track-icon-glow"></div>
                {track.icon}
            </div>

            <div className="track-body">
                <h3 className="track-card-title">{track.title}</h3>
                <p className="track-card-desc">{track.desc}</p>
            </div>

            <Link to={`/tracks/${track.title}`} >
                <div className="track-card-footer">
                    <span className="track-cta">View Track</span>
                    <ArrowRight className="track-arrow" size={18} />
                </div>
            </Link>
        </div>
    )
}

export default TTCard