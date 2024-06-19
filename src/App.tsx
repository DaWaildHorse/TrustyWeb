import React, { useEffect, useState } from 'react';
import protegerIcon from './assets/proteger.png';
import cancelarIcon from './assets/cancelar.png'; // Import cancelar.png
import './App.css';
import LogoIcon from './assets/Logo fondo.png';
import ReviewTextView from './ReviewTextView';
import Chat from './Chat.tsx'; // Assuming Chat.tsx is the correct path

const App: React.FC = () => {
  const [icon, setIcon] = useState(protegerIcon); // Estado para la imagen del escudo
  const [logoIcon] = useState(LogoIcon);
  const [currentView, setCurrentView] = useState('home');
  const [isSourceViable, setIsSourceViable] = useState<boolean | null>(null);
  const [author, setAuthor] = useState<string>('');
  const [sources, setSources] = useState<string>('');

  const trustedUrlPrefixes = [
    'https://www.elfinanciero.com.mx',
    'https://mexico.as.com',
    'https://scielo.org',
    'https://cnnespanol.cnn.com/',
    // Add more trusted URL prefixes here
  ] as const;

  const urlMetadata: { [key in typeof trustedUrlPrefixes[number]]: { author: string; sources: string; } } = {
    'https://www.elfinanciero.com.mx': {
      author: 'Grupo Multimedia Lauman',
      sources: 'El Financiero'
    },
    'https://mexico.as.com': {
      author: 'AS México Staff',
      sources: 'AS México'
    },
    'https://scielo.org': {
      author: 'SciELO',
      sources: 'Scientific Electronic Library Online'
    },
    'https://cnnespanol.cnn.com/': {
      author: 'Cable News Network. ',
      sources: 'CNN en Español'
    }
  };

  useEffect(() => {
    // Check if the chrome.tabs API is available
    if (chrome.tabs && chrome.tabs.query) {
      // Fetch the current active tab's URL
      const queryOptions = { active: true, lastFocusedWindow: true };
      chrome.tabs.query(queryOptions, (tabs) => {
        const [activeTab] = tabs;
        if (activeTab.url) {
          verifySource(activeTab.url); // Verify the source using the full URL
        } else {
          setIsSourceViable(false); // If no URL is detected, mark as untrustworthy
          setIcon(cancelarIcon); // Change the shield icon to cancel.png
        }
      });
    }
  }, []);

  const verifySource = (url: string) => {
    const trustedPrefix = trustedUrlPrefixes.find(prefix => url.startsWith(prefix));
    if (trustedPrefix) {
      setIsSourceViable(true);
      setIcon(protegerIcon);
      const metadata = urlMetadata[trustedPrefix];
      setAuthor(metadata.author);
      setSources(metadata.sources);
    } else if (trustedUrlPrefixes.some(prefix => url.startsWith(prefix))) {
      setIsSourceViable(false);
      setIcon(cancelarIcon);
      setAuthor('');
      setSources('');
    } else {
      setIsSourceViable(null);
      setIcon(cancelarIcon);
      setAuthor('');
      setSources('');
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <div className='header'>
              <div className="logo-icon">
                <img src={logoIcon} alt="Logo icon" />
              </div>
              <div className='circle'></div>
              <div className='circle2'></div>
              <div className='circle3'></div>
              <h1>TrustyWeb</h1>
            </div>
            <div className="card">
              <div className="shield">
                <div className="shield-icon">
                  <img src={icon} alt="Icon" />
                </div>
                <h2>Fuente {isSourceViable === null ? 'Desconocido' : isSourceViable ? 'Confiable' : 'no válida'}</h2>
                <div className="info-box">
                  <p>Autor: {author}</p>
                  <p>Fuente: {sources}</p>
                </div>
              </div>
              <button className="review-button" onClick={() => setCurrentView('review')}>
                Revisar el texto
              </button>
              <button className="review-button" onClick={() => setCurrentView('chat')}>
                Consultar un resumen
              </button>
            </div>
          </>
        );
      case 'review':
        return <ReviewTextView navigateToHome={() => setCurrentView('home')} />;
      case 'chat':
        return <Chat currentUrl={currentView} />;
      default:
        return <div>View not found</div>;
    }
  };

  return <div className="App">{renderView()}</div>;
};

export default App;
