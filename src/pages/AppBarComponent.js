import React from 'react';
import { AppBar, Toolbar, IconButton, Typography  } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
  // Import Link from React Router

const AppBarComponent = ({ handleDrawerOpen }) => {
  return (
    <AppBar position="fixed" style={{ backgroundColor: 'black' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          TheGnosticChristian.Org
        </Typography>
       
 
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
