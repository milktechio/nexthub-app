import React, {useState} from 'react';
import HeaderNav from '../../components/Header';
import {Flex, Image, StatusBar, VStack, Text, Input, Button} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHashtag} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Alert} from 'react-native';

const ColectivoBuy = () => {
  const [amount, setAmount] = useState<string>('');

  const navigation = useNavigation();

  function navigateToSuccessHandler() {
    if (!amount) {
      Alert.alert('Por favor llena todos los campos. 🤔');
      return;
    }

    // @ts-ignore
    navigation.navigate('colectivoSuccess');
  }

  return (
    <>
      <HeaderNav title="Colectivo" />
      <StatusBar barStyle={'light-content'} />
      <KeyboardAwareScrollView
        extraHeight={285}
        contentContainerStyle={{
          alignItems: 'center',
          height: '100%',
        }}
        style={{backgroundColor: '#0F101E'}}>
        <Image alt="img" bg="brand.textOff" h={230} w={'100%'} mt={6} />
        <VStack w={'85%'} pt={6} space={6}>
          <Flex
            flexDir={'row'}
            justifyContent={'space-between'}
            alignItems="center">
            <Text color="white" fontWeight={'semibold'} fontSize={'xl'}>
              Este es un titulo
            </Text>
            <Text color="white">12/12/23</Text>
          </Flex>
          <VStack space={12} mt={6}>
            <Text color="brand.textOff" textAlign={'center'} fontSize={'md'}>
              Precio unitario: $150
            </Text>
            <Input
              InputLeftElement={
                <FontAwesomeIcon
                  icon={faHashtag}
                  color="#656997"
                  size={16}
                  style={{marginRight: 10}}
                />
              }
              variant="underlined"
              placeholder="Cantidad"
              borderColor={'brand.textOff'}
              color={'brand.textOff'}
              placeholderTextColor={'brand.textOff'}
              type="text"
              size={'lg'}
              value={amount}
              onChangeText={setAmount}
              autoCapitalize="none"
              _focus={{borderBottomColor: 'brand.accent'}}
            />
            <Flex flexDir={'row'} w="100%" justifyContent={'space-between'}>
              <Text color="white" fontSize={'lg'}>
                Entrega estimada --
              </Text>
              <Text
                color="brand.accent"
                fontWeight={'semibold'}
                fontSize={'lg'}>
                Total 240$
              </Text>
            </Flex>
            <Button
              w="100%"
              bg={'brand.tertiary'}
              _pressed={{opacity: 0.5, backgroundColor: '#C219ED'}}
              onPress={navigateToSuccessHandler}>
              SIGUIENTE
            </Button>
          </VStack>
        </VStack>
      </KeyboardAwareScrollView>
    </>
  );
};

export default ColectivoBuy;
