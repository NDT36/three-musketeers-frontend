import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const LoginPage = lazy(() => import('pages/LoginPage'));
const PageWrapper = lazy(() => import('warappers/PageWrapper'));

export default function RootWrapper() {
  return (
    <div className="app-wrapper relative max-w-[450px] mx-auto border border-white rounded-tl-lg rounded-tr-lg min-h-full">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<PageWrapper />} />
      </Routes>
    </div>
  );
}
