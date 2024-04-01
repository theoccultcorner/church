import React from "react";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Messenger from "./pages/Messenger";
import Contact from "./pages/Contact";
 
// Import DrawerComponent
import DrawerComponent from "./pages/DrawerComponent";

const App = () => {
  return (
    <Router>
      <div>
        {/* Include DrawerComponent */}
        <DrawerComponent />
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="profile" element={<Profile />} />
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="messenger" element={<Messenger />} />
            <Route path="contact" element={<Contact />} />
  
 
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
