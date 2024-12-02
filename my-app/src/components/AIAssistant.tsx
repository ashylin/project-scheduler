// src/components/AIAssistant.tsx
import React, { useState } from 'react';

const AIAssistant: React.FC = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<string[]>([]);

  const sendMessage = async () => {
    // Implementation of GPT-4 Mini API call
    // Add response handling
    setConversation([...conversation, message]);
    setMessage('');
  };

  return (
    <div className="ai-assistant">
      <h2>AI Assistant</h2>
      <div className="chat-container">
        {conversation.map((msg, index) => (
          <div key={index} className="message">{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about your tasks..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default AIAssistant;