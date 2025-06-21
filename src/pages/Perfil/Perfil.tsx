import React, {useEffect} from 'react';
import {
  Flex,
  StatusBar,
  Pressable,
  Text,
  VStack,
  ScrollView,
  HStack,
  Divider,
  Button,
} from 'native-base';
import {Image} from 'native-base';
import HeaderNav from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../redux/hooks';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';

interface LabelProps {
  title: string;
  value: string;
}

interface ExpProps {
  exp: string;
  from: string;
  to: string;
}

const LabelWithValue = ({title, value}: LabelProps) => {
  return (
    <>
      <Text color="brand.accent" fontWeight={'bold'} fontSize={16}>
        {title}:
      </Text>
      <Text color={'brand.textOff'} fontSize={'md'} mb={3}>
        {value}
      </Text>
    </>
  );
};

const ExperienceComp = ({exp, from, to}: ExpProps) => {
  return (
    <HStack mt={3}>
      <VStack>
        <Image
          alt="image"
          w={12}
          h={12}
          source={require('../../../assets/check-circle.png')}
        />
      </VStack>
      <VStack ml={3}>
        <Text fontWeight="bold" fontSize={16} color="brand.accent">
          {exp}
        </Text>
        <Text color="brand.textOff">
          {from}-{to}
        </Text>
      </VStack>
    </HStack>
  );
};

const Perfil = () => {
  const navigation = useNavigation();

  const userProfile = useAppSelector(state => state.user.getUserProfile);
  const getAllExp = useAppSelector(state => state.user.getAllExp);

  function navigateToEditUserHandler() {
    //@ts-ignore
    navigation.navigate('editProfile');
  }

  function navigateToEditBioHandler() {
    //@ts-ignore
    navigation.navigate('editBio');
  }

  function navigateToEditEpxHandler() {
    //@ts-ignore
    navigation.navigate('editExperience');
  }

  return (
    <>
      <HeaderNav title="Perfil" />
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        style={{backgroundColor: '#0F101E'}}
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <VStack mt={12} w="85%">
          <HStack>
            {/* <Image
              w={110}
              h={110}
              alt="image"
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
                Usuario
              </Text>
            </VStack>
          </HStack>
          <Divider backgroundColor="brand.textOff" mt={12} />
          <Text
            color={'white'}
            bg={'brand.primary'}
            mt={6}
            pb={6}
            fontSize={'2xl'}
            fontWeight={'semibold'}>
            Bio
          </Text>
          <HStack>
            <Text
              color={'white'}
              lineHeight={20}
              fontSize={15}
              mt={2}
              textAlign={'justify'}>
              {userProfile?.data?.profile.about_me &&
                userProfile?.data?.profile.about_me}
              {!userProfile?.data?.profile.about_me &&
                'Agrega aquí una descripción corta. Cuentanos sobre ti! :)'}
            </Text>
          </HStack>
          <Pressable
            mt={6}
            onPress={navigateToEditBioHandler}
            _pressed={{opacity: 0.5}}>
            <HStack justifyContent="flex-end">
              <Text fontSize={16} color="brand.accent">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{color: '#1594DB', marginRight: 6}}
                />
                Editar Bio
              </Text>
            </HStack>
          </Pressable>
          <Divider backgroundColor="brand.textOff" mt={6} />
          <Text
            color={'white'}
            bg={'brand.primary'}
            mt={6}
            pb={6}
            fontSize={'2xl'}
            fontWeight={'semibold'}>
            Perfil
          </Text>
          <VStack>
            <LabelWithValue title="Usuario" value={userProfile.data.username} />
            <LabelWithValue
              title="Nombre"
              value={
                userProfile.data.profile.name
                  ? userProfile.data.profile.name
                  : 'N/A'
              }
            />
            <LabelWithValue
              title="Apellido"
              value={
                userProfile.data.profile.lastname
                  ? userProfile.data.profile.lastname
                  : 'N/A'
              }
            />
            <LabelWithValue title="Correo" value={userProfile.data.email} />
            <LabelWithValue
              title="Teléfono"
              value={
                userProfile.data.profile.mobile
                  ? userProfile.data.profile.mobile
                  : 'N/A'
              }
            />
            <LabelWithValue
              title="LinkedIn"
              value={
                userProfile.data.profile.linkedin
                  ? userProfile.data.profile.linkedin
                  : 'N/A'
              }
            />
            <LabelWithValue
              title="Instagram"
              value={
                userProfile.data.profile.instagram
                  ? userProfile.data.profile.instagram
                  : 'N/A'
              }
            />
            <LabelWithValue
              title="Facebook"
              value={
                userProfile.data.profile.facebook
                  ? userProfile.data.profile.facebook
                  : 'N/A'
              }
            />
            <LabelWithValue
              title="Twitter (X)"
              value={
                userProfile.data.profile.twitter
                  ? userProfile.data.profile.twitter
                  : 'N/A'
              }
            />
          </VStack>
          <Pressable
            onPress={navigateToEditUserHandler}
            mt={6}
            _pressed={{opacity: 0.5}}>
            <HStack justifyContent="flex-end">
              <Text fontSize={16} color="brand.accent">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{color: '#1594DB', marginRight: 6}}
                />
                Editar Perfil
              </Text>
            </HStack>
          </Pressable>
          <Divider backgroundColor="brand.textOff" mt={6} />
          <VStack>
            <Text
              color={'white'}
              mt={6}
              bg={'brand.primary'}
              pb={6}
              fontSize={'2xl'}
              fontWeight={'semibold'}>
              Experiencia
            </Text>
            {getAllExp?.data?.map((item: any, i: any) => {
              return (
                <ExperienceComp
                  key={i}
                  exp={item.name}
                  from={item.in}
                  to={item.out}
                />
              );
            })}
          </VStack>
          <Button
            _pressed={{opacity: 0.5}}
            mt={6}
            mb={12}
            borderWidth={1}
            borderStyle={'dashed'}
            onPress={navigateToEditEpxHandler}
            borderColor="brand.tertiary"
            backgroundColor="transparent">
            <Image
              alt="image"
              source={require('../../../assets/icons/plus.png')}
            />
          </Button>
        </VStack>
      </ScrollView>
    </>
  );
};

export default Perfil;
