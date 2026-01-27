import React from 'react'
import './notificationsBadge.scss'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

interface NotificationsBadgeProps {
    setIsNotificationOpen: (value: boolean) => void;
}

const NotificationsBadge : React.FC<NotificationsBadgeProps> = ({setIsNotificationOpen}) => {
    return (
        <div className="notification-dropdown dropdown-responsive">
            <div className="dropdown-header">
                <h3>Notifications</h3>
                <button className="close-btn" onClick={() => setIsNotificationOpen(false)}>
                    <X size={18} />
                </button>
            </div>
            <div className="notification-item">
                <div className="notification-dot"></div>
                <div>
                    <p className="notification-title">New job matching your profile!</p>
                    <p className="notification-time">5 minutes ago</p>
                </div>
            </div>
            <div className="notification-item">
                <div className="notification-dot"></div>
                <div>
                    <p className="notification-title">You have a new message</p>
                    <p className="notification-time">2 hours ago</p>
                </div>
            </div>
            <div className="notification-footer">
                <Link to="/notifications" className="view-all">View All</Link>
            </div>
        </div>
    )
}

export default NotificationsBadge