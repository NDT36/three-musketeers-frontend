import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import PageWrapper from 'warappers/PageWrapper';

const Login = lazy(() => import('pages/Login'));
const SignUp = lazy(() => import('pages/SignUp'));

export default function RootWrapper() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/*" element={<PageWrapper />} />
    </Routes>
  );
}
