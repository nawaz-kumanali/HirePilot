import React, { useState } from 'react';
import {
    Bell, Lock, User, Palette, Mail, Shield,
    LogOut, Trash2, ChevronRight, Check, AlertTriangle,
    Save, Volume2, X, AlertCircle
} from 'lucide-react';

import './setting.scss'

const SettingsPage = () => {
    const [activeSection, setActiveSection] = useState('account');
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [logoutConfirm, setLogoutConfirm] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Account Settings
    const [accountSettings, setAccountSettings] = useState({
        email: 'iamnawazahmad777@gmail.com',
        username: 'nawaz.dev',
        language: 'en',
        timezone: 'UTC+5:30',
    });

    const Trophy = () => <Bell size={18} />;
    const Gift = () => <Volume2 size={18} />;

    // Notification Settings
    const [notifications, setNotifications] = useState([
        {
            id: 'email-lessons',
            title: 'New Lessons',
            description: 'Get notified when new lessons are published',
            enabled: true,
            icon: Bell,
        },
        {
            id: 'email-messages',
            title: 'Messages',
            description: 'Receive notifications for new messages',
            enabled: true,
            icon: Mail,
        },
        {
            id: 'email-achievements',
            title: 'Achievements',
            description: 'Get notified when you earn new achievements',
            enabled: true,
            icon: Trophy,
        },
        {
            id: 'push-lessons',
            title: 'Push Notifications',
            description: 'Enable push notifications on your device',
            enabled: false,
            icon: Volume2,
        },
        {
            id: 'email-digest',
            title: 'Weekly Digest',
            description: 'Receive a weekly summary of your progress',
            enabled: true,
            icon: Mail,
        },
        {
            id: 'email-promotions',
            title: 'Promotions & Offers',
            description: 'Get notified about special offers and discounts',
            enabled: false,
            icon: Gift,
        },
    ]);

    // Privacy Settings
    const [privacySettings, setPrivacySettings] = useState({
        profilePublic: true,
        showProgress: true,
        allowMessaging: true,
        activityVisible: true,
        dataCollection: false,
    });

    // Appearance Settings
    const [appearance, setAppearance] = useState({
        theme: 'light',
        fontSize: 16,
        compactMode: false,
    });

    // Security Settings
    const [twoFactor, setTwoFactor] = useState(false);
    const [sessionTimeout, setSessionTimeout] = useState(30);

    const settingSections = [
        {
            id: 'account',
            title: 'Account Settings',
            description: 'Manage your account',
            icon: User,
        },
        {
            id: 'notifications',
            title: 'Notifications',
            description: 'Control preferences',
            icon: Bell,
        },
        {
            id: 'privacy',
            title: 'Privacy & Security',
            description: 'Manage privacy',
            icon: Shield,
        },
        {
            id: 'appearance',
            title: 'Appearance',
            description: 'Customize interface',
            icon: Palette,
        },
        {
            id: 'security',
            title: 'Security',
            description: 'Advanced options',
            icon: Lock,
        },
    ];

    const handleNotificationToggle = (id: string) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
            )
        );
        showSuccess('Notification preference updated');
    };

    const handlePrivacyToggle = (key: keyof typeof privacySettings) => {
        setPrivacySettings(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
        showSuccess('Privacy setting updated');
    };

    const handleSaveSettings = () => {
        showSuccess('All settings have been saved successfully');
    };

    const handleLogout = () => {
        setLogoutConfirm(false);
        showSuccess('You have been logged out');
    };

    const handleDeleteAccount = () => {
        setDeleteDialog(false);
        showSuccess('Account deletion request submitted');
    };

    const showSuccess = (message: React.SetStateAction<string>) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 3000);
    };



    return (
        <div className="settings-wrapper">
            <div className="settings-container">

                {/* Header */}
                <div className="settings-header">
                    <div className="settings-header-content">
                        <h1 className="settings-title">Settings & Preferences</h1>
                        <p className="settings-subtitle">Manage your account, notifications, and security settings</p>
                    </div>
                </div>

                {/* Success Alert */}
                {successMessage && (
                    <div className="settings-alert settings-alert-success">
                        <div className="settings-alert-content">
                            <Check size={20} className="settings-alert-icon" />
                            <span>{successMessage}</span>
                        </div>
                        <button
                            className="settings-alert-close"
                            onClick={() => setSuccessMessage('')}
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}

                {/* Main Content */}
                <div className="settings-main">
                    {/* Sidebar */}
                    <aside className="settings-sidebar">
                        <div className="settings-nav">
                            {settingSections.map(section => {
                                const Icon = section.icon;
                                return (
                                    <button
                                        key={section.id}
                                        className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
                                        onClick={() => setActiveSection(section.id)}
                                    >
                                        <div className="settings-nav-icon">
                                            <Icon size={20} />
                                        </div>
                                        <div className="settings-nav-text">
                                            <div className="settings-nav-title">{section.title}</div>
                                            <div className="settings-nav-desc">{section.description}</div>
                                        </div>
                                        {activeSection === section.id && (
                                            <ChevronRight size={18} className="settings-nav-chevron" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    {/* Content Panel */}
                    <div className="settings-content-panel">

                        {/* Account Settings */}
                        {activeSection === 'account' && (
                            <div className="settings-section">
                                <div className="settings-section-header">
                                    <h2>Account Information</h2>
                                    <p>Update your personal and account details</p>
                                </div>

                                <div className="settings-form">
                                    <div className="settings-form-group">
                                        <label className="settings-label">Email Address</label>
                                        <input
                                            type="email"
                                            className="settings-input"
                                            value={accountSettings.email}
                                            onChange={(e) => setAccountSettings({ ...accountSettings, email: e.target.value })}
                                        />
                                    </div>

                                    <div className="settings-form-group">
                                        <label className="settings-label">Username</label>
                                        <input
                                            type="text"
                                            className="settings-input"
                                            value={accountSettings.username}
                                            onChange={(e) => setAccountSettings({ ...accountSettings, username: e.target.value })}
                                        />
                                    </div>

                                    <div className="settings-form-grid">
                                        <div className="settings-form-group">
                                            <label className="settings-label">Language</label>
                                            <select
                                                className="settings-input settings-select"
                                                value={accountSettings.language}
                                                onChange={(e) => setAccountSettings({ ...accountSettings, language: e.target.value })}
                                            >
                                                <option value="en">English</option>
                                                <option value="es">Spanish</option>
                                                <option value="fr">French</option>
                                                <option value="de">German</option>
                                                <option value="zh">Chinese</option>
                                            </select>
                                        </div>

                                        <div className="settings-form-group">
                                            <label className="settings-label">Timezone</label>
                                            <select
                                                className="settings-input settings-select"
                                                value={accountSettings.timezone}
                                                onChange={(e) => setAccountSettings({ ...accountSettings, timezone: e.target.value })}
                                            >
                                                <option value="UTC-8">UTC-8 (Pacific)</option>
                                                <option value="UTC-5">UTC-5 (Eastern)</option>
                                                <option value="UTC">UTC (London)</option>
                                                <option value="UTC+1">UTC+1 (Central Europe)</option>
                                                <option value="UTC+5:30">UTC+5:30 (India)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button className="settings-btn settings-btn-primary" onClick={handleSaveSettings}>
                                        <Save size={18} />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Notifications */}
                        {activeSection === 'notifications' && (
                            <div className="settings-section">
                                <div className="settings-section-header">
                                    <h2>Notification Preferences</h2>
                                    <p>Choose how and when you receive notifications</p>
                                </div>

                                <div className="settings-notifications-list">
                                    {notifications.map(notif => (
                                        <div key={notif.id} className="settings-notification-item">
                                            <div className="settings-notification-icon">
                                                <notif.icon size={20} />
                                            </div>
                                            <div className="settings-notification-text">
                                                <div className="settings-notification-title">{notif.title}</div>
                                                <div className="settings-notification-desc">{notif.description}</div>
                                            </div>
                                            <label className="settings-toggle">
                                                <input
                                                    type="checkbox"
                                                    checked={notif.enabled}
                                                    onChange={() => handleNotificationToggle(notif.id)}
                                                />
                                                <span className="settings-toggle-slider"></span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Privacy & Security */}
                        {activeSection === 'privacy' && (
                            <div className="settings-section">
                                <div className="settings-section-header">
                                    <h2>Privacy Settings</h2>
                                    <p>Control who can see your information</p>
                                </div>

                                <div className="settings-privacy-list">
                                    <div className="settings-privacy-item">
                                        <div className="settings-privacy-text">
                                            <div className="settings-privacy-title">Public Profile</div>
                                            <div className="settings-privacy-desc">Allow others to view your profile</div>
                                        </div>
                                        <label className="settings-toggle">
                                            <input
                                                type="checkbox"
                                                checked={privacySettings.profilePublic}
                                                onChange={() => handlePrivacyToggle('profilePublic')}
                                            />
                                            <span className="settings-toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="settings-privacy-item">
                                        <div className="settings-privacy-text">
                                            <div className="settings-privacy-title">Show Learning Progress</div>
                                            <div className="settings-privacy-desc">Display your learning progress publicly</div>
                                        </div>
                                        <label className="settings-toggle">
                                            <input
                                                type="checkbox"
                                                checked={privacySettings.showProgress}
                                                onChange={() => handlePrivacyToggle('showProgress')}
                                            />
                                            <span className="settings-toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="settings-privacy-item">
                                        <div className="settings-privacy-text">
                                            <div className="settings-privacy-title">Allow Direct Messages</div>
                                            <div className="settings-privacy-desc">Let others send you direct messages</div>
                                        </div>
                                        <label className="settings-toggle">
                                            <input
                                                type="checkbox"
                                                checked={privacySettings.allowMessaging}
                                                onChange={() => handlePrivacyToggle('allowMessaging')}
                                            />
                                            <span className="settings-toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="settings-privacy-item">
                                        <div className="settings-privacy-text">
                                            <div className="settings-privacy-title">Activity Visibility</div>
                                            <div className="settings-privacy-desc">Show your activity in the community</div>
                                        </div>
                                        <label className="settings-toggle">
                                            <input
                                                type="checkbox"
                                                checked={privacySettings.activityVisible}
                                                onChange={() => handlePrivacyToggle('activityVisible')}
                                            />
                                            <span className="settings-toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Appearance */}
                        {activeSection === 'appearance' && (
                            <div className="settings-section">
                                <div className="settings-section-header">
                                    <h2>Appearance Settings</h2>
                                    <p>Customize how the interface looks</p>
                                </div>

                                <div className="settings-appearance">
                                    <div className="settings-appearance-group">
                                        <label className="settings-label">Theme</label>
                                        <div className="settings-theme-options">
                                            {[
                                                { value: 'light', label: 'Light Mode' },
                                                { value: 'dark', label: 'Dark Mode' },
                                                { value: 'auto', label: 'Auto (System)' },
                                            ].map(option => (
                                                <label key={option.value} className="settings-radio">
                                                    <input
                                                        type="radio"
                                                        name="theme"
                                                        value={option.value}
                                                        checked={appearance.theme === option.value}
                                                        onChange={(e) => setAppearance({ ...appearance, theme: e.target.value })}
                                                    />
                                                    <span className="settings-radio-label">{option.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="settings-appearance-group">
                                        <label className="settings-label">Font Size: {appearance.fontSize}px</label>
                                        <input
                                            type="range"
                                            min="12"
                                            max="20"
                                            value={appearance.fontSize}
                                            onChange={(e) => setAppearance({ ...appearance, fontSize: parseInt(e.target.value) })}
                                            className="settings-slider"
                                        />
                                    </div>

                                    <div className="settings-appearance-group">
                                        <label className="settings-toggle-label">
                                            <input
                                                type="checkbox"
                                                checked={appearance.compactMode}
                                                onChange={(e) => setAppearance({ ...appearance, compactMode: e.target.checked })}
                                            />
                                            <div className="settings-toggle-content">
                                                <div className="settings-toggle-title">Compact Mode</div>
                                                <div className="settings-toggle-desc">Reduce spacing and padding</div>
                                            </div>
                                        </label>
                                    </div>

                                    <button className="settings-btn settings-btn-primary" onClick={handleSaveSettings}>
                                        <Save size={18} />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Security */}
                        {activeSection === 'security' && (
                            <div className="settings-section">
                                <div className="settings-section-header">
                                    <h2>Security Settings</h2>
                                    <p>Manage your account security</p>
                                </div>

                                <div className="settings-security">
                                    <div className="settings-security-item">
                                        <div className="settings-security-text">
                                            <div className="settings-security-title">Two-Factor Authentication</div>
                                            <div className="settings-security-desc">Add an extra layer of security to your account</div>
                                        </div>
                                        <label className="settings-toggle">
                                            <input
                                                type="checkbox"
                                                checked={twoFactor}
                                                onChange={(e) => setTwoFactor(e.target.checked)}
                                            />
                                            <span className="settings-toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="settings-security-timeout">
                                        <label className="settings-label">Session Timeout: {sessionTimeout} minutes</label>
                                        <input
                                            type="range"
                                            min="5"
                                            max="120"
                                            step="5"
                                            value={sessionTimeout}
                                            onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                                            className="settings-slider"
                                        />
                                        <div className="settings-timeout-marks">
                                            <span>5m</span>
                                            <span>30m</span>
                                            <span>1h</span>
                                            <span>2h</span>
                                        </div>
                                    </div>

                                    <div className="settings-danger-zone">
                                        <h3 className="settings-danger-title">⚠️ Danger Zone</h3>
                                        <p className="settings-danger-desc">Irreversible actions that may impact your account</p>

                                        <div className="settings-danger-actions">
                                            <button
                                                className="settings-btn settings-btn-warning"
                                                onClick={() => setLogoutConfirm(true)}
                                            >
                                                <LogOut size={18} />
                                                Logout from All Devices
                                            </button>

                                            <button
                                                className="settings-btn settings-btn-danger"
                                                onClick={() => setDeleteDialog(true)}
                                            >
                                                <Trash2 size={18} />
                                                Delete Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Logout Dialog */}
            {logoutConfirm && (
                <div className="settings-modal-overlay" onClick={() => setLogoutConfirm(false)}>
                    <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="settings-modal-header">
                            <h2>Logout from All Devices</h2>
                            <button
                                className="settings-modal-close"
                                onClick={() => setLogoutConfirm(false)}
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="settings-modal-content">
                            <p>This will logout your account from all devices. You'll need to login again to access your account.</p>
                        </div>
                        <div className="settings-modal-actions">
                            <button
                                className="settings-btn settings-btn-secondary"
                                onClick={() => setLogoutConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="settings-btn settings-btn-warning"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Account Dialog */}
            {deleteDialog && (
                <div className="settings-modal-overlay" onClick={() => setDeleteDialog(false)}>
                    <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="settings-modal-header settings-modal-header-danger">
                            <div className="settings-modal-title-danger">
                                <AlertTriangle size={24} />
                                <h2>Delete Account Permanently</h2>
                            </div>
                            <button
                                className="settings-modal-close"
                                onClick={() => setDeleteDialog(false)}
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="settings-modal-content">
                            <div className="settings-alert settings-alert-error">
                                <AlertCircle size={20} />
                                <p>This action cannot be undone. All your data will be permanently deleted.</p>
                            </div>
                            <p>Are you sure you want to delete your account? This will remove all your data including courses, achievements, and learning history.</p>
                        </div>
                        <div className="settings-modal-actions">
                            <button
                                className="settings-btn settings-btn-secondary"
                                onClick={() => setDeleteDialog(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="settings-btn settings-btn-danger"
                                onClick={handleDeleteAccount}
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsPage;