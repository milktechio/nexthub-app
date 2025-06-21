import React, {useState} from 'react';
import {
  Box,
  Divider,
  Flex,
  Image,
  Pressable,
  Progress,
  Text,
  VStack,
} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowUpFromBracket,
  faCartShopping,
  faCheck,
  faHeart,
  faMessage,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

type Props = {
  type: 'colectivos' | 'votaciones' | 'retos';
  title: string;
  des: string;
  image: string;
  id: string;
  date: string;
  options?: string[];
  minimum?: number;
  participations?: number;
};

const ItemCard = ({
  type,
  title,
  des,
  image,
  date,
  id,
  minimum,
  options,
  participations,
}: Props) => {
  const navigation = useNavigation();

  function navigateToDetailsHandler() {
    if (type === 'votaciones') {
      // @ts-ignore
      navigation.navigate('votacionesDetails', {
        title,
        des,
        image,
        id,
        date,
        options,
        minimum,
        participations,
      });
    }

    if (type === 'colectivos') {
      // @ts-ignore
      navigation.navigate('colectivosDetails', {title, des, image, id});
    }

    if (type === 'retos') {
      // @ts-ignore
      navigation.navigate('retosDetails', {
        title,
        des,
        image,
        id,
        date,
        participations,
      });
    }
  }

  function interactionHandler() {
    Alert.alert(
      'Coming soon... 🕐',
      '¡Pronto podras dar like, comentar o compartir!',
    );
  }

  return (
    <Box
      bg={'#232532'}
      h={220}
      mb={6}
      borderRadius={10}
      w={'100%'}
      position={'relative'}
      overflow={'hidden'}>
      {/* {type === 'votaciones' && (
        <Box
          position={'absolute'}
          right={5}
          top={5}
          bg="brand.accent"
          zIndex={10}
          px={2}
          py={1}
          flexDir={'row'}
          alignItems={'center'}
          borderRadius={5}>
          <Text color="white" mr={2} fontSize={12}>
            Votaste
          </Text>
          <FontAwesomeIcon icon={faThumbsUp} color="white" size={12} />
        </Box>
      {type === 'retos' && (
        <Box
          position={'absolute'}
          right={5}
          top={5}
          bg="brand.accent"
          zIndex={10}
          px={2}
          py={1}
          flexDir={'row'}
          alignItems={'center'}
          borderRadius={5}>
          <Text color="white" mr={2} fontSize={12}>
            Completado
          </Text>
          <FontAwesomeIcon icon={faCheck} color="white" size={12} />
        </Box>
      )}
      {type === 'colectivos' && (
        <Box
          position={'absolute'}
          right={5}
          top={5}
          bg="brand.accent"
          zIndex={10}
          px={2}
          py={1}
          flexDir={'row'}
          alignItems={'center'}
          borderRadius={5}>
          <Text color="white" mr={2} fontSize={12}>
            Compraste
          </Text>
          <FontAwesomeIcon icon={faCartShopping} color="white" size={12} />
        </Box>
      )} */}
      <VStack h="100%" justifyContent={'center'}>
        <Pressable
          h={'55%'}
          _pressed={{opacity: 0.5}}
          onPress={navigateToDetailsHandler}>
          <Image
            alt="Img"
            h={'100%'}
            bg={'#0F101E90'}
            source={{
              uri: image?.replace('http://', 'https://'),
            }}
            resizeMode="cover"
            zIndex={1000}
          />
        </Pressable>
        <VStack h={'50%'} space={4} justifyContent={'center'}>
          <Flex
            flexDir={'row'}
            justifyContent={'space-between'}
            alignItems="center"
            px={3}>
            <Text color="white" fontWeight={'semibold'} fontSize={'xl'}>
              {title}
            </Text>
            <Text color="white">{date.slice(0, 10)}</Text>
          </Flex>
          {type === 'votaciones' && (
            <VStack space={2}>
              <Box px={3}>
                <Progress
                  zIndex={100}
                  bg="brand.primary"
                  _filledTrack={{
                    bg: 'brand.tertiary',
                  }}
                  value={(participations! / minimum!) * 100}
                />
              </Box>
              <Flex
                flexDir={'row'}
                justifyContent={'space-between'}
                alignItems="center"
                px={3}>
                <Text color="brand.textOff">Objetivo de la votación:</Text>
                <Text color="brand.textOff">
                  {participations}/{minimum}
                </Text>
              </Flex>
            </VStack>
          )}
          {type === 'colectivos' && (
            <VStack space={2}>
              <Box px={3}>
                <Progress
                  zIndex={100}
                  bg="brand.primary"
                  _filledTrack={{
                    bg: 'brand.tertiary',
                  }}
                  value={(participations! / minimum!) * 100}
                />
              </Box>
              <Flex
                flexDir={'row'}
                justifyContent={'space-between'}
                alignItems="center"
                px={3}>
                <Text color="brand.textOff">Objetivo del colectivo:</Text>
                <Text color="brand.textOff">130/200</Text>
              </Flex>
            </VStack>
          )}
          {type === 'retos' && (
            <Text px={3} numberOfLines={2} color="brand.textOff">
              {des}
            </Text>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

export default ItemCard;
