import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
 
const DrawerComponent = ({ open, handleDrawerClose }) => {
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open} 
      onClose={handleDrawerClose}
    >
      <List>
       
        <ListItem button component={Link} to="/" onClick={handleDrawerClose}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/about" onClick={handleDrawerClose}>
          <ListItemText primary="About" />
        </ListItem>
       
        <ListItem button component={Link} to="/messenger" onClick={handleDrawerClose}>
          <ListItemText primary="Messenger" />
        </ListItem>
        <ListItem button component={Link} to="/contact" onClick={handleDrawerClose}>
          <ListItemText primary="Contact" />
        </ListItem>
        
 
      </List>
    </Drawer>
  );
};

export default DrawerComponent;
