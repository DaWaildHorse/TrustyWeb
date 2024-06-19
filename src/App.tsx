import React, { useEffect, useState } from 'react';
import protegerIcon from './assets/proteger.png';
import './App.css';
import ReviewTextView from './ReviewTextView';
import Chat from './Chat'; // Assuming Chat.tsx is the correct path

const App: React.FC = () => {
  const [icon] = useState(protegerIcon);
  const [currentView, setCurrentView] = useState('home');
  const [currentUrl, setCurrentUrl] = useState<string>('');

  useEffect(() => {
    // Check if the chrome.tabs API is available
    if (chrome.tabs && chrome.tabs.query) {
      // Fetch the current active tab's URL
      const queryOptions = { active: true, lastFocusedWindow: true };
      chrome.tabs.query(queryOptions, (tabs) => {
        const [activeTab] = tabs;
        if (activeTab.url) {
          setCurrentUrl(activeTab.url);
        }
      });
    }
  }, []);

  const renderView = () => {
    switch(currentView) {
      case 'home':
        return (
          <>
            <h1>TrustyWeb</h1>
            <p>Current URL: {currentUrl}</p> {/* Display the current URL here */}
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
