import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Grid } from '@material-ui/core';
import backgroundImage from './background.jpg'; // Import your background image
import image1 from './background.jpg'; // Import your gallery images
import image2 from './background.jpg';
import image3 from './background.jpg';
// Import additional images as needed

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    paddingTop: theme.spacing(4),
    position: 'relative',
    overflow: 'hidden',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay color for better readability
  },
  content: {
    position: 'relative',
    zIndex: 1,
    color: '#fff', // Text color on top of the overlay
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(2),
  },
  galleryItem: {
    padding: theme.spacing(2),
  },
  galleryImage: {
    width: '100%',
    height: 'auto',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.overlay}></div> {/* Overlay for better readability */}
      <div className={classes.content}>
        <Typography variant="h3" className={classes.title}>
          Welcome to The Gnostic Christian
        </Typography>
        <Typography variant="h5" gutterBottom className={classes.title}>
          Explore the mystical teachings of Gnostic Christianity
        </Typography>
        <Typography variant="body1" paragraph className={classes.title}>
          Gnostic Christianity offers a unique perspective on spirituality, focusing on the pursuit of gnosis or spiritual knowledge.
          Through meditation, contemplation, and study of ancient texts, followers of Gnostic Christianity seek to awaken to higher truths
          and understand the mysteries of the divine.
        </Typography>
        <Button variant="contained" color="primary" className={classes.button}>
          Get Started
        </Button>
        <Button variant="outlined" color="primary" className={classes.button}>
          Learn More
        </Button>
        {/* Photo Gallery */}
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} sm={4} className={classes.galleryItem}>
            <img src={image1} alt="Gallery Item 1" className={classes.galleryImage} />
          </Grid>
          <Grid item xs={12} sm={4} className={classes.galleryItem}>
            <img src={image2} alt="Gallery Item 2" className={classes.galleryImage} />
          </Grid>
          <Grid item xs={12} sm={4} className={classes.galleryItem}>
            <img src={image3} alt="Gallery Item 3" className={classes.galleryImage} />
          </Grid>
          {/* Add more Grid items for additional gallery images */}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
