import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Survey from './pages/Survey';
import Main from './pages/Main';
//import Home from './pages/Home';
import Profile from './pages/Profile';
import LoginPage from './pages/LoginPage';
// Import các trang khác...

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/Survey" element={<Survey />} />
      <Route path="/profile" element={<Profile />} />
      {/* Thêm các route khác */}
    </Routes>
  );
};

export default AppRoutes;
