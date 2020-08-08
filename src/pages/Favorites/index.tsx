import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  function loadFavorites() {
    /* Salvando os favoritos no storage. Este é o retorno do nosso banco de dados do storage(não é o banco relacional que fizemos a API), estou indo ao banco e procurando pela chace chamada favorites */
    /* Este banco de dados só recebe texto, por isso se for uma lista tem que convertê-la em texto(JSON) */
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        /* Convertendo de volta para lista(ele vem como texto do storage) */
        const favoritedTeachers = JSON.parse(response);

        setFavorites(favoritedTeachers);
      }
    });
  }

  /* Carregando a lista assim que o usuário clicar na aba favoritos, neste caso temos que utilizar o useFocusEffect ao invés do useEffect poruqe é uma aba */
  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys favoritos"/>

      {/* Criando Scrow da lista e estilizando ela */}
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >

        {favorites.map((teacher: Teacher) => {
          return (
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher}
              favorited={true}
            />
          )
        })}

      </ScrollView>
    </View>
  );
}

export default Favorites;