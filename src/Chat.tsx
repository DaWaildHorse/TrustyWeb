import { useState, useEffect } from 'react';
import axios from 'axios';

interface ChatProps {
    currentUrl: string;
}

const Chat: React.FC<ChatProps> = ({ currentUrl }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessageToGPT = async (message: string) => {
        setIsLoading(true);
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-4o",
                messages: [{ role: "user", content: message }]
            }, {
                headers: {
                    'Authorization': `Bearer sk-proj-u0r3GMFeP0iyFMIWc3nPT3BlbkFJnheBkcfK1picMnhUQgul`
                }
            });

            const botMessage = response.data.choices[0].message.content;
            setMessages([`Resumen: ${botMessage}`]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, 'Error: Unable to fetch response from ChatGPT']);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (currentUrl) {
            sendMessageToGPT(`Dame un resumen en base al titulo de la URL${currentUrl}`);
        }
    }, [currentUrl]);

    return (
        <div>
            {isLoading && <p>Cargando...</p>}
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
        </div>
    );
};

export default Chat;
