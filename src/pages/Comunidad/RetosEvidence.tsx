import React, {useState} from 'react';
import HeaderNav from '../../components/Header';
import {Box, Button, StatusBar, TextArea, VStack} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Alert} from 'react-native';

type Props = {};

const RetosEvidence = (props: Props) => {
  const [message, setMessage] = useState<string>('');

  function sendRetoHandler() {
    if (!message) {
      Alert.alert('Por favor llena todos los campos. 🤔');
      return;
    }
  }

  return (
    <>
      <HeaderNav title="Subir Evidencia" />
      <StatusBar barStyle={'light-content'} />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          alignItems: 'center',
          height: '100%',
        }}
        style={{backgroundColor: '#0F101E'}}>
        <Box
          justifyContent={'center'}
          alignItems={'center'}
          bg="brand.textOff"
          h={230}
          w={'100%'}
          mt={6}>
          <FontAwesomeIcon icon={faCamera} size={40} color="#0F101E" />
        </Box>
        <VStack w={'85%'} pt={6} space={6}>
          <TextArea
            variant="underlined"
            placeholder="Comentarios"
            borderColor={'brand.textOff'}
            color={'brand.textOff'}
            placeholderTextColor={'brand.textOff'}
            autoCompleteType={true}
            h={110}
            size={'lg'}
            value={message}
            onChangeText={setMessage}
            autoCapitalize="none"
            _focus={{borderBottomColor: 'brand.accent'}}
          />
          <Button
            mt={6}
            w="100%"
            onPress={sendRetoHandler}
            bg={'brand.tertiary'}
            _pressed={{opacity: 0.5, backgroundColor: '#C219ED'}}>
            ENVIAR
          </Button>
        </VStack>
      </KeyboardAwareScrollView>
    </>
  );
};

export default RetosEvidence;
