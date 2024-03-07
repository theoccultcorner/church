import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, List, ListItem } from '@mui/material';
import { Block } from './Blockchain'; // Import the Block class from the Blockchain module

const MessageBoard = ({ blockchain }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const storedMessages = localStorage.getItem('messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const addMessage = (message) => {
    const newBlock = new Block( // Use the Block class directly
      blockchain.chain.length,
      new Date().toISOString(),
      message,
      blockchain.getLatestBlock().hash
    );
    blockchain.addBlock(newBlock);
    setMessages([...messages, message]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      addMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Message Board
      </Typography>
      <List>
        {messages.map((message, index) => (
          <ListItem key={index}>{message}</ListItem>
        ))}
      </List>
      <TextField
        label="Type your message"
        variant="outlined"
        fullWidth
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        Send
      </Button>
    </Container>
  );
};

export default MessageBoard;
