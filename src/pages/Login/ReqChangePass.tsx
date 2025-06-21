import {Alert, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderNav from '../../components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, Image, Input, Text, VStack} from 'native-base';
import {useValidateText} from '../../hooks/useValidateText';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  RecoverPasswordAsync,
  resetRecoverPass,
} from '../../redux/slices/userSlice';
import {useNavigation} from '@react-navigation/native';

const ReqChangePass = () => {
  const [email, setEmail] = useState<string>('');

  const recoverPasswordLoading = useAppSelector(
    state => state.user.recoverPasswordLoading,
  );
  const recoverPasswordSuccess = useAppSelector(
    state => state.user.recoverPasswordSuccess,
  );
  const recoverPasswordError = useAppSelector(
    state => state.user.recoverPasswordError,
  );
  const recoverPasswordErrorMsg = useAppSelector(
    state => state.user.recoverPasswordMsg,
  );

  const validateText = useValidateText();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  function requestHandler() {
    if (!validateText('email', email)) return;

    dispatch(RecoverPasswordAsync(email));
  }

  useEffect(() => {
    if (recoverPasswordSuccess) {
      Alert.alert(
        '¡Correo enviado con éxito! ✅',
        'Por favor sigue la liga que te hemos enviado.',
      );
      dispatch(resetRecoverPass());
      navigation.goBack();
    }

    if (recoverPasswordError) {
      Alert.alert(recoverPasswordErrorMsg);
      dispatch(resetRecoverPass());
      navigation.goBack();
    }
  }, [recoverPasswordError, recoverPasswordSuccess]);

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
        <VStack space={9} w="85%" mt={12}>
          <Text color="brand.textOff" textAlign={'justify'}>
            Si haz olvidado tu contraseña, aqui podras solicitar un cambio de
            contraseña. Por favor ingresa el correo de tu cuenta registrada.
          </Text>
          <Input
            InputLeftElement={
              <Image
                source={require('../../../assets/email.png')}
                alt="Img"
                size={5}
                resizeMode="contain"
                mr={2}
              />
            }
            variant="underlined"
            placeholder="Correo"
            borderColor={'brand.textOff'}
            color={'brand.textOff'}
            placeholderTextColor={'brand.textOff'}
            type="text"
            size={'lg'}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            _focus={{borderBottomColor: 'brand.accent'}}
          />
          <Button
            bg={'brand.tertiary'}
            _pressed={{opacity: 0.5, backgroundColor: 'brand.teriary'}}
            _loading={{bg: 'brand.teriary', opacity: 1}}
            isLoading={recoverPasswordLoading}
            isLoadingText={'CARGANDO...'}
            onPress={requestHandler}>
            ENVIAR CORREO
          </Button>
        </VStack>
      </KeyboardAwareScrollView>
    </>
  );
};

export default ReqChangePass;
