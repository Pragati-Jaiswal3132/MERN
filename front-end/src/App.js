


import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import React, { useState, useEffect } from "react";
import Login from './components/Login';
import FileUpload from './components/FileUpload';
import Manage from './components/manage'; // Ensure correct import path
import { CollectionProvider } from './context/CollectionContext';
import MainContent from './components/MainContent';
import Verify from './components/Verify';
import Support from './components/Support';


// Main App component
function App() {
  const [auth, setAuth] = useState(null);

  

  // Check local storage for user data on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setAuth(JSON.parse(storedUser));
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setAuth(null);
  };

  return (
    <CollectionProvider>
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<MainContent />} />

            <Route element={<PrivateComponent allowedRoles={['admin']} />}>
              <Route path="/upload" element={<FileUpload />} />
              <Route path="/manage" element={<Manage />} />
            </Route>

            <Route element={<PrivateComponent allowedRoles={['user']} />}>
              <Route path="/verify" element={<Verify />} /> 
            </Route>

            

            <Route path="/support" element={<Support />} />

            <Route path="/signup" element={<SignUp onSignUp={setAuth} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<h1>Logout and exit from this portal</h1>} onEnter={handleLogout} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </CollectionProvider>
  );
}

export default App;
