import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!! ❤</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    transform: [
      {rotateZ: '30deg'}
    ]
  }
});
