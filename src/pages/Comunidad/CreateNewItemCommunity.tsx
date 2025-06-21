import React, {useEffect, useState} from 'react';
import {
  Button,
  Flex,
  Image,
  Input,
  Pressable,
  StatusBar,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import HeaderNav from '../../components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Alert} from 'react-native';
import {faCamera, faLocation} from '@fortawesome/free-solid-svg-icons';
import {
  getCommunityEventosAsync,
  getCommunityNewsAsync,
  postEventAsync,
  resetPostEvents,
} from '../../redux/slices/communitySlice';

const CreateNewItemCommunity = ({route}: any) => {
  const [photo, setPhoto] = useState<any>(null);
  const [imageBack, setImageBack] = useState<any>(null);
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const token = useAppSelector(state => state.user.jwtToken);
  const {postEventSuccess, postEventError, postEventLoading} = useAppSelector(
    state => state.community,
  );

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

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

  const uploadHandler = () => {
    if (route.params.type === 'news') {
      if (!name || !desc || !imageBack) {
        Alert.alert(
          '¡Datos incompletos!',
          'Por favor, revisa que todos los campos esten llenos',
        );
        return;
      }

      dispatch(
        postEventAsync({
          token: token,
          title: name,
          body: desc,
          image: imageBack,
          club_id: route.params.clubId,
          is_news: 1,
        }),
      );
    }

    if (route.params.type === 'events') {
      if (!name || !desc || !imageBack || !city || !date) {
        Alert.alert(
          '¡Datos incompletos!',
          'Por favor, revisa que todos los campos esten llenos',
        );
        return;
      }

      dispatch(
        postEventAsync({
          token: token,
          title: name,
          body: desc,
          image: imageBack,
          club_id: route.params.clubId,
          is_news: 0,
          location: city,
          date: date,
        }),
      );
    }
  };

  useEffect(() => {
    if (postEventSuccess) {
      Alert.alert('Exito ✅', 'Se ha creado un nuevo evento');
      dispatch(resetPostEvents());
      dispatch(getCommunityEventosAsync({token, clubId: route.params.clubId}));
      dispatch(getCommunityNewsAsync({token, clubId: route.params.clubId}));

      //@ts-ignore
      navigation.goBack();
    }

    if (postEventError) {
      Alert.alert('Error ❌', 'Intente de nuevo');
      dispatch(resetPostEvents());
    }
  }, [postEventError, postEventSuccess, postEventLoading]);

  return (
    <Flex height={'100%'} flex={1} bg={'brand.primary'}>
      <HeaderNav
        title={
          route.params.type === 'news'
            ? 'Crear nueva noticia'
            : 'Crear nuevo evento'
        }
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <StatusBar barStyle={'light-content'} />
        <VStack space={6} w="85%" mt={12}>
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
          {route.params.type === 'events' && (
            <>
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
              <Input
                value={date}
                onChangeText={setDate}
                variant="underlined"
                placeholder="DD/MM/AAAA"
                borderColor={'brand.textOff'}
                color={'brand.secondary'}
                placeholderTextColor={'brand.textOff'}
                type="text"
                size={'lg'}
                autoCapitalize="none"
                _focus={{borderBottomColor: 'brand.accent'}}
              />
            </>
          )}
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
            isLoading={postEventLoading}
            _loading={{bg: 'brand.teriary', opacity: 1}}
            backgroundColor="brand.tertiary">
            {route.params.type === 'news' ? 'CREAR NOTICIA' : 'CREAR EVENTO'}
          </Button>
        </VStack>
      </KeyboardAwareScrollView>
    </Flex>
  );
};

export default CreateNewItemCommunity;
