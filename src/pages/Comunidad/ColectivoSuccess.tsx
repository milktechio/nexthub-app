import React from 'react';
import HeaderNav from '../../components/Header';
import {
  Flex,
  Image,
  ScrollView,
  StatusBar,
  VStack,
  Text,
  Button,
  Divider,
} from 'native-base';

type Props = {};

const ColectivoSuccess = (props: Props) => {
  return (
    <>
      <HeaderNav title="Pago" />
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        bg="brand.primary"
        h="100%"
        contentContainerStyle={{alignItems: 'center'}}>
        <Image alt="img" bg="brand.textOff" h={230} w={'100%'} mt={6} />
        <VStack w={'85%'} pt={6} space={6}>
          <Flex
            flexDir={'row'}
            justifyContent={'space-between'}
            alignItems="center">
            <Text color="white" fontWeight={'semibold'} fontSize={'xl'}>
              Este es un titulo
            </Text>
            <Text color="white">12/12/23</Text>
          </Flex>
          <Divider bg={'brand.textOff'} />

          <VStack alignItems={'center'} space={6}>
            <Flex flexDir={'row'} justifyContent={'space-between'} w="80%">
              <Text
                color="brand.textOff"
                fontWeight={'semibold'}
                fontSize={'md'}>
                CLABE
              </Text>
              <Text color="white" fontSize={'md'}>
                12345678901234556
              </Text>
            </Flex>
            <Flex flexDir={'row'} justifyContent={'space-between'} w="80%">
              <Text
                color="brand.textOff"
                fontWeight={'semibold'}
                fontSize={'md'}>
                Referencia
              </Text>
              <Text color="white" fontSize={'md'}>
                1A2B3C
              </Text>
            </Flex>
            <Flex flexDir={'row'} justifyContent={'space-between'} w="80%">
              <Text
                color="brand.textOff"
                fontWeight={'semibold'}
                fontSize={'md'}>
                Cantidad
              </Text>
              <Text color="white" fontSize={'md'}>
                12
              </Text>
            </Flex>
            <Flex flexDir={'row'} w="100%" justifyContent={'space-between'}>
              <Text color="white" fontSize={'lg'}>
                Entrega estimada --
              </Text>
              <Text
                color="brand.accent"
                fontWeight={'semibold'}
                fontSize={'lg'}>
                Total 240$
              </Text>
            </Flex>
            <Divider bg={'brand.textOff'} />
            <Text fontWeight={'bold'} color="brand.tertiary" fontSize={'lg'}>
              ENTREGA PENDIENTE
            </Text>
          </VStack>
        </VStack>
      </ScrollView>
    </>
  );
};

export default ColectivoSuccess;
