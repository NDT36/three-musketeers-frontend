import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const LoginPage = lazy(() => import('pages/LoginPage'));
const SignUpPage = lazy(() => import('pages/SignUpPage'));
const PageWrapper = lazy(() => import('warappers/PageWrapper'));

export default function RootWrapper() {
  return (
    <div className="app-wrapper relative max-w-[450px] mx-auto border rounded-tl-lg rounded-tr-lg bg-white border-gray-200 h-full">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/*" element={<PageWrapper />} />
      </Routes>
    </div>
  );
}
