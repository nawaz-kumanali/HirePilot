import { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, Info, Search, MoreVertical, Paperclip, Smile, CheckCheck, MessageSquare } from 'lucide-react';
import './messages.scss';
import { conversationsData, messagesData } from '../../data/messagesData';
import type { Conversation, Message } from '../../data/messagesData';

const Messages = () => {
    const [selectedChat, setSelectedChat] = useState<string>(conversationsData[0].id);
    const [newMessage, setNewMessage] = useState('');
    const [conversations, setConversations] = useState<Conversation[]>(conversationsData);
    const [messages, setMessages] = useState<Record<string, Message[]>>(messagesData);

    const chatEndRef = useRef<HTMLDivElement>(null);

    const activeConversation = conversations.find(c => c.id === selectedChat);
    const activeMessages = messages[selectedChat] || [];

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeMessages]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const newMsg: Message = {
            id: `m-${Date.now()}`,
            senderId: 'me',
            text: newMessage,
            timestamp: 'Just now',
            isMe: true
        };

        setMessages(prev => ({
            ...prev,
            [selectedChat]: [...(prev[selectedChat] || []), newMsg]
        }));

        setConversations(prev => prev.map(c =>
            c.id === selectedChat
                ? { ...c, lastMessage: newMessage, lastMessageTime: 'Just now' }
                : c
        ));

        setNewMessage('');
    };

    return (
        <div className="messages-wrapper">
            <div className="messages-container card-glass">
                {/* Sidebar */}
                <aside className="messages-sidebar">
                    <div className="sidebar-header">
                        <h2>Messages</h2>
                        <div className="search-bar">
                            <Search size={18} />
                            <input type="text" placeholder="Search chats..." />
                        </div>
                    </div>

                    <div className="conversations-list">
                        {conversations.map((conv) => (
                            <div
                                key={conv.id}
                                className={`conversation-item ${selectedChat === conv.id ? 'active' : ''}`}
                                onClick={() => setSelectedChat(conv.id)}
                            >
                                <div className="avatar-wrapper">
                                    <div className="avatar">
                                        {conv.participants[0].name.charAt(0)}
                                    </div>
                                    {conv.participants[0].isOnline && <div className="online-indicator"></div>}
                                </div>
                                <div className="conv-info">
                                    <div className="conv-top">
                                        <span className="conv-name">{conv.participants[0].name}</span>
                                        <span className="conv-time">{conv.lastMessageTime}</span>
                                    </div>
                                    <div className="conv-bottom">
                                        <p className="last-msg">{conv.lastMessage}</p>
                                        {conv.unreadCount > 0 && (
                                            <span className="unread-badge">{conv.unreadCount}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Chat Area */}
                <main className="chat-area">
                    {activeConversation ? (
                        <>
                            <header className="chat-header">
                                <div className="user-profile">
                                    <div className="avatar">
                                        {activeConversation.participants[0].name.charAt(0)}
                                    </div>
                                    <div className="user-info">
                                        <h3>{activeConversation.participants[0].name}</h3>
                                        <span className="status">
                                            {activeConversation.participants[0].isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                </div>
                                <div className="chat-actions">
                                    <button className="action-btn"><Phone size={20} /></button>
                                    <button className="action-btn"><Video size={20} /></button>
                                    <button className="action-btn"><Info size={20} /></button>
                                    <button className="action-btn"><MoreVertical size={20} /></button>
                                </div>
                            </header>

                            <div className="chat-messages">
                                {activeMessages.map((msg) => (
                                    <div key={msg.id} className={`message-row ${msg.isMe ? 'me' : 'them'}`}>
                                        {!msg.isMe && (
                                            <div className="msg-avatar">
                                                {activeConversation.participants[0].name.charAt(0)}
                                            </div>
                                        )}
                                        <div className="message-bubble">
                                            <p>{msg.text}</p>
                                            <div className="message-meta">
                                                <span className="time">{msg.timestamp}</span>
                                                {msg.isMe && <CheckCheck size={14} className="status-icon" />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>

                            <footer className="chat-input-area">
                                <div className="input-actions">
                                    <button className="icon-btn"><Paperclip size={20} /></button>
                                </div>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    />
                                    <button className="smile-btn"><Smile size={20} /></button>
                                </div>
                                <button
                                    className="send-btn"
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim()}
                                >
                                    <Send size={20} />
                                </button>
                            </footer>
                        </>
                    ) : (
                        <div className="no-chat-selected">
                            <MessageSquare size={64} className="empty-icon" />
                            <h3>Your Messages</h3>
                            <p>Select a conversation to start chatting</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Messages;
