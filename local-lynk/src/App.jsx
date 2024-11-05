import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import NavigationBar from "./components/NavBar";
import "./App.css";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";

function App() {
 

  return (
    <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
    </div>
  );
}

export default App;