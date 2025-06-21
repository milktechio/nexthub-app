import React, {useEffect, useState} from 'react';
import HeaderNav from '../../components/Header';
import {
  Box,
  Button,
  Flex,
  Input,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMessage, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {Alert, KeyboardAvoidingView, Platform} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useValidateText} from '../../hooks/useValidateText';

interface MessageProps {
  msg: string;
}

const User = ({msg}: MessageProps) => {
  return (
    <Box
      bg={'brand.textOff'}
      w="70%"
      alignSelf={'flex-end'}
      p={3}
      borderTopRightRadius={12}
      borderTopLeftRadius={12}
      borderBottomLeftRadius={12}
      mb={6}>
      <Text color="white">{msg}</Text>
    </Box>
  );
};

const Bot = ({msg}: MessageProps) => {
  return (
    <Box
      bg={'brand.tertiary'}
      w="70%"
      p={3}
      borderTopLeftRadius={12}
      borderTopRightRadius={12}
      borderBottomRightRadius={12}
      mb={6}>
      <Text color="white">{msg}</Text>
    </Box>
  );
};

const Chat = () => {
  const [currentData, setCurrentData] = useState<string>('');
  const [step, setStep] = useState<number>(0);

  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const navigation = useNavigation();

  function lastStepHandler() {
    const data = {
      username,
      name,
      lastname,
      email,
    };

    //@ts-ignore
    navigation.navigate('ultimoPaso', data);
  }

  const withSpringConfig = {
    mass: 1.8,
    damping: 18,
    stiffness: 90,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
  };

  const botXValue1 = useSharedValue(-300);
  const botXValue2 = useSharedValue(-300);
  const botXValue3 = useSharedValue(-300);
  const botXValue4 = useSharedValue(-300);
  const botXValue5 = useSharedValue(-300);
  const botXValue6 = useSharedValue(-300);
  const botXValue7 = useSharedValue(-300);
  const botXValue8 = useSharedValue(-500);

  const botAnimatedStyles1 = useAnimatedStyle(() => ({
    transform: [{translateX: botXValue1.value}],
  }));
  const botAnimatedStyles2 = useAnimatedStyle(() => ({
    transform: [{translateX: botXValue2.value}],
  }));
  const botAnimatedStyles3 = useAnimatedStyle(() => ({
    transform: [{translateX: botXValue3.value}],
  }));
  const botAnimatedStyles4 = useAnimatedStyle(() => ({
    transform: [{translateX: botXValue4.value}],
  }));
  const botAnimatedStyles5 = useAnimatedStyle(() => ({
    transform: [{translateX: botXValue5.value}],
  }));
  const botAnimatedStyles6 = useAnimatedStyle(() => ({
    transform: [{translateX: botXValue6.value}],
  }));
  const botAnimatedStyles7 = useAnimatedStyle(() => ({
    transform: [{translateX: botXValue7.value}],
  }));
  const botAnimatedStyles8 = useAnimatedStyle(() => ({
    transform: [{translateX: botXValue8.value}],
  }));

  const validateText = useValidateText();

  function setCurrentDataHandler() {
    if (!currentData) return;

    const text = currentData.trim();

    if (step === 2) {
      if (!validateText('username', text)) return;

      setUsername(text);
      setStep(3);
      setCurrentData('');
      setTimeout(() => {
        botXValue3.value = withSpring(0, withSpringConfig);
      }, 800);
    }

    if (step === 3) {
      if (!validateText('name', text)) return;

      setName(text);
      setStep(4);
      setCurrentData('');
      setTimeout(() => {
        botXValue4.value = withSpring(0, withSpringConfig);
      }, 800);
    }

    if (step === 4) {
      if (!validateText('name', text)) return;

      setLastname(text);
      setStep(5);
      setCurrentData('');
      setTimeout(() => {
        botXValue5.value = withSpring(0, withSpringConfig);
        botXValue6.value = withDelay(500, withSpring(0, withSpringConfig));
      }, 800);
    }

    if (step === 5) {
      if (!validateText('email', text)) return;

      setEmail(text);
      setStep(6);
      setCurrentData('');
      setTimeout(() => {
        botXValue7.value = withSpring(0, withSpringConfig);
        botXValue8.value = withDelay(500, withSpring(0, withSpringConfig));
      }, 800);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setStep(1);
      botXValue1.value = withSpring(0, withSpringConfig);
    }, 500);
    setTimeout(() => {
      setStep(2);
      botXValue2.value = withSpring(0, withSpringConfig);
    }, 1500);
  }, []);

  return (
    <>
      <HeaderNav title="" />
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        ref={ref => {
          //@ts-ignore
          this.scrollView = ref;
        }}
        onContentSizeChange={() => {
          //@ts-ignore
          this.scrollView.scrollToEnd();
        }}
        style={{backgroundColor: '#0F101E'}}
        contentContainerStyle={{alignItems: 'center'}}>
        <Flex h="85%" mt={6} w={'85%'}>
          {step >= 1 && (
            <Animated.View style={[botAnimatedStyles1]}>
              <Bot msg="¡Hola! Bienvenid@ 👋🏼 Vamos a requerir algunos datos tuyos para crear tu cuenta." />
            </Animated.View>
          )}
          {step >= 2 && (
            <Animated.View style={[botAnimatedStyles2]}>
              <Bot msg="¿Con que NOMBRE DE USUARIO te gustaria que te relacionaran? (ej. Usuario369) " />
            </Animated.View>
          )}
          {step >= 3 && (
            <>
              <User msg={username} />
              <Animated.View style={[botAnimatedStyles3]}>
                <Bot
                  msg={`¡Genial, ${username}! Ahora por favor dános tu NOMBRE.`}
                />
              </Animated.View>
            </>
          )}
          {step >= 4 && (
            <>
              <User msg={name} />
              <Animated.View style={[botAnimatedStyles4]}>
                <Bot msg="¿Y cúal es tu APELLIDO?" />
              </Animated.View>
            </>
          )}
          {step >= 5 && (
            <>
              <User msg={lastname} />
              <Animated.View style={[botAnimatedStyles5]}>
                <Bot msg={`Muchas gracias, ${name}.`} />
              </Animated.View>
              <Animated.View style={[botAnimatedStyles6]}>
                <Bot msg="¿Cúal es tu CORREO ELECTRONICO? (ej. nombre@gmail.com)" />
              </Animated.View>
            </>
          )}
          {step >= 6 && (
            <>
              <User msg={email} />
              <Animated.View style={[botAnimatedStyles7]}>
                <Bot msg="Es todo por nuestra parte. El siguente paso es crear una contraseña y aceptar los terminos y condiciones. Despues, estarás list@ para usar nuestra app. 😎" />
              </Animated.View>
              <Animated.View style={[botAnimatedStyles8]}>
                <Button
                  bg={'brand.accent'}
                  mb={12}
                  _pressed={{opacity: 0.5, backgroundColor: '#1594DB'}}
                  onPress={lastStepHandler}>
                  PRESIONA PARA CONTINUAR
                </Button>
              </Animated.View>
            </>
          )}
        </Flex>
      </ScrollView>
      <KeyboardAvoidingView
        keyboardVerticalOffset={20}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{backgroundColor: '#0F101E'}}>
        <Flex
          h="15%"
          w={'100%'}
          bg="brand.primary"
          alignItems={'center'}
          px={6}>
          <Input
            InputLeftElement={
              <FontAwesomeIcon
                icon={faMessage}
                color="#656997"
                style={{marginRight: 9}}
              />
            }
            variant="underlined"
            placeholder="Escribe aqui..."
            borderColor={'brand.textOff'}
            color={'brand.textOff'}
            placeholderTextColor={'brand.textOff'}
            type="text"
            size={'lg'}
            value={currentData}
            onChangeText={setCurrentData}
            _focus={{borderBottomColor: 'brand.accent'}}
          />
          <Pressable
            flexDir={'row'}
            mt={3}
            alignSelf={'flex-end'}
            h={12}
            w={100}
            justifyContent={'flex-end'}
            alignItems={'center'}
            onPress={setCurrentDataHandler}
            _pressed={{opacity: 0.5}}>
            <Text color="brand.accent" mr={2} fontSize={16}>
              ENVIAR
            </Text>
            <FontAwesomeIcon icon={faPaperPlane} color="#1594DB" />
          </Pressable>
        </Flex>
      </KeyboardAvoidingView>
    </>
  );
};

export default Chat;
