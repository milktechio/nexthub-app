import React, {useEffect, useState} from 'react';
import {StatusBar, Input, Text, VStack, Button} from 'native-base';
import {Image} from 'native-base';
import HeaderNav from '../../components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Alert} from 'react-native';
import {
  getUserProfileAsync,
  resetUpdateProfile,
  updateProfileAsync,
} from '../../redux/slices/userSlice';
import {useNavigation} from '@react-navigation/native';

const EditarPerfil = () => {
  const userProfile = useAppSelector(state => state.user.getUserProfile);

  const [mobile, setMobile] = useState<string>(
    userProfile.data.profile.mobile ? userProfile.data.profile.mobile : '',
  );
  const [name, setName] = useState<string>(
    userProfile.data.profile.name ? userProfile.data.profile.name : '',
  );
  const [lastname, setLastname] = useState<string>(
    userProfile.data.profile.lastname ? userProfile.data.profile.lastname : '',
  );
  const [linkedin, setLinkedin] = useState<string>(
    userProfile.data.profile.linkedin ? userProfile.data.profile.linkedin : '',
  );
  const [instagram, setInstagram] = useState<string>(
    userProfile.data.profile.instagram
      ? userProfile.data.profile.instagram
      : '',
  );
  const [facebook, setFacebook] = useState<string>(
    userProfile.data.profile.facebook ? userProfile.data.profile.facebook : '',
  );
  const [twitter, setTwitter] = useState<string>(
    userProfile.data.profile.twitter ? userProfile.data.profile.twitter : '',
  );

  const jwtToken = useAppSelector(state => state.user.jwtToken);
  const updateUserLoading = useAppSelector(
    state => state.user.updateUserProfileLoading,
  );
  const updateUserSuccess = useAppSelector(
    state => state.user.updateUserProfileSuccess,
  );
  const updateUserError = useAppSelector(
    state => state.user.updateUserProfileError,
  );
  const updateUserErrorMsg = useAppSelector(
    state => state.user.updateUserProfileErrorMsg,
  );
  const getUserProfileLoading = useAppSelector(
    state => state.user.getUserProfileLoading,
  );

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const data = [
    {
      dato: 'Nombre',
      type: 'text',
      state: name,
      setState: setName,
    },
    {dato: 'Apellido', type: 'text', state: lastname, setState: setLastname},
    {dato: 'Teléfono', type: 'text', state: mobile, setState: setMobile},
    {dato: 'LinkedIn', type: 'text', state: linkedin, setState: setLinkedin},
    {dato: 'Instagram', type: 'text', state: instagram, setState: setInstagram},
    {dato: 'Facebook', type: 'text', state: facebook, setState: setFacebook},
    {dato: 'Twitter (X)', type: 'text', state: twitter, setState: setTwitter},
  ];

  function editProfileHandler() {
    const data = {
      name,
      lastname,
      mobile,
      linkedin,
      instagram,
      facebook,
      twitter,
    };

    console.log(data);

    try {
      dispatch(updateProfileAsync({token: jwtToken, data}));
    } catch (e: any) {
      console.log(e);
    }
  }

  function changePasswordHandler() {
    //@ts-ignore
    navigation.navigate('changePass');
  }

  function deleteUserHandler() {
    //@ts-ignore
    navigation.navigate('deleteUserReq');
  }

  async function resetProfileData() {
    dispatch(getUserProfileAsync(jwtToken));
    dispatch(resetUpdateProfile());

    Alert.alert('Perfil editado exitosamente ✅');

    navigation.goBack();
  }

  useEffect(() => {
    if (updateUserSuccess) {
      resetProfileData();
    }

    if (updateUserError) {
      Alert.alert(updateUserErrorMsg);
      dispatch(resetUpdateProfile());
      navigation.goBack();
    }
  }, [updateUserError, updateUserSuccess]);

  return (
    <>
      <HeaderNav title="Editar Perfil" />
      <StatusBar barStyle={'light-content'} />
      <KeyboardAwareScrollView
        extraHeight={220}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        style={{backgroundColor: '#0F101E'}}>
        <VStack mt={12} space={8} w="85%">
          <VStack alignItems="center">
            {/* <Image
              alt="image"
              w={120}
              h={120}
              source={require('../../../assets/profile-image.png')}
              mb={6}
            /> */}
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
          {data.map((item: any, i) => {
            return (
              <Input
                key={i}
                variant="underlined"
                placeholder={item.dato}
                borderColor={'brand.textOff'}
                color={'brand.secondary'}
                placeholderTextColor={'brand.textOff'}
                type="text"
                size={'lg'}
                value={item.state}
                onChangeText={item.setState}
                autoCapitalize="none"
                _focus={{borderBottomColor: 'brand.accent'}}
              />
            );
          })}
          <Button
            _pressed={{opacity: 0.5}}
            mt={6}
            onPress={editProfileHandler}
            _loading={{bg: 'brand.teriary', opacity: 1}}
            isLoading={updateUserLoading || getUserProfileLoading}
            isLoadingText={
              updateUserLoading ? 'GUARDANDO CAMBIOS...' : 'CARGANDO PERFIL...'
            }
            backgroundColor="brand.tertiary">
            GUARDAR CAMBIOS
          </Button>
          <Button
            _pressed={{opacity: 0.5}}
            onPress={changePasswordHandler}
            _text={{color: 'brand.accent'}}
            backgroundColor="brand.primary">
            CAMBIAR CONTRASEÑA
          </Button>
          <Button
            _pressed={{opacity: 0.5}}
            onPress={deleteUserHandler}
            _text={{color: 'brand.accent'}}
            mb={20}
            backgroundColor="brand.primary">
            ELIMINAR USUARIO
          </Button>
        </VStack>
      </KeyboardAwareScrollView>
    </>
  );
};

export default EditarPerfil;
