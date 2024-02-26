import React from 'react';
import { Typography, Container, List, ListItem, ListItemText } from '@mui/material';

function AboutUs() {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>About Us</Typography>
      <Typography variant="body1" paragraph>Welcome to the Gnostic Christian Church!</Typography>
      <Typography variant="body1" paragraph>
        At the Gnostic Christian Church, we are dedicated to exploring the rich spiritual tradition of Gnosticism within the context of Christianity. Gnosticism offers a unique perspective on Christian theology, emphasizing personal spiritual experience, inner knowledge (gnosis), and the pursuit of divine truth.
      </Typography>
      <Typography variant="body1" paragraph>
        Our community is founded on the principles of inclusivity, open-minded inquiry, and spiritual exploration. We welcome individuals from all walks of life, backgrounds, and beliefs to join us on our journey of spiritual discovery.
      </Typography>
      <Typography variant="h3" gutterBottom>Our Mission:</Typography>
      <Typography variant="body1" paragraph>
        Our mission is to provide a welcoming and nurturing space for spiritual seekers to explore Gnostic teachings, engage in meaningful dialogue, and cultivate a deeper connection with the divine. We strive to promote spiritual growth, personal transformation, and a deeper understanding of the mysteries of existence.
      </Typography>
      <Typography variant="h3" gutterBottom>What We Believe:</Typography>
      <List>
        <ListItem>
          <ListItemText primary="We believe in the inherent divinity of all beings and the interconnectedness of all life." />
        </ListItem>
        <ListItem>
          <ListItemText primary="We embrace the teachings of Jesus Christ while also drawing inspiration from various Gnostic texts and traditions." />
        </ListItem>
        <ListItem>
          <ListItemText primary="We value the pursuit of inner wisdom and the journey of self-discovery as essential aspects of spiritual development." />
        </ListItem>
        <ListItem>
          <ListItemText primary="We affirm the importance of love, compassion, and service as guiding principles in our lives and our community." />
        </ListItem>
      </List>
      <Typography variant="h3" gutterBottom>Our Community:</Typography>
      <Typography variant="body1" paragraph>
        Our community is made up of individuals who are passionate about spiritual exploration, intellectual inquiry, and personal growth. We come together in fellowship to support one another on our spiritual journeys and to explore the depths of Gnostic wisdom together.
      </Typography>
      <Typography variant="h3" gutterBottom>Join Us:</Typography>
      <Typography variant="body1" paragraph>
        Whether you are new to Gnosticism or have been on the path for many years, we invite you to join us in exploring the mysteries of Gnostic Christianity. Attend our services, participate in our study groups, or simply reach out to connect with fellow seekers. Together, we can embark on a journey of spiritual discovery and transformation.
      </Typography>
    </Container>
  );
}

export default AboutUs;
