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
  deleteAccountAsync,
  logout,
  resetDeleteAccount,
  resetDeleteAccountReq,
} from '../../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderNav from '../../components/Header';
import {useNavigation} from '@react-navigation/native';

const EliminarUsuario = () => {
  const dispatch = useAppDispatch();
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const token = useAppSelector(state => state.user.jwtToken);
  const {deleteAccountLoading, deleteAccountSuccess, deleteAccountError} =
    useAppSelector(state => state.user);

  function deleteHandler() {
    if (!code) {
      Alert.alert('Por favor llena todos los datos.');
      return;
    }

    const data = {
      token: token,
      password: code,
    };

    dispatch(deleteAccountAsync(data));
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function logoutHandler() {
    Alert.alert('Exito ✅', 'Su cuenta ha sido borrada correctamente.');

    dispatch(resetDeleteAccount());
    dispatch(logout());
  }

  useEffect(() => {
    if (deleteAccountSuccess) {
      logoutHandler();
    }

    if (deleteAccountError) {
      Alert.alert('Error ❌', 'Intente de nuevo');
      navigation.goBack();
      dispatch(resetDeleteAccount());
    }
  }, [deleteAccountError, deleteAccountSuccess]);

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
              Ingrese el código que le fue enviado a su correo (13 carácteres).
            </Text>
            <Input
              type="text"
              variant="underlined"
              placeholder={'Ingrese su código'}
              borderColor={'brand.textOff'}
              color={'brand.secondary'}
              placeholderTextColor={'brand.textOff'}
              size={'lg'}
              value={code}
              onChangeText={setCode}
              autoCapitalize="none"
              _focus={{borderBottomColor: 'brand.accent'}}
            />
            <Button
              _pressed={{opacity: 0.5}}
              mt={6}
              onPress={deleteHandler}
              _loading={{bg: 'brand.teriary', opacity: 1}}
              isLoading={deleteAccountLoading}
              isLoadingText={'ELIMINANDO CUENTA...'}
              backgroundColor="brand.tertiary">
              ELIMINAR MI CUENTA
            </Button>
            <Button
              _pressed={{opacity: 0.5}}
              _text={{color: 'brand.accent'}}
              onPress={cancelHandler}
              _loading={{bg: 'brand.accent', opacity: 1}}
              isLoading={loading}
              isLoadingText={'CANCELANDO...'}
              backgroundColor="brand.primary">
              CANCELAR
            </Button>
          </VStack>
        </ScrollView>
      </Flex>
    </>
  );
};

export default EliminarUsuario;
