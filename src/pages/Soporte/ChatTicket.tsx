import React from 'react';
import HeaderNav from '../../components/Header';
import {
  Box,
  Flex,
  Input,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMessage, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface MessageProps {
  msg: string;
}

const Question = ({msg}: MessageProps) => {
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

const Answer = ({msg}: MessageProps) => {
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

const ChatTicket = () => {
  return (
    <>
      <HeaderNav title="" />
      <StatusBar barStyle={'light-content'} />
      <KeyboardAwareScrollView
        extraHeight={170}
        scrollEnabled={false}
        style={{backgroundColor: '#0F101E'}}
        contentContainerStyle={{alignItems: 'center', height: '100%'}}>
        <Flex w="85%" h="100%">
          <ScrollView
            h="85%"
            pt={6}
            mb={6}
            showsVerticalScrollIndicator={false}>
            <Answer msg="¡Hola! Gracias por contactar soporte Barra. En unos minutos un agente se pondra en contacto para apoyarte. 🕐" />
            <Answer msg="Por lo mientras, cuantanos, ¿Cúal es tu duda?" />
            <Question msg="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ipsum quasi modi at facere itaque eum, enim quidem voluptatum odit autem, minima, reiciendis eius sunt aut error illo veniam." />
          </ScrollView>
          <Flex h="15%">
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
              //   value={email}
              //   onChangeText={setEmail}
              autoCapitalize="none"
              _focus={{borderBottomColor: 'brand.accent'}}
            />
            <Pressable
              flexDir={'row'}
              mt={6}
              alignSelf={'flex-end'}
              _pressed={{opacity: 0.5}}>
              <Text color="brand.accent" mr={2}>
                ENVIAR
              </Text>
              <FontAwesomeIcon icon={faPaperPlane} color="#1594DB" />
            </Pressable>
          </Flex>
        </Flex>
      </KeyboardAwareScrollView>
    </>
  );
};

export default ChatTicket;
