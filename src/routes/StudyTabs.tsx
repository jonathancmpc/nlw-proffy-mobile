/* Arquivo responsável pela navegação em abas */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
  return (
    /* Não temos aqui o NavigationContainer pq só iremos mostrar uma vez as tabs */
    <Navigator
      /* Estilizando as Tabs */
      tabBarOptions={{
        /* Container das abas */
        style: {
          elevation: 0, /* Tira a sombra no Android */
          shadowOpacity: 0, /* Tira a sombra no IOS */
          height: 64,
        },
        /* Estilização de cada aba */
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        },
        /* Estilizando os ícones */
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        /* Estilização do texto */
        labelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
          marginLeft: 16,
        },
        /* Cor da aba quando ela não está ativa e quando está */
        inactiveBackgroundColor: '#fafafc',
        activeBackgroundColor: '#ebebf5',
        /* Cor do texto quando a aba não está ativa e quando está */
        inactiveTintColor: '#c1bccc',
        activeTintColor: '#32268d',
      }}
    >
      <Screen 
        name="TeacherList" 
        component={TeacherList} 
        options={{
          /* Configurando texto da tab */
          tabBarLabel: 'Proffys',
          /* Inserindo ícone na aba, trocando a cor e tamanho */
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons 
                name="ios-easel" 
                size={size} 
                /* Se tiver foco muda de cor o ícone */
                color={focused ? '#8257e5' : color} 
              />
            );
          }
        }}
      />

      <Screen 
        name="Favorites" 
        component={Favorites} 
        options={{
          /* Configurando texto da tab */
          tabBarLabel: 'Favoritos',
          /* Inserindo ícone na aba, trocando a cor e tamanho */
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons 
                name="ios-heart" 
                size={size} 
                /* Se tiver foco muda de cor o ícone */
                color={focused ? '#8257e5' : color} 
              />
            );
          }
        }}
      />
    </Navigator>
  );
}

export default StudyTabs;