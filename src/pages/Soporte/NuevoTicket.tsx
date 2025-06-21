import React, { useState } from 'react';
import HeaderNav from '../../components/Header';
import {Button, TextArea, Input, VStack, StatusBar} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import { useAppDispatch } from '../../redux/hooks';

type Props = {};

const NuevoTicket = (props: Props) => {
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [topic, setTopic] = useState<string>("");

  const dispatch = useAppDispatch();

  function newTicketHandler(){
    if(!title || !type || !topic){
      // Alert.alert('Por favor llena todos los campos. 🤔');
      return;
    }
  }

  return (
    <>
      <HeaderNav title="Nuevo Ticket" />
      <StatusBar barStyle={'light-content'} />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          alignItems: 'center',
          height: '100%',
        }}
        style={{backgroundColor: '#0F101E'}}>
        <VStack space={9} w="85%">
          <VStack mt={12} space={9}>
            <Input
              w={'full'}
              variant="underlined"
              placeholder={'Titulo'}
              borderColor={'brand.textOff'}
              color={'brand.textOff'}
              placeholderTextColor={'brand.textOff'}
              size={'lg'}
              value={title}
              onChangeText={setTitle}
              autoCapitalize="none"
              _focus={{borderBottomColor: 'brand.accent'}}
            />
            <Input
              w={'full'}
              variant="underlined"
              placeholder={'Tipo de solicitud'}
              borderColor={'brand.textOff'}
              color={'brand.textOff'}
              placeholderTextColor={'brand.textOff'}
              size={'lg'}
              value={type}
              onChangeText={setType}
              autoCapitalize="none"
              _focus={{borderBottomColor: 'brand.accent'}}
            />
            <TextArea
              h={150}
              placeholder={'Asunto'}
              borderColor={'brand.textOff'}
              placeholderTextColor={'brand.textOff'}
              variant="underlined"
              autoCompleteType={true}
              value={topic}
              onChangeText={setTopic}
              size={'lg'}
              _focus={{borderBottomColor: 'brand.accent'}}
            />
          </VStack>
          <Button
            _pressed={{opacity: 0.5}}
            onPress={newTicketHandler}
            borderRadius={9}
            backgroundColor="brand.tertiary">
            ENVIAR
          </Button>
        </VStack>
      </KeyboardAwareScrollView>
    </>
  );
};

export default NuevoTicket;
