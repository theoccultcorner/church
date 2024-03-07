import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, List, ListItem, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Blockchain, Block } from './Blockchain'; // Import Block and Blockchain
import DeleteIcon from '@mui/icons-material/Delete'; // Import delete icon

const Ministries = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const blockchain = new Blockchain();

  useEffect(() => {
    const storedMessages = localStorage.getItem('messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newBlock = new Block(
        blockchain.chain.length,
        new Date().toISOString(),
        newMessage,
        blockchain.getLatestBlock().hash
      );
      blockchain.addBlock(newBlock);
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  const handleDeleteMessage = (index) => {
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1); // Remove the message at the specified index
    setMessages(updatedMessages);

    // Update the blockchain by removing the corresponding block
    const updatedChain = [...blockchain.chain];
    updatedChain.splice(index + 1, 1); // Adjust the index to account for the genesis block
    blockchain.chain = updatedChain;
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Message Board
      </Typography>
      <List>
        {messages.map((message, index) => (
          <ListItem key={index}>
            {message}
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteMessage(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
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

export default Ministries;
