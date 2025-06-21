import React from 'react';
import {Flex, StatusBar, Text, VStack, Button, HStack} from 'native-base';
import {Image} from 'react-native';

type Props = {};

const SuccessView = (props: Props) => {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        h={'100%'}
        bg={'brand.primary'}>
        <VStack space={9} w="85%" alignItems="center">
          <Image source={require('../../assets/check-circle.png')} />
        </VStack>
        <Text
          color={'white'}
          fontSize={50}
          lineHeight={60}
          textAlign="center"
          fontWeight={'extrabold'}>
          ¡COMPLETADO CON EXITO!
        </Text>
        <HStack w="85%" my={9}>
          <Button w="full" bg={'brand.tertiary'} borderRadius={6}>
            Regresar a Home
          </Button>
        </HStack>
        <HStack w="85%">
          <Button
            w="full"
            bg={'transparent'}
            borderColor={'brand.tertiary'}
            borderWidth={1}
            borderRadius={6}>
            <Text alignSelf="center" color="brand.tertiary">
              Ir a Soporte
            </Text>
          </Button>
        </HStack>
      </Flex>
    </>
  );
};

export default SuccessView;
