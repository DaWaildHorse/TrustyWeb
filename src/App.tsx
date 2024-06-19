import React, { useState } from 'react';
import protegerIcon from './assets/proteger.png';
import './App.css';
import ReviewTextView from './ReviewTextView';

//Hola

const App: React.FC = () => {
  const [icon] = useState(protegerIcon);
  const [currentView, setCurrentView] = useState('home');


  const renderView = () => {
    if (currentView === 'home') {
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
          </div>
        </>
      );
    } else if (currentView === 'review') {
      return <ReviewTextView navigateToHome={() => setCurrentView('home')} />;
    }
  };

  return <div className="App">{renderView()}</div>;
};

export default App;
