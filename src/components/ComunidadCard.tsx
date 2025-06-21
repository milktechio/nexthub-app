import React from 'react';
import {
  Box,
  Divider,
  Flex,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';

type Props = {
  desc?: string;
  title: string;
  img: string;
  onPress: () => void;
  miembros?: any;
  location?: any;
};

const ComunidadCard = ({
  desc,
  title,
  img,
  onPress,
  miembros,
  location,
}: Props) => {
  return (
    <Pressable
      _pressed={{opacity: 0.5}}
      onPress={onPress}
      bg="#232532"
      h={280}
      w="47%"
      overflow={'hidden'}
      borderRadius={10}>
      <Image
        alt="communityImg"
        h="50%"
        w="100%"
        bg="#0F101E90"
        source={
          title === 'Barra'
            ? require('../../assets/logo-login.png')
            : {uri: img?.replace('http://', 'https://')}
        }
        resizeMode={title === 'Barra' ? 'contain' : 'cover'}
      />
      <VStack justifyContent={'space-between'} h="30%" p={3}>
        <Text
          color="brand.secondary"
          fontWeight={'bold'}
          numberOfLines={2}
          fontSize={16}>
          {title}
        </Text>
        <Divider h={0.2} bg="brand.textOff" my={1} />
        <Box>
          <Text color="brand.accent">
            Miembros: <Text color="brand.textOff">{miembros}</Text>
          </Text>
        </Box>
        <Box>
          <Text color="brand.accent">
            Ubicacion: <Text color="brand.textOff">{location}, Mexico</Text>
          </Text>
        </Box>
      </VStack>
    </Pressable>
  );
};

export default ComunidadCard;
