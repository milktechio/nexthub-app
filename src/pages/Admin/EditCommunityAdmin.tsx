import {StatusBar} from 'react-native';
import React from 'react';
import HeaderNav from '../../components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Box,
  Divider,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainNavigator} from '../../routes/RoutesMain';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';

const EditCommunityAdmin = () => {
  const route = useRoute<RouteProp<MainNavigator, 'editCommunityAdmin'>>();

  return (
    <>
      <HeaderNav title="Editar" />
      <StatusBar barStyle={'light-content'} />
      <Box pt={6} bg="brand.primary">
        <Image alt="communityImg" source={{uri: route.params.img}} h={230} />
      </Box>
      <Text
        color={'white'}
        bg={'brand.primary'}
        pt={9}
        pb={5}
        fontSize={'3xl'}
        fontWeight={'semibold'}
        pl={7}>
        {route.params.title}
      </Text>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          alignItems: 'center',
          height: '100%',
        }}
        style={{backgroundColor: '#0F101E'}}>
        <VStack space={6} w="85%">
          <Text color="brand.textOff">{route.params.des}</Text>
          <Pressable _pressed={{opacity: 0.5}}>
            <HStack justifyContent="flex-end">
              <Text fontSize={15} color="brand.accent">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{color: '#1594DB', marginRight: 6}}
                />
                Editar descripción
              </Text>
            </HStack>
          </Pressable>
          <Divider backgroundColor="brand.textOff" />
          <Text color="brand.textOff">
            Aqui estará todo para agregar, borrar o editar eventos en la
            comunidad.
          </Text>
        </VStack>
      </KeyboardAwareScrollView>
    </>
  );
};

export default EditCommunityAdmin;
