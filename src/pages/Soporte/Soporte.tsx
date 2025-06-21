import React from 'react';
import HeaderNav from '../../components/Header';
import {
  Flex,
  Button,
  Image,
  Text,
  VStack,
  StatusBar,
  ScrollView,
} from 'native-base';
import TicketList from '../../components/TicketItem';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const data = [
  {
    title: 'Titulo ticket',
    date: '19/05/2023',
    status: 'Abierto',
  },
  {
    title: 'Titulo ticket',
    date: '19/05/2023',
    status: 'Abierto',
  },
  {
    title: 'Titulo ticket',
    date: '19/05/2023',
    status: 'Resuelto',
  },
];

const Soporte = (props: Props) => {
  const navigation = useNavigation();

  function navigateToNewTicketHandler() {
    //@ts-ignore
    navigation.navigate('newTicket');
  }

  return (
    <>
      <HeaderNav title="Soporte" />
      <StatusBar barStyle={'light-content'} />
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        h={'100%'}
        bg={'brand.primary'}>
        <ScrollView h="100%" w="85%">
          <VStack w="100%">
            <Text
              color={'white'}
              bg={'brand.primary'}
              mt={6}
              mb={9}
              fontSize={'3xl'}
              fontWeight={'semibold'}>
              Tickets
            </Text>
            <TicketList data={data} />
            <Button
              onPress={navigateToNewTicketHandler}
              _pressed={{opacity: 0.5}}
              py={4}
              borderWidth={1}
              borderColor="brand.tertiary"
              borderStyle={'dashed'}
              borderRadius={6}
              backgroundColor="transparent">
              <Image
                alt="image"
                source={require('../../../assets/icons/plus.png')}
              />
            </Button>
          </VStack>
        </ScrollView>
      </Flex>
    </>
  );
};

export default Soporte;
