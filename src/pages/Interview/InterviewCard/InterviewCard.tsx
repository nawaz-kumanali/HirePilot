import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Badge from '../../../components/Badge/Badge';
import './interviewCard.scss';
import type { Interview } from '../../../types/interview';
import { motion, type Variants } from 'framer-motion';

interface InterviewCardProps {
    interview: Interview;
    onStartTraining: (interview: Interview) => void;
}

const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const InterviewCard = ({ interview, onStartTraining }: InterviewCardProps) => {
    const { company, position, date, time, duration, status, difficulty, topics } = interview;

    return (
        <motion.div
            className="interview-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <div className="interview-card-top">
                <div className="interview-card-badges">
                    <Badge variant={status === 'upcoming' ? 'info' : 'success'} className={status}>
                        {status}
                    </Badge>
                    <Badge variant="secondary" className={difficulty.toLowerCase()}>
                        {difficulty}
                    </Badge>
                </div>
                <span className="interview-company-tag">{company}</span>
            </div>

            <h3 className="interview-card-title">{position} Interview</h3>
            <p className="interview-position-text">{company}</p>

            <div className="interview-card-meta">
                <div className="interview-meta-row">
                    <Calendar size={16} />
                    <span>{date}</span>
                </div>
                <div className="interview-meta-row">
                    <Clock size={16} />
                    <span>{time} • {duration}</span>
                </div>
            </div>

            <div className="interview-topics">
                {topics.map((topic, idx) => (
                    <Badge key={idx} variant="ghost" size="sm" className="interview-topic-tag">
                        {topic}
                    </Badge>
                ))}
            </div>

            <button
                className="interview-btn-primary"
                onClick={() => onStartTraining(interview)}
            >
                Start Training <ArrowRight size={16} />
            </button>
        </motion.div>
    );
};

export default InterviewCard;