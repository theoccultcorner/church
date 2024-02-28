import React, { useState } from 'react';
import { TextField, Button, Container, Typography, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '600px',
    margin: 'auto',
    marginTop: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    background: '#fff',
  },
  listItem: {
    background: '#f5f5f5',
    borderRadius: '5px',
    marginBottom: '10px',
    padding: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  inputField: {
    marginTop: '20px',
  },
}));

const Contact = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: new Date().getTime(), // Generate a unique ID for each message
        text: inputMessage
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>Messenger</Typography>
      <List>
        {messages.map((message) => (
          <ListItem key={message.id} className={classes.listItem}>
            <ListItemText>{message.text}</ListItemText>
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.inputField}
          fullWidth
          variant="outlined"
          label="Type a message..."
          value={inputMessage}
          onChange={handleChange}
          multiline
          rows={2}
        />
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </form>
    </Container>
  );
};

export default Contact;
