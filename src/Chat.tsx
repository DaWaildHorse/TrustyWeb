import { useState, useEffect } from 'react';
import axios from 'axios';

interface ChatProps {
    currentUrl: string;  // Accept currentUrl as a prop
}

const Chat: React.FC<ChatProps> = ({ currentUrl }) => {
    const [messages, setMessages] = useState<string[]>([]);

    // Function to send a message to ChatGPT
    const sendMessageToGPT = async (message: string) => {
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-4o",
                messages: [{ role: "user", content: message }]
            }, {
                headers: {
                    'Authorization': 'Bearer ' // Ensure this is securely managed
                }
            });

            const botMessage = response.data.choices[0].message.content;
            setMessages(prev => [...prev, `Resumem :${botMessage}`]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, `Error: Unable to fetch response`]);
        }
    };

    // Automatically send the current URL when the component mounts
    useEffect(() => {
        sendMessageToGPT(` Give me a resume in Spanish of the following URL title,according to the URL, what would it talk about, just put the resume here is the URL ${currentUrl}`);
    }, [currentUrl]);

    return (
        <div>
            {messages.map((msg, index) => (
                <p key={index}>{msg}</p>
            ))}
        </div>
    );
};

export default Chat;
