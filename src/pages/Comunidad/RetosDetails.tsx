import React from 'react';
import HeaderNav from '../../components/Header';
import {
  Divider,
  Flex,
  Image,
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
import {Alert} from 'react-native';

const RetosDetails = () => {
  const route = useRoute<RouteProp<MainNavigator, 'retosDetails'>>();
  const {title, des, image, date, id, participations} = route.params;

  const navigation = useNavigation();

  function navigateToEvidenceHandler() {
    // @ts-ignore
    // navigation.navigate('retosEvidence');
    Alert.alert(
      'coming soon... 🕐',
      '¡Muy pronto podras unirte a los eventos!',
    );
  }

  function interactionHandler() {
    Alert.alert(
      'Coming soon... 🕐',
      '¡Pronto podras dar like, comentar o compartir!',
    );
  }

  return (
    <>
      <HeaderNav title="Detalles" />
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
          source={{
            uri: image?.replace('http://', 'https://'),
          }}
          resizeMode="cover"
        />
        <VStack w={'85%'} pt={6} space={6}>
          <Flex
            flexDir={'row'}
            justifyContent={'space-between'}
            alignItems="center">
            <Text color="white" fontWeight={'semibold'} fontSize={'xl'}>
              {title}
            </Text>
            <Text color="white">{date?.slice(0, 10)}</Text>
          </Flex>
          <Text color="white">{des}</Text>
          {/* <Flex
            flexDir={'row'}
            justifyContent={'space-between'}
            px={4}
            alignItems={'center'}>
            <Pressable
              flexDir={'row'}
              alignItems={'center'}
              onPress={interactionHandler}
              _pressed={{opacity: 0.5}}>
              <FontAwesomeIcon icon={faHeart} color="white" />
              <Text color="white" ml={2}>
                Me gusta
              </Text>
            </Pressable>
            <Pressable
              flexDir={'row'}
              alignItems={'center'}
              onPress={interactionHandler}
              _pressed={{opacity: 0.5}}>
              <FontAwesomeIcon icon={faMessage} color="white" />
              <Text color="white" ml={2}>
                Comentar
              </Text>
            </Pressable>
            <Pressable
              flexDir={'row'}
              alignItems={'center'}
              onPress={interactionHandler}
              _pressed={{opacity: 0.5}}>
              <FontAwesomeIcon icon={faArrowUpFromBracket} color="white" />
              <Text color="white" ml={2}>
                Compartir
              </Text>
            </Pressable>
          </Flex> */}
          <Divider bg={'brand.textOff'} />
          <VStack alignItems={'center'} space={6} mb={12}>
            <Text color="brand.textOff">
              {participations} usuarios se han unico a este reto
            </Text>
            {/* <Button
              w="100%"
              bg={'brand.tertiary'}
              _pressed={{opacity: 0.5, backgroundColor: '#C219ED'}}
              onPress={navigateToEvidenceHandler}>
              ENTRAR AL EVENTO
            </Button> */}
          </VStack>
        </VStack>
      </ScrollView>
    </>
  );
};

export default RetosDetails;
