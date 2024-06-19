import React, { useState } from 'react';
import './ReviewTextView.css';
import axios from 'axios';

interface ReviewTextViewProps {
  navigateToHome: () => void;
  initialText?: string;
}

const ReviewTextView: React.FC<ReviewTextViewProps> = ({ navigateToHome, initialText = '' }) => {
  const [textBoxContent, setTextBoxContent] = useState(initialText);
  const [gptResponse, setGptResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextBoxContent(e.target.value);
  };

  const sendMessageToGPT = async () => {
    if (!textBoxContent.trim()) {
      setGptResponse('Inserta texto primero');
      return;
    }

    const predefinedText = "porfavor proporciona solamente 3 ligas a fuentes reales en la web que hablen de este texto y 3 ligas que digan informacion diferente a este texto . quiero que sigas el siguiente formato, titulo en el idioma original, dominio de donde viene y la liga de la noticia en especifico, no la de la pagina de inicio (Porfavor, no hagas un hipervinculo, pon el URL completo) : ";
    const fullText = predefinedText + textBoxContent; // Combine the predefined text with user input

    setLoading(true);
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-4",  // Make sure this is the correct model name
        messages: [{ role: "user", content: fullText }] // Send the combined content of the text box
      }, {
        headers: {
          'Authorization': 'Bearer sk-proj-u0r3GMFeP0iyFMIWc3nPT3BlbkFJnheBkcfK1picMnhUQgul' // Replace YOUR_API_KEY with your actual OpenAI API key
        }
      });

      const botMessage = response.data.choices[0].message.content;
      setGptResponse(botMessage);
    } catch (error) {
      console.error('Error al enviar el mensaje:');
      setGptResponse('Error: no fue posible conectarse con ChatGPT');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-container">
      <div className="header">
        <h3>Copia tu texto debajo, nosotros encontraremos otras fuentes.</h3>
      </div>
      <textarea
        className="text-box"
        value={textBoxContent}
        onChange={handleTextChange}
        rows={5}
      />
      <button onClick={sendMessageToGPT} disabled={loading}>
        {loading ? 'Buscando...' : 'Iniciar búsqueda'}
      </button>
      {gptResponse && (
        <div className="gpt-response">
          <p>{gptResponse}</p>
        </div>
      )}
      <p>Estas fuentes sostienen tu información...</p>
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
