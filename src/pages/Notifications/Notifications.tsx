import { useState } from 'react';
import { Bell, Briefcase, MessageSquare, BookOpen, Settings, CheckCircle2, Trash2 } from 'lucide-react';
import './notifications.scss';
import VisualHeader from '../../components/VisualHeader/VisualHeader';
import { notificationsData } from '../../data/notificationsData';
import type { Notification } from '../../data/notificationsData';

const Notifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>(notificationsData);
    const [filter, setFilter] = useState<'all' | 'unread'>('all');

    const filteredNotifications = filter === 'all'
        ? notifications
        : notifications.filter(n => !n.isRead);

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'job': return <Briefcase size={20} className="icon-job" />;
            case 'message': return <MessageSquare size={20} className="icon-message" />;
            case 'course': return <BookOpen size={20} className="icon-course" />;
            case 'system': return <Settings size={20} className="icon-system" />;
            default: return <Bell size={20} />;
        }
    };

    return (
        <div className="notifications-wrapper">
            <div className="notifications-container">
                <header className="notifications-header">
                    <VisualHeader
                        badge="Activity Feed"
                        title="Stay Updated"
                        gradient_title="with Alerts"
                        subtitle="Manage your notifications, job matches, and messages in one place."
                    />
                </header>

                <div className="notifications-controls card-glass">
                    <div className="filter-tabs">
                        <button
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All Notifications
                            <span className="count">{notifications.length}</span>
                        </button>
                        <button
                            className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
                            onClick={() => setFilter('unread')}
                        >
                            Unread
                            <span className="count">{notifications.filter(n => !n.isRead).length}</span>
                        </button>
                    </div>
                    <button className="mark-all-btn" onClick={markAllAsRead}>
                        <CheckCircle2 size={16} />
                        Mark all as read
                    </button>
                </div>

                <div className="notifications-list">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`notification-card card-glass ${notification.isRead ? 'read' : 'unread'}`}
                            >
                                <div className="notification-icon-wrapper">
                                    {getIcon(notification.type)}
                                </div>
                                <div className="notification-content">
                                    <div className="notification-top">
                                        <h3 className="notification-title">{notification.title}</h3>
                                        <span className="notification-time">{notification.time}</span>
                                    </div>
                                    <p className="notification-desc">{notification.description}</p>
                                    <div className="notification-actions">
                                        {!notification.isRead && (
                                            <button
                                                className="action-btn read-btn"
                                                onClick={() => markAsRead(notification.id)}
                                            >
                                                Mark as read
                                            </button>
                                        )}
                                        <button
                                            className="action-btn delete-btn"
                                            onClick={() => deleteNotification(notification.id)}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                                {!notification.isRead && <div className="unread-dot"></div>}
                            </div>
                        ))
                    ) : (
                        <div className="empty-notifications card-glass">
                            <Bell size={48} className="empty-icon" />
                            <h3>All caught up!</h3>
                            <p>No {filter === 'unread' ? 'unread' : ''} notifications at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
