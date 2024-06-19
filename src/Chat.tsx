import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (input.trim()) {
            const userMessage = input;
            setMessages(prev => [...prev, `You: ${userMessage}`]);
            setInput('');

            try {
                const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                    model: "gpt-4o",
                    messages: [{ role: "user", content: userMessage }]
                }, {
                    headers: {
                        'Authorization': `Bearer sk-proj-OaKNOwT7pMBmb0WeqHcyT3BlbkFJmLIK0mHzPXZqvM1cy3fm`
                    }
                });

                const botMessage = response.data.choices[0].message.content;
                setMessages(prev => [...prev, `ChatGPT: ${botMessage}`]);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default Chat;
