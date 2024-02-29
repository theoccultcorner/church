import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Ministries from "./pages/Ministries";
import Sermons from "./pages/Sermons";
import Messenger from "./pages/Messenger";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";


// Import DrawerComponent
import DrawerComponent from "./pages/DrawerComponent";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Include DrawerComponent */}
        <DrawerComponent />
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="ministries" element={<Ministries />} />
            <Route path="sermons" element={<Sermons />} />
            <Route path="messenger" element={<Messenger />} />
            <Route path="contact" element={<Contact />} />
            <Route path="profile" element={<Profile />} />
 
             
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
