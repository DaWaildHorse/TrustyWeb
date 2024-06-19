import React from 'react';
import './ReviewTextView.css'; // Asegúrate de agregar este archivo CSS

interface ReviewTextViewProps {
  navigateToHome: () => void;
}

const ReviewTextView: React.FC<ReviewTextViewProps> = ({ navigateToHome }) => {
  return (
    <div className="review-container">
      <div className="header">
        <h1>LOGO</h1>
      </div>
      <div className="text-box">
        <p> {/*Cambiar posteriormente los valores para que cambie por el texto que se haya seleccionado*/}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc purus tellus, egestas quis dolor sit amet, volutpat finibus dolor. Suspendisse laoreet suscipit felis at luctus. Maecenas ac velit vitae urna sagittis varius. Pellentesque in nunc ac ipsum condimentum semper a et est. Mauris tempus rhoncus leo, euismod varius lacus eleifend vitae.
        </p>
      </div>
      <div className="verification-info">
        <div className="shield-icon">
        </div>
        <div className="info">
          <h2>Texto Verificado</h2>
          <p><strong>15</strong> Fuentes</p>
          <p><strong>80%</strong> Coincidencia</p>
          <p><strong>15%</strong> Sin información</p>
        </div>
      </div>
      <p>Visita los recursos similares</p>
      <div className="resources">
        <button onClick={() => window.open('https://wikipedia.org', '_blank')}>Wikipedia</button>
        <button onClick={() => window.open('https://scholar.google.com', '_blank')}>Google académico</button>
        <button onClick={() => window.open('https://chemedia.org', '_blank')}>Chemedia</button>
      </div>
      <button onClick={navigateToHome}>Volver a la página principal</button>
    </div>
  );
};

export default ReviewTextView;
