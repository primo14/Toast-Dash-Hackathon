import React, { useState } from 'react';
import './Messages.css';
import Nav from '../components/Nav'; 
import '../components/Nav.css'

const Messages = () => {
  const [messages, setMessages] = useState([
    { sender: 'John Doe', text: 'Hey, how are you?', time: '2:30 PM' },
    { sender: 'You', text: 'I am good, thanks! How about you?', time: '2:32 PM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [chats] = useState([
    { name: 'John Doe', lastMessage: 'Hey, how are you?' },
    { name: 'Jane Smith', lastMessage: 'Can we schedule a meeting?' },
    { name: 'Alice Johnson', lastMessage: 'Thanks for the update!' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { sender: 'You', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-page">
      <Nav /> {/* Use the reusable VerticalNav component */}
      <div className="chat-sidebar">
        <h2 className="chat-sidebar-title">Chats</h2>
        <div className='chat-list-container'>

        <ul className="chat-list">
          {chats.map((chat, index) => (
            <li key={index} className="chat-list-item">
              <h3 className="chat-list-name">{chat.name}</h3>
              <p className="chat-list-preview">{chat.lastMessage}</p>
            </li>
          ))}
        </ul>
        </div>
        
      </div>
      <div className="chat-container">
        <h1 className="chat-title">Chat Room</h1>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.sender === 'You' ? 'chat-message-sent' : 'chat-message-received'}`}>
              <p className="chat-message-sender">{message.sender}</p>
              <p className="chat-message-text">{message.text}</p>
              <span className="chat-message-time">{message.time}</span>
            </div>
          ))}
        </div>
        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="chat-send-button">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Messages;