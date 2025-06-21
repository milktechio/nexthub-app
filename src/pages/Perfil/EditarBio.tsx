import React, {useState, useEffect} from 'react';
import {StatusBar, Text, Button, VStack, HStack, TextArea} from 'native-base';
import {Image} from 'native-base';
import HeaderNav from '../../components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  updateProfileAsync,
  getUserProfileAsync,
  resetUpdateProfile,
} from '../../redux/slices/userSlice';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

const EditarBio = () => {
  const [about_me, setAboutMe] = useState<string>('');

  const userProfile = useAppSelector(state => state.user.getUserProfile);
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

  const editBioHandler = () => {
    const data = {
      about_me,
    };

    try {
      dispatch(updateProfileAsync({token: jwtToken, data}));
    } catch (e: any) {
      console.log(e);
    }
  };

  async function resetProfileData() {
    dispatch(getUserProfileAsync(jwtToken));
    dispatch(resetUpdateProfile());

    Alert.alert('Biografía editada exitosamente ✅');

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
      <HeaderNav title="Editar Biografía" />
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
          <VStack>
            <TextArea
              h={150}
              onChangeText={setAboutMe}
              value={about_me}
              color="white"
              placeholder={'Biografia'}
              borderColor={'brand.textOff'}
              placeholderTextColor={'brand.textOff'}
              variant="underlined"
              autoCompleteType={true}
              size={'lg'}
              _focus={{borderBottomColor: 'brand.accent'}}
            />
          </VStack>
          <Button
            _pressed={{opacity: 0.5}}
            mt={6}
            onPress={editBioHandler}
            _loading={{bg: 'brand.teriary', opacity: 1}}
            isLoading={updateUserLoading || getUserProfileLoading}
            isLoadingText={
              updateUserLoading ? 'GUARDANDO CAMBIOS...' : 'CARGANDO PERFIL...'
            }
            backgroundColor="brand.tertiary">
            GUARDAR CAMBIOS
          </Button>
        </VStack>
      </KeyboardAwareScrollView>
    </>
  );
};

export default EditarBio;
