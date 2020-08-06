import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Landing from './src/pages/Landing';
import { AppLoading } from 'expo'; /* Página de Loading quando inicia a aplicação */
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

export default function App() {
  /* Passando o nome das fontes que iremos utilizar, conforme documentação do expo-google-fonts */
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  /* Se as fontes não estiverem carregadas, aparece o Loading. (Tudo na documentação do expo fonts) */
  if (!fontsLoaded) {
    return <AppLoading />
    
  } else {
    return (
      <>
        <Landing />
        <StatusBar style="auto" />
      </>
    );
  }

}

