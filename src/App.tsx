import React from 'react';
import {
  Routes, Route
} from "react-router-dom";
import Home from "./components/routes/Home";
import Navbar from "./components/contents/Navbar";
import About from "./components/routes/About";
import Docs from "./components/routes/Docs";
import './App.css';

function App() {
  return (
    <div className="App">
    	<Navbar isLoggedIn={false} />
      	<Routes>
        	<Route path="/" element={<Home />} />
        	<Route path="/home" element={<Home />} />
        	<Route path="/about" element={<About />} />
        	<Route path="/docs" element={<Docs />} />
      	</Routes>
    </div>
  );
}

export default App;
