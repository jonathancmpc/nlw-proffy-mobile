import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { ScrollView, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
/* Importando o expo async storage para conseguirmos salvar os favoritos no storage do celular */
import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

function TeacherList() {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites() {
    /* Salvando os favoritos no storage. Este é o retorno do nosso banco de dados do storage(não é o banco relacional que fizemos a API), estou indo ao banco e procurando pela chace chamada favorites */
    /* Este banco de dados só recebe texto, por isso se for uma lista tem que convertê-la em texto(JSON) */
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        /* Convertendo de volta para lista(ele vem como texto do storage) */
        const favoritedTeachers = JSON.parse(response);
        /* Percorrendo e pegando apenas o id do teacher */
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id;
        })

        setFavorites(favoritedTeachersIds);
      }
    });
  }

  /* Faz os filtros e também carrega os favoritos */
  async function handleFiltersSubmit() {
    loadFavorites();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    });

    /* Fechando os filtros após a pesquisa */
    setFiltersVisible(false);
    setTeachers(response.data);
  }
  
  /* Função para setar verdadeiro ou false para visualização dos filtros */
  function handleToggleFiltersVisible() {
    setFiltersVisible(!filtersVisible);
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis"
        /* Passando um componente de filtro para o componente PageHeader */
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name='filter' size={20} color='#FFF' />
          </BorderlessButton>
        )}
      >
        {filtersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput 
              style={styles.input}
              value={subject} 
              /* Diferente da web, aqui nós pegamos o texto diretamente pelo onChangeText */
              onChangeText={text => setSubject(text)}
              placeholder="Qual a matéria?"
              placeholderTextColor='#c1bccc'
            />
            
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput 
                  style={styles.input}
                  value={week_day} 
                  /* Diferente da web, aqui nós pegamos o texto diretamente pelo onChangeText */
                  onChangeText={text => setWeekDay(text)}
                  placeholder="Qual o dia da semana?"
                  placeholderTextColor='#c1bccc'
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput 
                  style={styles.input}
                  value={time} 
                  /* Diferente da web, aqui nós pegamos o texto diretamente pelo onChangeText */
                  onChangeText={text => setTime(text)}
                  placeholder="Qual o Horário?"
                  placeholderTextColor='#c1bccc'
                />
              </View>
            </View>

            <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      {/* Criando Scrow da lista e estilizando ela */}
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >

        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher}
              /* Verificando se o id do professor está incluido na lista de ids de favoritos */
              favorited={favorites.includes(teacher.id)}
            />
          )
        })}

      </ScrollView>
    </View>
  );
}

export default TeacherList;