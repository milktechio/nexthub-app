import React from 'react';
import {Box, Button, HStack, Image, Pressable, Text, VStack} from 'native-base';

import {useNavigation} from '@react-navigation/native';

type Props = {
  title: string;
  des: string;
  image: any;
  id: string;
  location?: string;
  date?: string;
};

const CommunityEventCard = ({title, des, image, id, location, date}: Props) => {
  const navigation = useNavigation();

  function navigateToSingleView() {
    // @ts-ignore
    navigation.navigate('noticiasSingleView', {
      title,
      des,
      image,
      id,
      location,
      date,
    });
  }

  return (
    <Box
      bg={'#232532'}
      h={200}
      mt={6}
      borderRadius={10}
      w={'100%'}
      overflow={'hidden'}>
      <VStack h="100%" justifyContent={'center'}>
        <Image
          alt="Img"
          h={'50%'}
          source={{uri: image.replace('http://', 'https://')}}
          resizeMode="cover"
        />
        <VStack h={'50%'} w={'100%'} justifyContent={'center'} space={3}>
          <HStack justifyContent={'space-between'} px={6}>
            <Box height="100%" w={'60%'}>
              <Text
                color="white"
                fontWeight={'semibold'}
                fontSize={'xl'}
                numberOfLines={2}>
                {title}
              </Text>
              <Text color="brand.textOff" numberOfLines={2}>
                {des}
              </Text>
            </Box>
            <Button
              variant={'ghost'}
              _pressed={{opacity: 0.5, backgroundColor: 'brand.teriary'}}
              onPress={navigateToSingleView}>
              <Text color="brand.accent" fontWeight={'semibold'} fontSize={12}>
                VER MAS
              </Text>
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default CommunityEventCard;
