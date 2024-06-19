import React, { useState } from 'react';
import './ReviewTextView.css'; 
import axios from 'axios';

interface ReviewTextViewProps {
  navigateToHome: () => void;
  initialText?: string; // Propiedad opcional para recibir el texto inicial
}

const ReviewTextView: React.FC<ReviewTextViewProps> = ({ navigateToHome, initialText = '' }) => {

  const [textBoxContent, setTextBoxContent] = useState(initialText);
  const [gptResponse, setGptResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextBoxContent(e.target.value);
  };

  const handleGptRequest = async () => {
    if (textBoxContent.trim()) {
      setLoading(true);
      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: "gpt-4",
          messages: [{ role: "user", content: textBoxContent }]
        }, {
          headers: {
            'Authorization': 'Bearer sk-proj-ROLYIWfz7E3uWYf84jT3T3BlbkFJ0LXbVDxN6zVYazVDy2Jx'
          }
        });

        const botMessage = response.data.choices[0].message.content;
        setGptResponse(botMessage);
      } catch (error) {
        console.error('Error fetching GPT response:', error);
        setGptResponse('Error fetching response. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="review-container">
      <div className="header">
        <h3>Copia tu texto debajo, nosotros consultaremos otras fuentes.</h3>
      </div>
      <textarea
        className="text-box"
        value={textBoxContent}
        onChange={handleTextChange}
        rows={5} // Reducido de 10 a 5
      />
        <button onClick={handleGptRequest} disabled={loading}>
          {loading ? 'Buscando...' : 'Iniciar búsqueda'}
        </button>
      {gptResponse && (
        <div className="gpt-response">
          <p>{gptResponse}</p>
        </div>
      )}
      <p> Estas fuentes confirman tu texto... </p>
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
