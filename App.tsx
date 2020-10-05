import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Routes from './routes';
import { AuthProvider } from './src/providers/AuthProvider';

export default function App() {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
}