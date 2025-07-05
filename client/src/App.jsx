import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigation} from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Auth/Dashboard/Home';
import Income from './pages/Auth/Dashboard/Income';
import Expense from './pages/Auth/Dashboard/Expense';

function App() {

  return (
    <>
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
    
    </>
  )
}

export default App
