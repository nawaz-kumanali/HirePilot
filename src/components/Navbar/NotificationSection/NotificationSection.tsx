import { useState, useRef, useEffect, useCallback } from "react";
import { Bell } from "lucide-react";
import { IconButton, Badge, Box } from "@mui/material";
import { useAppSelector } from "../../../store/hooks";
import NotificationsBadge from "../../NotificationsBadge/NotificationsBadge";

const NotificationSection = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const unreadNotificationCount = useAppSelector(state => state.notification.unreadNotificationCount);
    const notificationRef = useRef<HTMLDivElement>(null);

    const toggleNotification = useCallback(() => {
        setIsNotificationOpen(prev => !prev);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isNotificationOpen &&
                notificationRef.current &&
                !notificationRef.current.contains(event.target as Node)
            ) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isNotificationOpen]);

    return (
        <Box ref={notificationRef} sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <IconButton
                onClick={toggleNotification}
                color="inherit"
            >
                <Badge badgeContent={unreadNotificationCount} color="error">
                    <Bell size={20} />
                </Badge>
            </IconButton>

            {isNotificationOpen && (
                <Box sx={{ position: 'absolute', top: 50, right: 0, zIndex: 10 }}>
                    <NotificationsBadge setIsNotificationOpen={setIsNotificationOpen} />
                </Box>
            )}
        </Box>
    );
};

export default NotificationSection;
