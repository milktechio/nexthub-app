import React from 'react';
import {Box, Divider, Flex, Image, Pressable, Text, VStack} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowUpFromBracket,
  faHeart,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

type Props = {
  title: string;
  des: string;
  image: string;
  id: string;
};

const NoticiasCard = ({title, des, image, id}: Props) => {
  const navigation = useNavigation();

  function navigateToSingleView() {
    // @ts-ignore
    navigation.navigate('noticiasSingleView', {
      title,
      des,
      image,
      id,
    });
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
      h={230}
      mb={6}
      borderRadius={10}
      w={'100%'}
      overflow={'hidden'}>
      <VStack h="100%" justifyContent={'center'}>
        <Pressable
          h={'50%'}
          _pressed={{opacity: 0.5}}
          onPress={navigateToSingleView}>
          <Image
            alt="Img"
            h={'100%'}
            source={{uri: image.replace('http://', 'https://')}}
            resizeMode="cover"
            zIndex={1000}
          />
        </Pressable>
        <VStack h={'50%'} space={1} justifyContent={'center'}>
          <Flex
            flexDir={'row'}
            justifyContent={'space-between'}
            alignItems="center"
            px={6}>
            <Text
              color="white"
              fontWeight={'semibold'}
              fontSize={'2xl'}
              numberOfLines={1}>
              {title}
            </Text>
          </Flex>
          <VStack space={3}>
            <Box px={6}>
              <Text color="brand.textOff" numberOfLines={2} fontSize={'lg'}>
                {des}
              </Text>
            </Box>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default NoticiasCard;
