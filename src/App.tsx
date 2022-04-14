import React from 'react';
import {
  Routes, Route
} from "react-router-dom";
import { Home, About, Docs, Signup } from "./components/routes/route_index";
import Navbar from "./components/contents/Navbar";
import './App.css';

const isLogged = false;

function App() {
  return (
    <div className="App">
    	<Navbar isLoggedIn={isLogged} />
      	<Routes>
        	<Route path="/" element={<Home isLoggedIn={isLogged} />} />
        	<Route path="/home" element={<Home isLoggedIn={isLogged} />} />
        	<Route path="/about" element={<About />} />
        	<Route path="/docs" element={<Docs />} />
        	<Route path="/signup" element={<Signup />} />
      	</Routes>
    </div>
  );
}

export default App;
