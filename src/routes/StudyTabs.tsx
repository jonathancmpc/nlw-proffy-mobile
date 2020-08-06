/* Arquivo responsável pela navegação em abas */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
  return (
    /* Não temos aqui o NavigationContainer pq só iremos mostrar uma vez as tabs */
    <Navigator>
      <Screen name="TeacherList" component={TeacherList} />
      <Screen name="Favorites" component={Favorites} />
    </Navigator>
  );
}

export default StudyTabs;