import React, { useEffect, useState } from 'react';
import protegerIcon from './assets/proteger.png';
import cancelarIcon from './assets/cancelar.png'; // Importar la imagen cancelar.png
import './App.css';
import LogoIcon from './assets/Logo fondo.png';
import ReviewTextView from './ReviewTextView';
import Chat from './Chat'; // Assuming Chat.tsx is the correct path

const App: React.FC = () => {
  const [icon, setIcon] = useState(protegerIcon); // Estado para la imagen del escudo
  const [logoIcon] = useState(LogoIcon);
  const [currentView, setCurrentView] = useState('home');
  const [isSourceViable, setIsSourceViable] = useState<boolean | null>(null);

  const trustedUrls = [
    'https://mexico.as.com/actualidad/tormenta-tropical-alberto-en-vivo-hoy-trayectoria-estados-afectados-en-mexico-ultimas-noticias-n/',
    'https://www.elfinanciero.com.mx/cdmx/2024/06/18/cortes-de-agua-en-cdmx-y-edomex-del-19-al-20-de-junio-por-fuga-en-el-sistema-cutzamala/',
    // Agrega más URLs confiables aquí
  ];

  const untrustedUrls = [
    'https://example.com/untrusted1',
    'https://example.com/untrusted2',
    // Agrega más URLs no confiables aquí
  ];

  useEffect(() => {
    // Check if the chrome.tabs API is available
    if (chrome.tabs && chrome.tabs.query) {
      // Fetch the current active tab's URL
      const queryOptions = { active: true, lastFocusedWindow: true };
      chrome.tabs.query(queryOptions, (tabs) => {
        const [activeTab] = tabs;
        if (activeTab.url) {
          verifySource(activeTab.url); // Realizar la verificación de la fuente
        } else {
          setIsSourceViable(false); // Si no se detecta la URL, se marca como no confiable
          setIcon(cancelarIcon); // Cambia la imagen del escudo a cancelar.png
        }
      });
    }
  }, []);

  const verifySource = (url: string) => {
    if (trustedUrls.includes(url)) {
      setIsSourceViable(true);
      setIcon(protegerIcon); // Cambia la imagen del escudo a proteger.png
    } else if (untrustedUrls.includes(url)) {
      setIsSourceViable(false);
      setIcon(cancelarIcon); // Cambia la imagen del escudo a cancelar.png
    } else {
      setIsSourceViable(null); // URL desconocida o no categorizada
      setIcon(cancelarIcon); // Cambia la imagen del escudo a cancelar.png por defecto para URLs desconocidas
    }
  };

  const renderView = () => {
    switch (currentView) {
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
            <div className="card">
              <div className="shield">
                <div className="shield-icon">
                  <img src={icon} alt="Icon" />
                </div>
                <h2>Fuente {isSourceViable === null ? 'Desconocida' : isSourceViable ? 'Confiable' : 'No Confiable'}</h2>
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
