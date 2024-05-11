
import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import StudentProfile from './pages/StudentProfile';
import Performance from './components/Performance';

const AppRouter = () => {
  return (
    <Routes>
      
        <Route  path="/signup" element={<Signup/>} />
        <Route  path="/login" element={<Login/>} />
        <Route  path="/profile" element={<StudentProfile/>} />
        <Route  path="/performance" element={<Performance/>} />
      
    </Routes>
  );
};

export default AppRouter;
