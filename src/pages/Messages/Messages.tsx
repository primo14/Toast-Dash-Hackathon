import React, { useState } from 'react';
import './Messages.css';
import Nav from '../../components/Nav';
import PageContent from '../Page-Content.module.css'
import '../../assets/other_profile.svg' // Import your profile image

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

  const [activeChat, setActiveChat] = useState(chats[0].name);
  const [companyName, setCompanyName] = useState('Waste Out'); 

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
      <div className={PageContent['page-content']} >
        <div className={PageContent['page-header']}>
          <h1 className={PageContent['page-title']}>Messages</h1>
          <hr className={PageContent['title-divider']} />
        </div>
        
        <div className ="chatbox">
            <div className="chat-sidebar">
              <h2 className="chat-sidebar-title">Chats</h2>
              <div className='chat-list-container'>
              
                <ul className="chat-list">
                  {chats.map((chat, index) => (
                  <li key={index} className="chat-list-item">
                    <img src="src/assets/other_profile.svg" alt="Profile" className="chat-list-avatar" />
                    <div className="chat-list-text">
                      <h3 className="chat-list-name">{chat.name}</h3>
                      <p className="chat-list-preview">{chat.lastMessage}</p>
                    </div>
                    
                  </li>
                  ))}
                </ul>
              </div>
        
            </div>
            <div className="chat-container">
              <div className="chat-header">
                <img src="src/assets/other_profile.svg" alt="Profile" style={{width:'5rem'}} />

                <div style={{ display: 'flex',  flexDirection: 'column', paddingLeft: '1vw',  }}>
                  <p className="chat-header-company" >{companyName}</p>
                  <hr style={{ width: '100%', height: '0.75px', backgroundColor: 'var(--DarkGreen)', margin: '0' }} />
                  <p >{activeChat}</p>
                </div>
              </div>
              <div className="chat-messages">
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                {messages.map((message, index) =>
                  message.sender === 'You' ? (
                    <li className='sent-container'>
                        <div key={index} className="chat-message chat-message-sent">
                          <p className="chat-message-text">{message.text}</p>
                          <span className="chat-message-time">{message.time}</span>
                        </div>
                          <img src="src/assets/my_profile.svg" alt="Profile" className="chat-message-avatar" />

                      </li>
                   
                  ) : (
                     <li className='received-container'>
                        <img src="src/assets/other_profile.svg" alt="Profile" className="chat-message-avatar" />

                        <div key={index} className="chat-message chat-message-received">
                          <p className="chat-message-text">{message.text}</p>
                          <span className="chat-message-time">{message.time}</span>
                        </div>

                      </li>
                  )
                )}
              </ul>
              </div>
              
              <form className="chat-input-form" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  className="chat-input"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="chat-send-button">
                  <img src="src/assets/send_icon.svg" alt="Send" className="send-icon" />
                </button>
              </form>
            </div>
          </div>
       
        </div>
      
    </div>
  );
};

export default Messages;