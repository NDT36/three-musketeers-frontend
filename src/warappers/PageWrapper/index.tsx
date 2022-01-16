import Home from 'pages/Home';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export default function PageWrapper() {
  return (
    <div className="app-wrapper">
      this is home page
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}
