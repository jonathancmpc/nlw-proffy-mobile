import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8257E5',
    flex: 1,
    justifyContent: 'center',
    padding: 40
  },

  banner: {
    width: '100%',
    resizeMode: 'contain', /* redimensiona a imagem proporcionalmente, porém todo o conteúdo dela tem que estar visível */
  },

  title: {
    color: '#FFF',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 80,
  },

  titleBold: {
    fontWeight: 'bold',
  },
});

export default styles;