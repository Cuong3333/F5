import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {CombinedAuthPage, HomePage} from './components/pages/index';
// Import các trang khác...

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/Login" element={<CombinedAuthPage />} />

      {/* Thêm các route khác */}
    </Routes>
  );
};

export default AppRoutes;
