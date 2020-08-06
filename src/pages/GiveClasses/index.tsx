import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
/* Importando pacote para utilizarmos um botão mais bonito */
import { RectButton } from 'react-native-gesture-handler';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

function GiveClasses() {
  const { goBack } = useNavigation();

  /* Função para retornar a página anterior quando for clicado no botão 'Tudo Bem' */
  function handleNavigateBack() {
    goBack();
  }

  return (
    <View style={styles.container}>
      {/* Todo Imagem de background é obrigatório passar o tamanho que irá ocupar na tela */}
    <ImageBackground 
      resizeMode='contain' 
      source={giveClassesBgImage} 
      style={styles.content}
    >
      <Text style={styles.title}>Quer ser um Proffy?</Text>
      <Text style={styles.description}>
        Para começar, você precisa se cadastrar como professor na nossa plataforma web.
      </Text>

    </ImageBackground>

    <RectButton onPress={handleNavigateBack} style={styles.button}>
      <Text style={styles.buttonText}>Tudo Bem</Text>
    </RectButton>

    </View>
  )
}

export default GiveClasses;