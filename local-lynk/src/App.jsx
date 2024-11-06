import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import NavigationBar from "./components/NavBar";

import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import FeedPage from "./components/Feed";

function App() {
 

  return (
    <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/feed" element={<FeedPage />} />
        </Routes>
    </div>
  );
}

export default App;