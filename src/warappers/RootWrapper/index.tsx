import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import PageWrapper from 'warappers/PageWrapper';

const LoginPage = lazy(() => import('pages/LoginPage'));
const SignUpPage = lazy(() => import('pages/SignUpPage'));

export default function RootWrapper() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/*" element={<PageWrapper />} />
    </Routes>
  );
}
