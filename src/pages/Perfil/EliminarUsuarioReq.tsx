import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {
  StatusBar,
  Text,
  Button,
  Input,
  VStack,
  ScrollView,
  Flex,
} from 'native-base';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  deleteAccountReqAsync,
  resetDeleteAccountReq,
  resetDeleteAccount
} from '../../redux/slices/userSlice';
import HeaderNav from '../../components/Header';
import {useNavigation} from '@react-navigation/native';

const EliminarUsuarioReq = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.user.jwtToken);
  const {
    deleteAccountReqLoading,
    deleteAccountReqSuccess,
    deleteAccountReqError,
  } = useAppSelector(state => state.user);

  function deleteHandler() {
    dispatch(deleteAccountReqAsync(token));
  }

  useEffect(() => {
    if (deleteAccountReqSuccess) {
      dispatch(resetDeleteAccountReq());
      //@ts-ignore
      navigation.navigate('deleteUser');
    }

    if (deleteAccountReqError) {
      dispatch(resetDeleteAccountReq());
      Alert.alert('Error ❌', 'Intente de nuevo');
      navigation.goBack();
    }
  }, [deleteAccountReqSuccess, deleteAccountReqError]);

  return (
    <>
      <HeaderNav title="Eliminar Cuenta" />
      <StatusBar barStyle={'light-content'} />
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        h={'100%'}
        bg={'brand.primary'}>
        <ScrollView mt={12} h="95%" w="85%">
          <VStack mt={3} space={8}>
            <Text fontSize={15} lineHeight={15} color="white">
              ¿Estás seguro? Su cuenta y datos ya no podrán ser recuperados ⚠️
            </Text>
            <Button
              _pressed={{opacity: 0.5}}
              mt={6}
              onPress={deleteHandler}
              _loading={{bg: 'brand.teriary', opacity: 1}}
              isLoading={deleteAccountReqLoading}
              isLoadingText={'GENERANDO CODIGO...'}
              backgroundColor="brand.tertiary">
              CONTINUAR
            </Button>
          </VStack>
        </ScrollView>
      </Flex>
    </>
  );
};

export default EliminarUsuarioReq;
