import React from 'react';
import {Text, Image, VStack, HStack, Divider, Pressable} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faComputer} from '@fortawesome/free-solid-svg-icons';
import {Alert} from 'react-native';

type Props = {};

const MenuList = (props: Props) => {
  const navigation = useNavigation();

  function navigateMenu(data: {name: string; route: string}) {
    if (data.route === 'support') {
      Alert.alert(
        'Coming soon... 🕐',
        '¡Aquí es donde podras crear tickets de soporte!',
      );

      return;
    }

    if (data.route) {
      // @ts-ignore
      navigation.navigate(data.route);
    }
  }

  return (
    <VStack>
      <Pressable
        onPress={() => {
          navigateMenu({name: 'perfil', route: 'profile'});
        }}
        _pressed={{opacity: 0.5}}>
        <Divider backgroundColor="brand.textOff" />
        <HStack my={5} alignItems="center">
          <Image
            alt="image"
            source={require('../../assets/icons/perfil.png')}
          />
          <Text ml={3} fontSize={16} color="brand.secondary">
            Perfil
          </Text>
        </HStack>
      </Pressable>

      {/* <Pressable
        onPress={() => {
          navigateMenu({name: 'soporte', route: 'support'});
        }}
        _pressed={{opacity: 0.5}}>
        <Divider backgroundColor="brand.textOff" />
        <HStack my={5} alignItems="center">
          <Image alt="" source={require('../../assets/icons/soporte.png')} />
          <Text ml={3} fontSize={16} color="brand.secondary">
            Soporte
          </Text>
        </HStack>
      </Pressable> */}
      <Pressable
        onPress={() => {
          navigateMenu({name: 'perfil', route: 'termsAndCond'});
        }}
        _pressed={{opacity: 0.5}}>
        <Divider backgroundColor="brand.textOff" />
        <HStack my={5} alignItems="center">
          <Image
            alt="image"
            source={require('../../assets/icons/terminos.png')}
          />
          <Text ml={3} fontSize={16} color="brand.textOff">
            Términos y Condiciones
          </Text>
        </HStack>
      </Pressable>
      <Pressable
        onPress={() => {
          navigateMenu({name: 'perfil', route: 'team'});
        }}
        _pressed={{opacity: 0.5}}>
        <Divider backgroundColor="brand.textOff" />
        <HStack my={5} alignItems="center">
          <FontAwesomeIcon
            icon={faComputer}
            size={20}
            color="#656997"
            style={{marginLeft: 5}}
          />
          <Text ml={3} fontSize={16} color="brand.textOff">
            Equipo de Desarollo
          </Text>
        </HStack>
      </Pressable>
    </VStack>
  );
};

export default MenuList;
