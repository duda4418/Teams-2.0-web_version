import React, { useEffect, useState } from 'react';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { DISCUSSION_id, USER_id } from '../constants/constants';

const discussionId = DISCUSSION_id;
const userId = USER_id;

async function fetchMessages(ID) {
  const API = `http://localhost:8000/api/messages?user_id=${userId}&discussion_id=${ID}`;
  const response = await window.fetch(API);
  const data = await response.json();
  return data;
}

export function ChatMessages({ selectedDiscussion }) {
  const [messages, setMessages] = useState([]);

  // WebSocket connection
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Open a WebSocket connection when the component mounts
    const socket = new WebSocket(`ws://localhost:8000/ws/${userId}`);
    
    // Set up event listeners for the WebSocket connection
    socket.addEventListener('open', () => {
      console.log('WebSocket connection opened');
    });

    socket.addEventListener('message', (event) => {
      // Handle incoming messages from the server
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed');
    });

    // Save the WebSocket instance to state
    setWs(socket);

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    // Load initial messages
    loadMessages();
  }, [selectedDiscussion]);

  async function loadMessages() {
    const data = await fetchMessages(selectedDiscussion);
    setMessages(data);
  }

  // Function to send a message using the WebSocket connection
  const sendMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  };

  return (
    <div className="mx-auto w-full">
      <div className="mb-4 flex h-[83vh] flex-col overflow-auto border-2 p-10">
        {messages.map((message) => (
          <div
            className={`mb-10 w-13 ${message.user_id === userId ? 'self-end' : 'self-start '}`}
            key={message.id}>
            <ChatMessage
              value={message.value}
              userName={message.name}
              isMe={message.user_id === userId}
            />
          </div>
        ))}
      </div>
      <ChatInput
        selectedDiscussion={selectedDiscussion}
        onSendMessage={sendMessage}
      />
    </div>
  );
}
