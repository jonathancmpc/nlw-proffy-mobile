import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      {/* A scrrenOptions são as configurações para a barra de navegação que vem por padrão na lib Navigator, porém não iremos utilizar a barra nesse app */}
      <Navigator screenOptions={{ headerShown: false, }}>
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClasses" component={GiveClasses} />
      </Navigator>
    </NavigationContainer>
  )
}

export default AppStack;