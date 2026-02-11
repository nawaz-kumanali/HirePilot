export interface NotificationItem {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    isRead: boolean;
    type: 'job' | 'message' | 'alert';
}

export const mockNotifications: NotificationItem[] = [
    {
        id: '1',
        title: 'New job matching your profile!',
        description: 'AI Engineer at TechCorp is looking for candidates.',
        timestamp: '5 minutes ago',
        isRead: false,
        type: 'job'
    },
    {
        id: '2',
        title: 'You have a new message',
        description: 'Recruiter from InnovateSoft sent you a message.',
        timestamp: '2 hours ago',
        isRead: false,
        type: 'message'
    },
    {
        id: '3',
        title: 'Interview Reminder',
        description: 'Mock interview session starting in 30 minutes.',
        timestamp: '1 day ago',
        isRead: true,
        type: 'alert'
    },
    {
        id: '4',
        title: 'Application Viewed',
        description: 'Your application for Frontend Lead was viewed.',
        timestamp: '2 days ago',
        isRead: true,
        type: 'job'
    }
];
