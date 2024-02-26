import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function SideMenu({ isOpen, onClose }) {
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      className={`side-menu ${isOpen ? 'open' : ''}`}
    >
      <div className="menu-header">
        <IconButton className="close-btn" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <List>
        <ListItem button>
          <ListItemText primary="About Us" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Services" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Ministries" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Events" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Resources" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Contact Us" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default SideMenu;
