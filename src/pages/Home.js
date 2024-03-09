import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
 
import 'slick-carousel/slick/slick.css'; // Import slick carousel styles
import 'slick-carousel/slick/slick-theme.css'; // Import slick carousel theme styles
import { Facebook, Instagram, YouTube } from '@material-ui/icons'; // Import icons
import backgroundImage from './background.jpg'; // Import your background image
 
// Import additional images as needed

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    height: '100vh', // Make the root element full-screen
    backgroundImage: `url(${backgroundImage})`, // Set the background image
    backgroundSize: 'cover', // Cover the entire background
    backgroundPosition: 'center', // Center the background image
    transition: 'background-color 0.3s ease', // Smooth transition for background color change
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
    paddingTop: theme.spacing(12), // Adjust top padding to accommodate the parallax effect
    paddingBottom: theme.spacing(12), // Adjust bottom padding to accommodate the parallax effect
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(2),
  },
  sliderContainer: {
    width: '80%', // Set the width of the carousel container
    margin: '0 auto', // Center the carousel container
  },
  galleryImage: {
    width: '100%', // Set the width of the carousel images
    maxHeight: '70vh', // Limit the height of the carousel images
    objectFit: 'cover', // Cover the entire image within its container
    borderRadius: theme.spacing(1), // Add some border radius for better aesthetics
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow for depth
  },
  socialMediaContainer: {
    marginTop: theme.spacing(4), // Add some space between the carousel and social media icons
  },
  socialMediaIcon: {
    fontSize: '2rem', // Set the size of the social media icons
    margin: theme.spacing(1), // Add some margin around the icons
    color: '#fff', // Set the color of the icons to white
  },
}));

const Home = () => {
  const classes = useStyles();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Change background color based on scroll position
  const backgroundColor = scrollPosition > 100 ? '#333' : 'transparent';

  return (
    <div className={classes.root} style={{ backgroundColor }}>
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
        <div className={classes.socialMediaContainer}>
          <Facebook className={classes.socialMediaIcon} />
          <Instagram className={classes.socialMediaIcon} />
          <YouTube className={classes.socialMediaIcon} />
        </div>
      </div>
    </div>
  );
};

export default Home;
