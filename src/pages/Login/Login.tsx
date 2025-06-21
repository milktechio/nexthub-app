import React, {useEffect, useState} from 'react';
import {
  Text,
  StatusBar,
  VStack,
  Image,
  Input,
  Checkbox,
  Pressable,
  Button,
  Divider,
  Box,
  Flex,
} from 'native-base';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LoginAsync,
  getUserProfileAsync,
  logout,
} from '../../redux/slices/userSlice';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const [initialRun, setInitialRun] = useState<boolean>(true);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const isLoggedInLoading = useAppSelector(
    state => state.user.isLoggedInLoading,
  );
  const isLoggedInSuccess = useAppSelector(
    state => state.user.isLoggedInSuccess,
  );
  const isLoggedInError = useAppSelector(state => state.user.isLoggedInError);
  const isLoggedInErrorMsg = useAppSelector(
    state => state.user.isLoggedInErrorMsg,
  );

  const jwtToken = useAppSelector(state => state.user.jwtToken);

  const getUserProfileLoading = useAppSelector(
    state => state.user.getUserProfileLoading,
  );
  const getUserProfileError = useAppSelector(
    state => state.user.getUserProfileError,
  );
  const getUserProfileErrorMsg = useAppSelector(
    state => state.user.getUserProfileErrorMsg,
  );

  function navigateToSignUpHandler() {
    //@ts-ignore
    navigation.navigate('viajemosJuntos');
  }

  async function loginHandler() {
    if (!email || !password) {
      Alert.alert('Por favor ingresa un correo y contraseña validos. 🤔');
      return;
    }

    if (isTrue) {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);

      dispatch(LoginAsync({email, password}));
    }

    if (!isTrue) {
      await AsyncStorage.clear();
    }

    dispatch(LoginAsync({email, password}));
  }

  async function getCredentials() {
    try {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');

      if (email && password) {
        setEmail(email);
        setPassword(password);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getCredentials();
  }, []);

  useEffect(() => {
    if (isLoggedInError || getUserProfileError) {
      Alert.alert(isLoggedInErrorMsg || getUserProfileErrorMsg);

      dispatch(logout());
    }

    if (jwtToken && isLoggedInSuccess && initialRun) {
      setInitialRun(false);
      dispatch(getUserProfileAsync(jwtToken));
    }
  }, [
    isLoggedInError,
    jwtToken,
    getUserProfileError,
    isLoggedInSuccess,
    initialRun,
  ]);

  function forgotPasswordHandler() {
    //@ts-ignore
    navigation.navigate('reqChangePass');
  }

  return (
    <Flex height={'100%'} flex={1} bg={'brand.primary'} pt={20}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <StatusBar barStyle={'light-content'} />
        <VStack space={9} w="85%" mt={12}>
          <Image
            source={require('../../../assets/logo-login.png')}
            alt="logoImg"
            height={160}
            resizeMode="contain"
            alignSelf={'center'}
          />
          <Text color={'brand.secondary'} fontSize={'3xl'} fontWeight={'bold'}>
            Login
          </Text>
          <VStack space={6}>
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
            <Input
              InputLeftElement={
                <Image
                  source={require('../../../assets/password-lock.png')}
                  alt="Img"
                  size={5}
                  resizeMode="contain"
                  mr={2}
                />
              }
              variant="underlined"
              placeholder="Contraseña"
              borderColor={'brand.textOff'}
              color={'brand.textOff'}
              placeholderTextColor={'brand.textOff'}
              type="password"
              size={'lg'}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              _focus={{borderBottomColor: 'brand.accent'}}
            />
          </VStack>
          <Checkbox
            value="A"
            onChange={setIsTrue}
            _checked={{bg: 'brand.accent'}}
            color={'brand.accent'}
            bg={'brand.primary'}
            borderColor={'brand.textOff'}>
            <Text color={'brand.textOff'}>Recordar credenciales</Text>
          </Checkbox>
          <Button
            bg={'brand.tertiary'}
            _pressed={{opacity: 0.5, backgroundColor: 'brand.teriary'}}
            _loading={{bg: 'brand.teriary', opacity: 1}}
            isLoading={isLoggedInLoading || getUserProfileLoading}
            isLoadingText={
              isLoggedInLoading ? 'INGRESANDO...' : 'CARGANDO PERFIL...'
            }
            onPress={loginHandler}>
            INGRESAR
          </Button>
          <Divider bg={'brand.textOff'} />
          <Box alignSelf={'center'} flexDir={'row'}>
            <Text color={'brand.textOff'} mr={2}>
              ¿No tienes cuenta?
            </Text>
            <Pressable
              onPress={navigateToSignUpHandler}
              _pressed={{opacity: 0.5}}>
              <Text color={'brand.accent'}>Registrate</Text>
            </Pressable>
          </Box>
          <Pressable
            mb={12}
            mt={-6}
            _pressed={{opacity: 0.5}}
            onPress={forgotPasswordHandler}>
            <Text color={'brand.accent'} alignSelf={'center'}>
              ¿Olvidaste tu contraseña?
            </Text>
          </Pressable>
        </VStack>
      </KeyboardAwareScrollView>
    </Flex>
  );
};

export default Login;
