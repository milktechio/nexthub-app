import React from 'react';
import {
  StatusBar,
  Text,
  Button,
  Image,
  VStack,
  Divider,
  Pressable,
  HStack,
  ScrollView,
  View,
  Flex,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const ViajemosJuntos = () => {
  const navigation = useNavigation();

  function navigateToNextHandler() {
    // @ts-ignore
    navigation.navigate('chat');
  }

  function navigateToBackHandler() {
    // @ts-ignore
    navigation.goBack();
  }
  return (
    <Flex height={'100%'} flex={1} bg={'brand.primary'}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <StatusBar barStyle={'light-content'} />
        <Image
          w="full"
          h={300}
          alt="image"
          source={require('../../../assets/viajemos-juntos.png')}
        />
        <VStack mt={3} space={9} w="85%" mb={12}>
          <Image
            alt="image"
            source={require('../../../assets/viajemos-text.png')}
          />
          <Text fontSize={16} color="brand.secondary">
            El Poder de elegir es 100% de las personas y el debate es parte del
            proceso, entra con nosotros y juntos llevemos procesos sanos.
          </Text>
          <Button
            _pressed={{opacity: 0.5, backgroundColor: '#C219ED'}}
            bg="brand.tertiary"
            onPress={navigateToNextHandler}>
            CONTINUAR
          </Button>
          <Divider backgroundColor="brand.textOff" />
          <HStack mt={-6} justifyContent="center">
            <Text color={'brand.textOff'} mr={2}>
              ¿Ya tienes cuenta?
            </Text>
            <Pressable
              onPress={navigateToBackHandler}
              _pressed={{opacity: 0.5}}>
              <Text color={'brand.accent'}>Inicia sesión</Text>
            </Pressable>
          </HStack>
        </VStack>
      </ScrollView>
    </Flex>
  );
};

export default ViajemosJuntos;
