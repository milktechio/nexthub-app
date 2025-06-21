import React from 'react';
import {Box, Button, Image, Pressable, Text, VStack} from 'native-base';

import {useNavigation} from '@react-navigation/native';

type Props = {
  title: string;
  des: string;
  image: any;
  id: string;
};

const NoticiasItem = ({title, des, image, id}: Props) => {
  const navigation = useNavigation();

  function navigateToSingleView() {
    // @ts-ignore
    navigation.navigate('noticiasSingleView', {title, des, image, id});
  }

  return (
    <Box
      bg={'#232532'}
      h={360}
      pb={6}
      mb={6}
      borderRadius={10}
      w={'100%'}
      overflow={'hidden'}>
      <VStack h="100%">
        <Pressable h={'40%'}>
          <Image
            alt="Img"
            h={'100%'}
            source={{uri: image.replace('http://', 'https://')}}
            resizeMode="cover"
          />
        </Pressable>
        <VStack h={'60%'} w={'100%'} justifyContent={'space-between'} space={3}>
          <Box pt={3}>
            <Text
              color="white"
              fontWeight={'semibold'}
              fontSize={'xl'}
              w={'85%'}
              alignSelf={'center'}
              numberOfLines={2}>
              {title}
            </Text>
            <Text
              color="brand.textOff"
              numberOfLines={2}
              w={'85%'}
              alignSelf={'center'}>
              {des}
            </Text>
          </Box>
          <Button
            w={'85%'}
            alignSelf={'center'}
            bg={'brand.tertiary'}
            _pressed={{opacity: 0.5, backgroundColor: 'brand.teriary'}}
            onPress={navigateToSingleView}>
            VER NOTICIA
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default NoticiasItem;
