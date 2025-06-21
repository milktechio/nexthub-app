import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {
  StatusBar,
  Text,
  Button,
  Input,
  VStack,
  useNativeBase,
} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HeaderNav from '../../components/Header';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  ChangeRecoverPassAsync,
  cambiarPasswordAsync,
  logout,
  resetCambiarPass,
  resetRecoverChangePass,
} from '../../redux/slices/userSlice';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useValidateText} from '../../hooks/useValidateText';
import {MainNavigator} from '../../routes/RoutesLogin';

const CambiarContraseña = () => {
  const [pass1, setPass1] = useState<string>('');
  const [pass2, setPass2] = useState<string>('');

  const dispatch = useAppDispatch();
  const validateText = useValidateText();
  const route = useRoute<RouteProp<MainNavigator, 'changePass'>>();
  const navigation = useNavigation();

  const {
    cambiarPasswordLoading,
    cambiarPasswordSuccess,
    cambiarPasswordError,
    cambiarPasswordMsg,
    getUserProfile,
    recoverChangePasswordLoading,
    recoverChangePasswordSuccess,
    recoverChangePasswordError,
    recoverChangePasswordMsg,
    jwtToken,
  } = useAppSelector(state => state.user);

  function recoverHandler() {
    if (pass1 !== pass2) {
      Alert.alert('Las constaseñas no coinciden.');

      return;
    }

    if (!validateText('password', pass2)) return;

    const data = {
      token: route?.params?.id,
      password: pass1,
      password_confirmation: pass2,
    };

    dispatch(ChangeRecoverPassAsync(data));
  }

  function changeHandler() {
    if (pass1 !== pass2) {
      Alert.alert('Las constaseñas no coinciden.');

      return;
    }

    if (!validateText('password', pass1)) return;

    dispatch(
      cambiarPasswordAsync({
        username: getUserProfile.data.username,
        email: getUserProfile.data.email,
        password: pass2,
        token: jwtToken,
      }),
    );
  }

  useEffect(() => {
    if (cambiarPasswordSuccess) {
      Alert.alert('Exito ✅', 'Se ha cambiado su contraseña');

      dispatch(logout());
      dispatch(resetCambiarPass());
    }

    if (cambiarPasswordError) {
      Alert.alert(cambiarPasswordMsg);

      dispatch(resetCambiarPass());
      navigation.goBack();
    }
  }, [cambiarPasswordSuccess, cambiarPasswordError]);

  useEffect(() => {
    if (recoverChangePasswordSuccess) {
      Alert.alert('Exito ✅', 'Se ha cambiado su contraseña');

      dispatch(resetRecoverChangePass());
      navigation.goBack();
    }

    if (recoverChangePasswordError) {
      Alert.alert(recoverChangePasswordMsg);

      dispatch(resetRecoverChangePass());
      navigation.goBack();
    }
  }, [recoverChangePasswordSuccess, recoverChangePasswordError]);

  return (
    <>
      <HeaderNav title="Cambiar Contraseña" />
      <StatusBar barStyle={'light-content'} />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          alignItems: 'center',
          height: '100%',
        }}
        style={{backgroundColor: '#0F101E'}}>
        <VStack mt={12} space={8} w="85%">
          <Text fontSize={15} lineHeight={15} color="white">
            Ingresa tu nueva contraseña. Debe tener mínimo 8 caracteres de
            largo, una mayúscula y un número. (Sín carácteres especiales).
          </Text>
          <Input
            variant="underlined"
            placeholder={'Nueva contraseña'}
            borderColor={'brand.textOff'}
            color={'brand.secondary'}
            placeholderTextColor={'brand.textOff'}
            type="password"
            size={'lg'}
            value={pass1}
            onChangeText={setPass1}
            autoCapitalize="none"
            _focus={{borderBottomColor: 'brand.accent'}}
          />
          <Input
            variant="underlined"
            placeholder={'Confirmar contraselña'}
            borderColor={'brand.textOff'}
            color={'brand.secondary'}
            placeholderTextColor={'brand.textOff'}
            type="password"
            size={'lg'}
            value={pass2}
            onChangeText={setPass2}
            autoCapitalize="none"
            _focus={{borderBottomColor: 'brand.accent'}}
          />
          <Button
            _pressed={{opacity: 0.5}}
            mt={6}
            onPress={route?.params?.id ? recoverHandler : changeHandler}
            _loading={{bg: 'brand.teriary', opacity: 1}}
            isLoading={cambiarPasswordLoading || recoverChangePasswordLoading}
            isLoadingText={'CAMBIANDO CONTRASEÑA...'}
            backgroundColor="brand.tertiary">
            GUARDAR CAMBIOS
          </Button>
        </VStack>
      </KeyboardAwareScrollView>
    </>
  );
};

export default CambiarContraseña;
