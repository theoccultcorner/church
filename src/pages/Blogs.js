import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField, Typography, Box, Avatar, makeStyles } from '@material-ui/core';
import { auth, db } from './firebaseConfig'; // Import auth object from firebaseConfig
import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    overflowY: 'auto',
    maxHeight: '400px',
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  messageContainer: {
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '70%',
    borderRadius: '10px',
    padding: '8px',
    backgroundColor: theme.palette.background.default,
    border: '1px solid #ccc',
    textAlign: 'right',
    marginLeft: 'auto',
  },
  inputField: {
    width: 'calc(100% - 84px)', // Adjusting width to accommodate the button
    marginRight: '10px',
  },
}));

const Blogs = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null); // State to store the authenticated user
  const chatContainerRef = useRef(null); // Reference to the chat container

  useEffect(() => {
    // Set up an authentication listener to get the current user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Set the user state
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  useEffect(() => {
    if (user) {
      fetchMessages(); // Fetch messages only if user is authenticated
    }
  }, [user]); // Re-fetch messages when the user changes

  useEffect(() => {
    // Scroll chat container to the bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
      const querySnapshot = await getDocs(q);
      const messageList = [];
      querySnapshot.forEach((doc) => {
        const messageData = doc.data();
        const messageWithAvatar = {
          id: doc.id,
          message: messageData.message,
          sender: messageData.sender,
          avatar: messageData.avatar
        };
        messageList.push(messageWithAvatar);
      });
      setMessages(messageList);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      // Include user's avatar URL when sending message
      const newMessageRef = await addDoc(collection(db, 'messages'), { message, avatar: user.photoURL, timestamp: new Date(), sender: user.uid });
      console.log('Message sent with ID: ', newMessageRef.id);
      setMessage('');
      fetchMessages(); // Re-fetch messages after sending a new message
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent newline if Shift+Enter is pressed
      sendMessage();
    }
  };

  const deleteMessage = async (id) => {
    try {
      await deleteDoc(doc(db, 'messages', id));
      console.log('Message deleted successfully');
      fetchMessages(); // Re-fetch messages after deleting a message
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Chat Room</Typography>
      <div ref={chatContainerRef} className={classes.chatContainer}>
        {messages.map((message, index) => (
          <div key={message.id} className={classes.messageContainer}>
            <Avatar alt="User Avatar" src={message.avatar} />
            <div className={classes.messageBubble}>
              <Typography>{message.message}</Typography>
            </div>
            <Button variant="contained" color="secondary" onClick={() => deleteMessage(message.id)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
      <div>
        <TextField
          className={classes.inputField}
          label="Message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          margin="normal"
          onKeyPress={handleKeyPress} // Handle Enter key press
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </Box>
  );
};

export default Blogs;