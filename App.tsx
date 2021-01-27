import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Routes from './routes';
import { AuthProvider } from './src/providers/AuthProvider';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';
import { AppLoading } from 'expo'
export default function App() {

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold
  })
  if (!fontsLoaded) return <AppLoading />
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
}