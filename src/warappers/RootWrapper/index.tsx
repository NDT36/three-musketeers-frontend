import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const LoginPage = lazy(() => import('pages/LoginPage'));
const SignUpPage = lazy(() => import('pages/SignUpPage'));
const PageWrapper = lazy(() => import('warappers/PageWrapper'));

export default function RootWrapper() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/*" element={<PageWrapper />} />
    </Routes>
  );
}
