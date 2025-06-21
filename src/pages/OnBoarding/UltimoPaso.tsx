import React, {useState} from 'react';
import {
  Flex,
  StatusBar,
  Text,
  Button,
  Image,
  VStack,
  Input,
  ScrollView,
} from 'native-base';
import HeaderNav from '../../components/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Alert} from 'react-native';
import {useValidateText} from '../../hooks/useValidateText';

const UltimoPaso = () => {
  const [pass, setPass] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');

  const validateText = useValidateText();

  const navigation = useNavigation();
  const route = useRoute();

  const paramsData = route.params;

  function navigateToAcceptTermsHandler(data: {}) {
    //@ts-ignore
    navigation.navigate('acceptTerms', data);
  }

  function passHandler() {
    if (!validateText('password', pass)) return;

    if (!pass || !confirmPass) {
      Alert.alert('Por favor llena todos los campos. 🤔');
      return;
    }

    if (pass !== confirmPass) {
      Alert.alert('Las contraseñas no coinciden.');
      return;
    }

    const newData = {
      ...paramsData,
      password: confirmPass,
      password_confirmation: confirmPass,
    };

    navigateToAcceptTermsHandler(newData);
  }

  return (
    <Flex height={'100%'} flex={1} bg={'brand.primary'}>
      <StatusBar barStyle={'light-content'} />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <VStack space={3} w="85%" mt={12}>
          <Image
            mt={12}
            alignSelf="center"
            alt="image"
            w="40%"
            h={160}
            source={require('../../../assets/candado.png')}
          />
          <Image
            h={120}
            ml={-6}
            mt={-3}
            alt="image"
            source={require('../../../assets/ultimo-paso.png')}
          />
          <VStack>
            <Text fontSize={16} color="brand.secondary">
              Protege tu cuenta de intrusos:
            </Text>
            <Text fontSize={16} color="brand.secondary">
              1. Al menos 8 caracteres.
            </Text>
            <Text fontSize={16} color="brand.secondary">
              2. 1 ó mas mayúsculas.
            </Text>
            <Text fontSize={16} color="brand.secondary">
              3. Sin símbolos.
            </Text>
          </VStack>
          <VStack space={6}>
            <Input
              w={'full'}
              variant="underlined"
              placeholder="Contraseña"
              borderColor={'brand.textOff'}
              color={'brand.textOff'}
              placeholderTextColor={'brand.textOff'}
              type="password"
              size={'lg'}
              value={pass}
              onChangeText={setPass}
              autoCapitalize="none"
              _focus={{borderBottomColor: 'brand.accent'}}
            />
            <Input
              w={'full'}
              variant="underlined"
              placeholder="Repetir contraseña"
              borderColor={'brand.textOff'}
              color={'brand.textOff'}
              placeholderTextColor={'brand.textOff'}
              type="password"
              size={'lg'}
              value={confirmPass}
              onChangeText={setConfirmPass}
              autoCapitalize="none"
              _focus={{borderBottomColor: 'brand.accent'}}
            />
            <Button
              mb={12}
              bg="brand.tertiary"
              _pressed={{opacity: 0.5, backgroundColor: '#C219ED'}}
              onPress={passHandler}>
              CONTINUAR
            </Button>
          </VStack>
        </VStack>
      </KeyboardAwareScrollView>
    </Flex>
  );
};

export default UltimoPaso;
