import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

import styles from './styles';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: number;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  /* Sempre que uma informação tiver que ser manipulada pelo usuário, ela precisa estar no estado */
  const [isFavorited, setIsFavorited] = useState(favorited);
  
  function handleLinkToWhatsapp() {
    /* Utilizando o deep linkin do whatsapp para abri-lo, toda aplicação deve ter um deep linkia para app's externos conectar com eles */
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }

  async function handleToggleFavorite() {
    
    const favorites = await AsyncStorage.getItem('favorites');

    /* Como pode ter alguém que não tenha favoritos, temos que fazer essa condição */
    let favoritesArray = [];
    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }
    
    if (isFavorited) {
      /* Procurando a posição deste professor dentro dos favoritos, item por item */
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
        return teacherItem.id === teacher.id;
      });

      /* Removendo o professor de dentro do array de favoritos. O splice encontra o indice dentro do array no primeiro parâmetro e no segundo é informado quantas posições quer remover a partir daquele índice */
      favoritesArray.splice(favoriteIndex, 1);

      /* Informando que este array não é favorito */
      setIsFavorited(true);
      
    } else {
      /* Incluindo um novo favorito no array */
      favoritesArray.push(teacher);

      /* Informando que este array são os favoritos */
      setIsFavorited(true);
    }

    /* Inserindo o Array no banco de dados Storage(tranformando em string) */
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }


  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
          style={styles.avatar}
          source={{ uri: teacher.avatar }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        {teacher.bio}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'  '}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          {/* Se estiver favoritado, utiliza o estilo dos favoritos e mostra o ícone dos favoritos, se não, mostra um estilo vazio e mostra o ícone do não favoritado */}
          <RectButton
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton, 
              isFavorited ? styles.favorited : {},
            ]}
          >

            { isFavorited  
              ? <Image source={unfavoriteIcon} /> 
              : <Image source={heartOutlineIcon} />
            }
            
          </RectButton>
          
          <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;