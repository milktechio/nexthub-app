import React from 'react';
import {Flex, StatusBar, Text, VStack} from 'native-base';
import {Image} from 'react-native';

type Props = {};

const LoadingView = (props: Props) => {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        h={'100%'}
        bg={'brand.primary'}>
        <VStack space={9} w="85%">
          <Image source={require('../../assets/LoadingView_logo.png')} />
        </VStack>
      </Flex>
    </>
  );
};

export default LoadingView;
