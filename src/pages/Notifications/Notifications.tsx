import React, { useState, useMemo, useEffect } from 'react';
import { Bell, Briefcase, MessageSquare, Settings, CheckCircle2, Trash2, RotateCcw } from 'lucide-react';
import VisualHeader from '../../components/VisualHeader/VisualHeader';
import type { Notification } from '../../data/notificationsData';
import EmptyState from '../../components/EmptyState/EmptyState';
import NotificationItem from './NotificationItem/NotificationItem';
import { Box, Container, Stack, Typography, Button, Select, MenuItem, useTheme, alpha, Snackbar, Alert, Chip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { notificationActions } from '../../store/Notification/notification.slice';

const Notifications: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [lastDeleted, setLastDeleted] = useState<Notification | null>(null);
  const [showUndo, setShowUndo] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'unread'>('recent');
  const theme = useTheme();

  const notifications = useAppSelector(state => state.notification.notifications);
  const dispatch = useAppDispatch();

  const filteredNotifications = useMemo(() => {
    let filtered = filter === 'all' ? notifications : notifications.filter((n: Notification) => !n.isRead);

    if (sortBy === 'unread') {
      filtered = [...filtered].sort((_a, b) => (b.isRead ? -1 : 1));
    }
    return filtered;
  }, [notifications, filter, sortBy]);

  const unreadCount = useMemo(() => notifications.filter((n: Notification) => !n.isRead).length, [notifications]);

  const stats = useMemo(() => ({
    total: notifications.length,
    unread: unreadCount,
  }), [notifications, unreadCount]);

  const markAsRead = (id: string): void => {
    dispatch(notificationActions.markAsRead(id));
  };

  const markAllAsRead = (): void => {
    dispatch(notificationActions.markAllAsRead());
  };

  const deleteNotification = (id: string): void => {
    const target = notifications.find((n: Notification) => n.id === id);
    if (target) {
      setLastDeleted(target);
      setShowUndo(true);
      dispatch(notificationActions.deleteNotification(id));
    }
  };

  const undoDelete = (): void => {
    if (lastDeleted) {
      dispatch(notificationActions.addNotification(lastDeleted));
      setShowUndo(false);
      setLastDeleted(null);
    }
  };

  const clearAll = (): void => {
    dispatch(notificationActions.clearNotification());
  };

  useEffect(() => {
    if (showUndo) {
      const timer = setTimeout(() => setShowUndo(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showUndo]);

  const getIcon = (type: Notification['type']): React.ReactNode => {
    const props = { size: 24, strokeWidth: 2 };
    const iconMap: Record<Notification['type'], React.ReactNode> = {
      job: <Briefcase {...props} />,
      message: <MessageSquare {...props} />,
      system: <Settings {...props} />,
    };
    return iconMap[type] || <Bell {...props} />;
  };

  return (
    <Box sx={{ minHeight: '100vh', py: { xs: 8, md: 10 }, bgcolor: 'background.default', position: 'relative', overflowX: 'hidden' }}>
      {/* Decorative Background */}
      <Box sx={{
        position: 'absolute',
        width: 600,
        height: 600,
        filter: 'blur(120px)',
        zIndex: 0,
        opacity: 0.1,
        borderRadius: '50%',
        top: -200,
        right: -100,
        bgcolor: 'secondary.main',
        pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'absolute',
        width: 500,
        height: 500,
        filter: 'blur(120px)',
        zIndex: 0,
        opacity: 0.1,
        borderRadius: '50%',
        top: -200,
        left: -100,
        bgcolor: 'primary.main',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 6 }}>
          <VisualHeader
            badge={`Activity Feed • ${stats.unread} New`}
            title="Stay Updated"
            gradient_title="with Alerts"
            subtitle="Manage your notifications and track job updates in one place."
          />
        </Box>

        {/* Controls */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', md: 'center' }}
          spacing={3}
          sx={{ mb: 4 }}
        >
          <Stack direction="row" spacing={1} sx={{ p: 0.5, bgcolor: alpha(theme.palette.background.paper, 0.5), borderRadius: 3, backdropFilter: 'blur(10px)', border: '1px solid', borderColor: 'divider' }}>
            {(['all', 'unread'] as const).map((f) => (
              <Button
                key={f}
                onClick={() => setFilter(f)}
                sx={{
                  borderRadius: 2.5,
                  px: 3,
                  py: 1,
                  color: filter === f ? 'common.white' : 'text.secondary',
                  bgcolor: filter === f ? 'primary.main' : 'transparent',
                  fontWeight: 700,
                  textTransform: 'capitalize',
                  '&:hover': {
                    bgcolor: filter === f ? 'primary.dark' : alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                {f}
                <Chip
                  label={f === 'all' ? stats.total : stats.unread}
                  size="small"
                  sx={{
                    ml: 1,
                    height: 20,
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    bgcolor: filter === f ? 'rgba(255,255,255,0.2)' : alpha(theme.palette.primary.main, 0.1),
                    color: filter === f ? 'white' : 'primary.main',
                  }}
                />
              </Button>
            ))}
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'unread')}
              size="small"
              sx={{
                borderRadius: 2,
                bgcolor: alpha(theme.palette.background.paper, 0.6),
                fontWeight: 600,
                '.MuiSelect-select': { py: 1.2 },
                fieldset: { borderColor: 'divider' },
              }}
            >
              <MenuItem value="recent">Most Recent</MenuItem>
              <MenuItem value="unread">Unread First</MenuItem>
            </Select>

            <Button
              startIcon={<CheckCircle2 size={16} />}
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': { color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.1) }
              }}
            >
              Mark all read
            </Button>

            <Button
              startIcon={<Trash2 size={16} />}
              onClick={clearAll}
              disabled={notifications.length === 0}
              sx={{
                color: 'error.main',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.1) }
              }}
            >
              Clear all
            </Button>
          </Stack>
        </Stack>

        {/* Notifications List */}
        <Box sx={{ minHeight: 400 }}>
          {filteredNotifications.length === 0 ? (
            <EmptyState
              title="No notifications yet"
              description={filter === 'unread' ? "You've read everything! Check 'All' for history." : "We'll notify you here when there's activity."}
            />
          ) : (
            <Stack spacing={0}>
              {filteredNotifications.map((n: Notification) => (
                <NotificationItem
                  key={n.id}
                  n={n}
                  getIcon={getIcon}
                  onDelete={deleteNotification}
                  onRead={markAsRead}
                />
              ))}
            </Stack>
          )}
        </Box>

        <Snackbar
          open={showUndo}
          autoHideDuration={5000}
          onClose={() => setShowUndo(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{ bottom: { xs: 24, md: 40 } }}
        >
          <Alert
            icon={false}
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              color: 'text.primary',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              boxShadow: theme.shadows[6],
              alignItems: 'center',
              py: 1,
              px: 2
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="body2" fontWeight={600}>Notification removed</Typography>
              <Button
                size="small"
                startIcon={<RotateCcw size={14} />}
                onClick={undoDelete}
                variant="contained"
                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, fontSize: '0.8rem', py: 0.5 }}
              >
                Undo
              </Button>
            </Stack>
          </Alert>
        </Snackbar>

      </Container>
    </Box>
  );
};

export default Notifications;