
import { useState } from 'react';
import { Button } from '@mantine/core';
import { USER_id } from '../constants/constants';

const API = 'http://localhost:8000/api/messages';

async function postMessage(message, selectedDiscussion) {
  const body = {
    discussion_id: selectedDiscussion,
    user_id: USER_id,
    value: message,
  };

  const response = await window.fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();

  return data;
}

export function ChatInput({ selectedDiscussion, onSendMessage }) {
  const [value, setValue] = useState('');

  const handleSendMessage = async () => {
    const messageData = await postMessage(value, selectedDiscussion);
    
    // Send the message data through the WebSocket connection
    onSendMessage(messageData);
    
    // Clear the input field after sending the message
    setTimeout(() => setValue(''), 10)
  };
  const handleEnterMessage = (event) => {

    if (event.key === 'Enter')
      handleSendMessage();
  };

  return (
    <div className="flex items-center gap-5">
      <textarea
        className="h-15 w-full border-2"
        placeholder="  Type message.."
        value={value}
        onKeyDown={handleEnterMessage}
        onChange={(event) => setValue(event.target.value)}
      />
      <Button
        variant="outline"
        color="blue"
        className="block h-full w-40 p-4"
        onClick={handleSendMessage}>
        Send message
      </Button>
    </div>
  );
}