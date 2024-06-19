import React, { useEffect, useState } from 'react';
import protegerIcon from './assets/proteger.png';
import './App.css';
import LogoIcon from './assets/Logo fondo.png';
import ReviewTextView from './ReviewTextView';
import Chat from './Chat'; // Assuming Chat.tsx is the correct path

const App: React.FC = () => {
  const [icon] = useState(protegerIcon);
  const [logoIcon] = useState(LogoIcon);
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
            <div className='header'>
              <div className="logo-icon">
                <img src={logoIcon} alt="logo-icon" />
              </div>
              <div className='circle'></div>
              <div className='circle2'></div>
              <div className='circle3'></div>
              <h1>TrustyWeb</h1>
            </div>
            <p>{currentUrl}</p> {/* Display the current URL here */}
            <div className="card">
              <div className="shield">
                <div className="shield-icon">
                  <img src={icon} alt="Icon" />
                </div>
                <h2>Fuente Confiable</h2>
                <div className="info-box">
                  <p>Autor: </p> {/*Hacer las modificaciones correspondientes para que se muestren los valores encontrados por chat */}
                  <p>Fecha de publicación: </p>
                  <p>Fuentes: </p>
                </div>
              </div>
              <button className="review-button" onClick={() => setCurrentView('review')}>
                Revisa el texto
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
