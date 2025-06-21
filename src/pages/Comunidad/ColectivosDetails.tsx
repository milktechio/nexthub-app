import React from 'react';
import HeaderNav from '../../components/Header';
import {
  Box,
  Divider,
  Flex,
  Image,
  Progress,
  StatusBar,
  VStack,
  Text,
  Button,
  ScrollView,
  Pressable,
} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowUpFromBracket,
  faHeart,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {MainNavigator} from '../../routes/RoutesMain';

type Props = {};

const ColectivosDetails = (props: Props) => {
  const route = useRoute<RouteProp<MainNavigator, 'colectivosDetails'>>();
  const dataTitle: any = route.params.title;
  const dataDes: any = route.params.des;
  const dataImage: any = route.params.image;

  const navigation = useNavigation();

  function navigateToBuyHandler() {
    // @ts-ignore
    navigation.navigate('colectivoBuy');
  }

  return (
    <>
      <HeaderNav title="Colectivo" />
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        bg="brand.primary"
        h="100%"
        contentContainerStyle={{alignItems: 'center'}}>
        <Image
          alt="img"
          bg="brand.textOff"
          h={230}
          w={'100%'}
          mt={6}
          source={dataImage}
          resizeMode="cover"
        />
        <VStack w={'85%'} pt={6} space={6}>
          <Flex
            flexDir={'row'}
            justifyContent={'space-between'}
            alignItems="center">
            <Text color="white" fontWeight={'semibold'} fontSize={'xl'}>
              {dataTitle}
            </Text>
            <Text color="white">12/12/23</Text>
          </Flex>
          <VStack space={2}>
            <Box>
              <Progress
                zIndex={100}
                bg="brand.textOff"
                _filledTrack={{
                  bg: 'brand.tertiary',
                }}
                value={75}
              />
            </Box>
            <Flex
              flexDir={'row'}
              justifyContent={'space-between'}
              alignItems="center">
              <Text color="brand.textOff">Objetivo del colectivo:</Text>
              <Text color="brand.textOff">112/200</Text>
            </Flex>
          </VStack>
          <Text color="white">{dataDes}</Text>
          <Flex
            flexDir={'row'}
            justifyContent={'space-between'}
            px={4}
            alignItems={'center'}>
            <Pressable
              flexDir={'row'}
              alignItems={'center'}
              _pressed={{opacity: 0.5}}>
              <FontAwesomeIcon icon={faHeart} color="white" />
              <Text color="white" ml={2}>
                Me gusta
              </Text>
            </Pressable>
            <Pressable
              flexDir={'row'}
              alignItems={'center'}
              _pressed={{opacity: 0.5}}>
              <FontAwesomeIcon icon={faMessage} color="white" />
              <Text color="white" ml={2}>
                Comentar
              </Text>
            </Pressable>
            <Pressable
              flexDir={'row'}
              alignItems={'center'}
              _pressed={{opacity: 0.5}}>
              <FontAwesomeIcon icon={faArrowUpFromBracket} color="white" />
              <Text color="white" ml={2}>
                Compartir
              </Text>
            </Pressable>
          </Flex>
          <Divider bg={'brand.textOff'} />
          <VStack alignItems={'center'} space={6} mb={12}>
            <Flex flexDir={'row'} justifyContent={'space-between'} w="60%">
              <Text color="brand.textOff">Precio</Text>
              <Text color="brand.textOff">Unidades</Text>
            </Flex>
            <Flex flexDir={'row'} justifyContent={'space-between'} w="60%">
              <Text color="white">$150</Text>
              <Text color="white">1 - 10</Text>
            </Flex>
            <Flex flexDir={'row'} justifyContent={'space-between'} w="60%">
              <Text color="white">$120</Text>
              <Text color="white">11 - 25</Text>
            </Flex>
            <Flex flexDir={'row'} justifyContent={'space-between'} w="60%">
              <Text color="white">$100</Text>
              <Text color="white">26+</Text>
            </Flex>
            <Button
              w="100%"
              bg={'brand.tertiary'}
              onPress={navigateToBuyHandler}
              _pressed={{opacity: 0.5, backgroundColor: '#C219ED'}}>
              COMPRAR
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </>
  );
};

export default ColectivosDetails;
