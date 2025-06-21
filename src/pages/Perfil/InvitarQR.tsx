import React from 'react';
import {Flex, StatusBar, Text, VStack, ScrollView} from 'native-base';
import {Image} from 'native-base';
import HeaderNav from '../../components/Header';
import {useAppSelector} from '../../redux/hooks';

type Props = {};

const InviteQr = (props: Props) => {
  const userProfile = useAppSelector(state => state.user.getUserProfile);
  const userQr = useAppSelector(state => state.user.getInviteQR);
  const userUrl = useAppSelector(state => state.user.getInviteURL);

  return (
    <>
      <HeaderNav title="Invitar" />
      <ScrollView bg="brand.primary">
        <StatusBar barStyle={'light-content'} />
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          h={'100%'}
          bg={'brand.primary'}>
          <ScrollView h="95%" w="85%">
            <VStack mt={12} space={9} w="100%" alignItems="center">
              <VStack space={3} alignItems="center">
                <Image
                  mb={6}
                  alt="image"
                  source={require('../../../assets/profile-image.png')}
                />
                <Text
                  color={'white'}
                  fontSize={30}
                  fontWeight="bold"
                  lineHeight={30}>
                  {userProfile?.data?.username}
                </Text>
                <Text
                  color={'brand.tertiary'}
                  fontSize={20}
                  lineHeight={20}
                  fontWeight={'bold'}>
                  {userUrl}
                </Text>
              </VStack>
              <Image
                alt="image"
                w={160}
                h={160}
                source={{uri: `data:image/png;base64,${userQr}`}}
              />
              <Text
                pb={12}
                textAlign={'justify'}
                color={'brand.textOff'}
                fontSize={15}
                fontWeight={'semibold'}>
                Tu código QR es privado. Si lo compartes con alguien, esa
                persona podría escanearlo con la cámara de su celular para
                agregar nuevos contactos a tu experiencia Barra.
              </Text>
            </VStack>
          </ScrollView>
        </Flex>
      </ScrollView>
    </>
  );
};

export default InviteQr;
