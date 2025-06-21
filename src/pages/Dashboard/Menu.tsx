import React from 'react';
import {
  Flex,
  HStack,
  Text,
  VStack,
  Pressable,
  Divider,
  ScrollView,
  Box,
} from 'native-base';
import {Alert} from 'react-native';
import MenuList from '../../components/MenuNavList';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {logout} from '../../redux/slices/userSlice';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faDoorOpen} from '@fortawesome/free-solid-svg-icons';

const Menu = () => {
  const dispatch = useAppDispatch();

  const clubs = useAppSelector(state => state.community.getClubsInfo);

  function logoutHandler() {
    Alert.alert('¿Éstas seguro que quieres cerrar sesión?', '', [
      {
        text: 'No',
        onPress: () => {},
      },
      {text: 'Sí', onPress: () => dispatch(logout())},
    ]);
  }

  return (
    <Flex height={'100%'} flex={1} bg={'brand.primary'}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 100,
          paddingHorizontal: 30,
          height: '100%',
          justifyContent: 'space-between',
        }}>
        <Box>
          <Text
            color={'white'}
            bg={'brand.primary'}
            pb={5}
            fontSize={'3xl'}
            fontWeight={'semibold'}>
            Menu
          </Text>
          <HStack mt={3} mb={20} justifyContent="space-between">
            <VStack alignItems="center">
              <Text color="brand.textOff" fontSize={16}>
                Rol
              </Text>
              <Text color="brand.secondary" fontSize={20} fontWeight="bold">
                Usuario
              </Text>
            </VStack>
            <VStack alignItems="center">
              <Text color="brand.textOff" fontSize={16}>
                Comunidades
              </Text>
              <Text color="brand.tertiary" fontSize={20} fontWeight="bold">
                {clubs.length > 0 ? clubs.length : '0'}
              </Text>
            </VStack>
          </HStack>
          <MenuList />
        </Box>
        <Pressable mt={16} onPress={logoutHandler} _pressed={{opacity: 0.5}}>
          <Divider backgroundColor="brand.textOff" />
          <HStack my={5} alignItems={'center'}>
            <FontAwesomeIcon icon={faDoorOpen} color="#1594DB" size={20} />
            <Text
              ml={3}
              fontSize="lg"
              color={'brand.accent'}
              alignSelf={'flex-start'}>
              Cerrar Sesión
            </Text>
          </HStack>
        </Pressable>
      </ScrollView>
    </Flex>
  );
};

export default Menu;
