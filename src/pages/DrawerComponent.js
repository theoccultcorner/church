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
        <ListItem button component={Link} to="/ministries" onClick={handleDrawerClose}>
          <ListItemText primary="Ministries" />
        </ListItem>
        <ListItem button component={Link} to="/sermons" onClick={handleDrawerClose}>
          <ListItemText primary="Sermons" />
        </ListItem>
        <ListItem button component={Link} to="/blogs" onClick={handleDrawerClose}>
          <ListItemText primary="Blogs" />
        </ListItem>
        <ListItem button component={Link} to="/contact" onClick={handleDrawerClose}>
          <ListItemText primary="Contact" />
        </ListItem>
        {/* Profile Link */}
        <ListItem button component={Link} to="/profile" onClick={handleDrawerClose}>
          <ListItemText primary="Profile" />
        </ListItem>
        {/* Login Link */}
        <ListItem button component={Link} to="/login" onClick={handleDrawerClose}>
          <ListItemText primary="Login" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default DrawerComponent;