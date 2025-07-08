import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import {Toaster} from "react-hot-toast";
import UserProvider from './context/UserContext';

function App() {

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element= {<Root/>} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expense" exact element={<Expense />} />
        </Routes>
      </Router>      
    </UserProvider>
  )
}

export default App;

const Root = () =>{
  //check if user is authenticated
  const isAuthenticated = localStorage.getItem('token');
  // if yes, redirect to dashboard
  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  ); 
};
