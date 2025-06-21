import React, {useEffect, useState} from 'react';
import {
  Button,
  HStack,
  Image,
  Input,
  StatusBar,
  Text,
  VStack,
} from 'native-base';
import HeaderNav from '../../components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  resetAddExp,
  getUserProfileAsync,
  postNewExpAsync,
  getAllExpAsync,
} from '../../redux/slices/userSlice';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const EditExperience = () => {
  const [name, setName] = useState<string>('');
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');

  const userProfile = useAppSelector(state => state.user.getUserProfile);
  const jwtToken = useAppSelector(state => state.user.jwtToken);

  const postNewExpLoading = useAppSelector(
    state => state.user.postNewExpLoading,
  );
  const postNewExpSuccess = useAppSelector(
    state => state.user.postNewExpSuccess,
  );
  const postNewExpError = useAppSelector(state => state.user.postNewExpError);
  const postNewExpErrorMsg = useAppSelector(
    state => state.user.postNewExpErrorMsg,
  );

  const getAllExpLoading = useAppSelector(state => state.user.getAllExpLoading);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  function addExperienceHandler() {
    const data = {
      name,
      in: from,
      out: to,
    };

    try {
      console.log(data);
      dispatch(postNewExpAsync({token: jwtToken, data}));
    } catch (e: any) {
      console.log(e);
    }
  }

  async function resetProfileData() {
    await dispatch(getAllExpAsync(jwtToken));
    dispatch(resetAddExp());

    Alert.alert('Perfil editado exitosamente ✅');

    navigation.goBack();
  }

  useEffect(() => {
    if (postNewExpSuccess) {
      resetProfileData();
    }

    if (postNewExpError) {
      Alert.alert(postNewExpErrorMsg);
      navigation.goBack();
    }
  }, [postNewExpSuccess, postNewExpError]);

  return (
    <>
      <HeaderNav title="Agregar Experiencia" />
      <StatusBar barStyle={'light-content'} />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          alignItems: 'center',
          height: '100%',
        }}
        style={{backgroundColor: '#0F101E'}}>
        <VStack space={9} w="85%" mt={12}>
          <HStack>
            {/* <Image
              alt="image"
              w={110}
              h={110}
              source={require('../../../assets/profile-image.png')}
            /> */}
            <VStack justifyContent="flex-end">
              <Text
                color={'white'}
                fontSize={25}
                fontWeight="bold"
                lineHeight={25}>
                {userProfile?.data?.username}
              </Text>
              <Text
                color={'brand.tertiary'}
                fontSize={16}
                fontWeight={'extrabold'}>
                Administrador
              </Text>
            </VStack>
          </HStack>
          <VStack space={6}>
            <Input
              variant="underlined"
              placeholder="Titulo"
              borderColor={'brand.textOff'}
              color={'brand.secondary'}
              placeholderTextColor={'brand.textOff'}
              type="text"
              size={'lg'}
              value={name}
              onChangeText={setName}
              autoCapitalize="none"
              _focus={{borderBottomColor: 'brand.accent'}}
            />
            <Input
              variant="underlined"
              placeholder="Desde"
              borderColor={'brand.textOff'}
              color={'brand.secondary'}
              placeholderTextColor={'brand.textOff'}
              type="text"
              size={'lg'}
              value={from}
              onChangeText={setFrom}
              autoCapitalize="none"
              _focus={{borderBottomColor: 'brand.accent'}}
            />
            <Input
              variant="underlined"
              placeholder="Hasta"
              borderColor={'brand.textOff'}
              color={'brand.secondary'}
              placeholderTextColor={'brand.textOff'}
              type="text"
              size={'lg'}
              value={to}
              onChangeText={setTo}
              autoCapitalize="none"
              _focus={{borderBottomColor: 'brand.accent'}}
            />
            <Button
              _pressed={{opacity: 0.5}}
              mt={6}
              onPress={addExperienceHandler}
              _loading={{bg: 'brand.teriary', opacity: 1}}
              isLoading={postNewExpLoading || getAllExpLoading}
              isLoadingText={
                postNewExpLoading ? 'GUARDANDO CAMBIOS...' : 'CARGANDO EXP...'
              }
              backgroundColor="brand.tertiary">
              GUARDAR
            </Button>
          </VStack>
        </VStack>
      </KeyboardAwareScrollView>
    </>
  );
};

export default EditExperience;
