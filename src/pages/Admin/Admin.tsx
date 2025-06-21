import React from 'react';
import {Box, FlatList, Flex, Text} from 'native-base';
import ComunidadCard from '../../components/ComunidadCard';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

const DUMMY_DATA = [
  {
    title: 'Grupo MTB Morelia',
    miembros: '363',
    location: 'Morelia',
    des: 'Grupo dedicado a todos los MTB de Morelia, suscribete a este grupo para unirte a rodadas, eventos, y más!',
    img: 'https://images.pexels.com/photos/3789260/pexels-photo-3789260.jpeg',
    id: 123313,
  },
  {
    title: 'Reforestación GDL',
    miembros: '120',
    location: 'Guadalajara',
    des: '¿Te importa el cambio climatico? Únete a nostros para ser parte de este gran grupo haciendo algo para mejorar el futuro para todos.',
    img: 'https://images.pexels.com/photos/5487075/pexels-photo-5487075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    id: 1213434,
  },
];

const Admin = () => {
  function navigateToEditHandler(
    title: string,
    id: number,
    img: string,
    des: string,
  ) {
    Alert.alert('Coming soon... 🕐', '¡Pronto podras editar tus comunidades!');
    // @ts-ignore
    // navigation.navigate('editCommunityAdmin', {id, title, img, des});
  }

  Alert.alert(
    'Admin',
    'Aquí podras visualizar e interactuar con tus comunidades. Acciónes como: agregar eventos, invitar personas, editar comunidad, etc.',
  );

  return (
    <>
      <Flex bg="brand.primary" flex={1} position={'relative'}>
        <Text
          color={'white'}
          bg={'brand.primary'}
          pt={70}
          pb={5}
          fontSize={'3xl'}
          fontWeight={'semibold'}
          pl={7}>
          Admin
        </Text>
        <Text
          color={'white'}
          bg={'brand.primary'}
          pb={5}
          fontSize={'xl'}
          pl={7}>
          Mis comunidades
        </Text>
        <FlatList
          px={6}
          ItemSeparatorComponent={() => <Box h={6} />}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={DUMMY_DATA}
          numColumns={2}
          renderItem={({item}) => (
            <ComunidadCard
              title={item.title}
              img={item.img}
              miembros={item.miembros}
              location={item.location}
              onPress={() =>
                navigateToEditHandler(item.title, item.id, item.img, item.des)
              }
            />
          )}
        />
      </Flex>
    </>
  );
};

export default Admin;
