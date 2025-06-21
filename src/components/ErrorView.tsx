import React from 'react';
import {Flex, Text, StatusBar, VStack, HStack, Button} from 'native-base';
import {Image} from 'react-native';

type Props = {};

const ErrorView = (props: Props) => {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        h={'100%'}
        bg="brand.primary">
        <VStack space={9} w="85%">
          <VStack alignItems="center">
            <Image source={require('../../assets/error_logo.png')} />
          </VStack>
          <Text
            color={'white'}
            fontSize={50}
            lineHeight={60}
            textAlign="center"
            fontWeight={'extrabold'}>
            ¡ALGO SALIÓ MAL!
          </Text>
          <Text color={'white'}>
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book.
          </Text>
          <Button bg={'brand.tertiary'} borderRadius={6}>
            Regresar a Home
          </Button>
          <Button
            bg={'transparent'}
            borderColor={'brand.tertiary'}
            borderWidth={1}
            borderRadius={6}>
            <Text color="brand.tertiary">Ir a Soporte</Text>
          </Button>
        </VStack>
      </Flex>
    </>
  );
};

export default ErrorView;
