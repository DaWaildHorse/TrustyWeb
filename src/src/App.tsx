import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API requests
import protegerIcon from './assets/proteger.png';
import './App.css';
import ReviewTextView from './ReviewTextView';
import Chat from './Chat.tsx'; // Import the Chat component

const App: React.FC = () => {
  const [icon] = useState(protegerIcon);
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch(currentView) {
      case 'home':
        return (
          <>
            <h1>TrustyWeb</h1>
            <div className="card">
              <div className="shield">
                <div className="shield-icon">
                  <img src={icon} alt="Icon" />
                </div>
                <h2>Fuente Confiable</h2>
              </div>
              <button className="review-button" onClick={() => setCurrentView('review')}>
                Revisa el texto
              </button>
              <button className="chat-button" onClick={() => setCurrentView('chat')}>
                Chat with AI
              </button>
            </div>
          </>
        );
      case 'review':
        return <ReviewTextView navigateToHome={() => setCurrentView('home')} />;
      case 'chat':
        return <Chat />;
      default:
        return <div>View not found</div>;
    }
  };

  return <div className="App">{renderView()}</div>;
};

export default App;
