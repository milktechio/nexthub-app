import {Alert, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderNav from '../../components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Pressable,
  Image,
  Flex,
  TextArea,
} from 'native-base';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import {launchImageLibrary} from 'react-native-image-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  createClubAsync,
  getMyClubsAsync,
  resetPostClub,
} from '../../redux/slices/communitySlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {useNavigation} from '@react-navigation/native';

const NewCommunity = () => {
  //states para la data
  const [photo, setPhoto] = useState<any>(null);
  const [imageBack, setImageBack] = useState<any>(null);
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [city, setCity] = useState<string>('');

  //data del back
  const token = useAppSelector(state => state.user.jwtToken);
  const {postClubLoading, postClubSuccess, postClubError, postClubMsg} =
    useAppSelector(state => state.community);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // Alert.alert(
  //   'Crear comunidad',
  //   '¿Quieres comenzar una nueva comunidad? Este será el primer paso.',
  // );

  //cargar foto y mostrar en la interfaz
  async function uploadPhotoHandler() {
    const optionsGallery = {
      title: 'Select Image',
      type: 'library',
      maxHeight: 1000,
      maxWidth: 700,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };

    try {
      //@ts-ignore
      const response = await launchImageLibrary(optionsGallery);

      // @ts-ignore
      if (!response?.assets[0]) return;

      // @ts-ignore
      const image = response?.assets[0];

      const fData = new FormData();
      fData.append('image', {
        uri: image?.uri,
        type: image?.type,
        name: image?.fileName,
      });

      setPhoto(image?.uri);
      //@ts-ignore
      setImageBack(fData._parts[0][1]);
    } catch (e: any) {
      console.log(e);
    }
  }

  //subir foto
  const uploadHandler = () => {
    if (!name || !desc || !imageBack || !city) {
      Alert.alert(
        '¡Datos incompletos!',
        'Por favor, revisa que todos los campos esten llenos',
      );
      return;
    }

    dispatch(
      createClubAsync({
        token: token,
        name: name,
        description: desc,
        image: imageBack,
        city: city,
      }),
    );
  };

  useEffect(() => {
    if (postClubSuccess) {
      Alert.alert(
        '¡Nueva comunidad creada!',
        'Se ha creado una nueva comunidad con éxito.',
      );
      dispatch(resetPostClub());
      dispatch(getMyClubsAsync(token));

      //@ts-ignore
      navigation.goBack();
    }

    if (postClubError) {
      Alert.alert('¡Error! ❌', postClubMsg);
    }
  });

  return (
    <Flex height={'100%'} flex={1} bg={'brand.primary'}>
      <HeaderNav title="Nueva Comunidad" />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <StatusBar barStyle={'light-content'} />
        <VStack space={6} w="85%" mt={12}>
          <Text color="brand.textOff" textAlign={'justify'} mb={6}>
            Aquí podrás crear una nueva comunidad e invitar a usuarios. Ingresa
            estos datos y listo.
          </Text>
          <Input
            value={name}
            onChangeText={setName}
            variant="underlined"
            placeholder="Nombre"
            borderColor={'brand.textOff'}
            color={'brand.secondary'}
            placeholderTextColor={'brand.textOff'}
            type="text"
            size={'lg'}
            autoCapitalize="none"
            _focus={{borderBottomColor: 'brand.accent'}}
          />
          <TextArea
            h={150}
            onChangeText={setDesc}
            value={desc}
            color="white"
            placeholder={'Descripción'}
            borderColor={'brand.textOff'}
            placeholderTextColor={'brand.textOff'}
            variant="underlined"
            autoCompleteType={true}
            size={'lg'}
            _focus={{borderBottomColor: 'brand.accent'}}
          />
          <Input
            value={'México'}
            variant="underlined"
            placeholder="Descripción"
            borderColor={'brand.textOff'}
            color={'brand.secondary'}
            placeholderTextColor={'brand.textOff'}
            type="text"
            size={'lg'}
            autoCapitalize="none"
            _focus={{borderBottomColor: 'brand.accent'}}
          />
          <Input
            value={city}
            onChangeText={setCity}
            variant="underlined"
            placeholder="Ciudad"
            borderColor={'brand.textOff'}
            color={'brand.secondary'}
            placeholderTextColor={'brand.textOff'}
            type="text"
            size={'lg'}
            autoCapitalize="none"
            _focus={{borderBottomColor: 'brand.accent'}}
          />

          {!photo && (
            <Pressable
              onPress={uploadPhotoHandler}
              _pressed={{opacity: 0.5}}
              justifyContent={'center'}
              alignItems={'center'}
              bg="brand.textOff"
              borderRadius={10}
              h={200}
              w={'100%'}
              mt={6}>
              <FontAwesomeIcon icon={faCamera} size={40} color="#0F101E" />
              <Text mt={1} fontWeight={'semibold'}>
                Subir foto
              </Text>
            </Pressable>
          )}
          {photo && (
            <Image
              mt={6}
              h={200}
              w={'100%'}
              alt="iamge"
              borderRadius={10}
              source={{uri: photo}}
            />
          )}
          <Button
            mb={12}
            _pressed={{opacity: 0.5}}
            onPress={uploadHandler}
            mt={6}
            isLoading={postClubLoading}
            _loading={{bg: 'brand.teriary', opacity: 1}}
            backgroundColor="brand.tertiary">
            GUARDAR COMUNIDAD
          </Button>
        </VStack>
      </KeyboardAwareScrollView>
    </Flex>
  );
};

export default NewCommunity;
