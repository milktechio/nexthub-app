import React, {useEffect} from 'react';
import {Box, Flex, Pressable, ScrollView, Text} from 'native-base';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import NoticiasCard from '../../components/NoticiasCard';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  getEventosAsync,
  getRetosAsync,
  getVotosAsync,
} from '../../redux/slices/communitySlice';
import {getNews} from '../../redux/slices/newsSlice';
import {getAllExpAsync, getInviteAsync} from '../../redux/slices/userSlice';
import {getMyClubsAsync} from '../../redux/slices/communitySlice';

import ComunidadEventos from './ComunidadEventos';

const width = Dimensions.get('window').width;

export type TopNavigator = {
  votaciones: undefined;
  eventos: undefined;
};

const Home = () => {
  const navigation = useNavigation();

  const jwtToken = useAppSelector(state => state.user.jwtToken);
  const newsData = useAppSelector(state => state.news.getNewsData);
  const userProfile = useAppSelector(state => state.user.getUserProfile);

  const dispatch = useAppDispatch();

  function navigateToViewNoticiasListHandler() {
    // @ts-ignore
    navigation.navigate('noticiasList');
  }

  useEffect(() => {
    dispatch(getVotosAsync(jwtToken));
    dispatch(getRetosAsync(jwtToken));
    dispatch(getNews(jwtToken));
    dispatch(getAllExpAsync(jwtToken));
    dispatch(getInviteAsync(jwtToken));
    dispatch(getMyClubsAsync(jwtToken));
    dispatch(getEventosAsync(jwtToken));
  }, []);

  // const [initialRun, setInitialRun] = useState<boolean>(true);
  // useEffect(() => {
  //   if (userProfile?.data?.email_verified_at === null && initialRun) {
  //     setInitialRun(false);

  //     setTimeout(() => {
  //       Alert.alert(
  //         'Aún no haz registrado tu cuenta ⚠️',
  //         'Por favor diríjete a tu correo para verificar tu cuenta.',
  //         [
  //           {
  //             text: 'Cerrar',
  //             onPress: () => {},
  //           },
  //           {
  //             text: 'Reenviar correo',
  //             onPress: () => {
  //               dispatch(
  //                 requestEmailVerificationAsync(userProfile?.data?.email),
  //               );
  //             },
  //             style: 'cancel',
  //           },
  //         ],
  //       );
  //     }, 3000);
  //   }
  // }, [userProfile]);

  return (
    <Flex bg={'brand.primary'} flex={1}>
      <Flex flex={1}>
        <Box px={0} mb={3} mt={3}>
          <Text
            px={4}
            mb={4}
            color={'white'}
            bg={'brand.primary'}
            pt={70}
            lineHeight={33}
            fontSize={'2xl'}
            fontWeight={'semibold'}>
            !Bienvenid@, {userProfile?.data?.username}!
          </Text>
          <Flex
            flexDir={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Text
              px={4}
              color={'brand.textOff'}
              fontWeight={'semibold'}
              fontSize={'xl'}>
              Noticias
            </Text>
            <Pressable
              px={4}
              _pressed={{opacity: 0.5}}
              onPress={navigateToViewNoticiasListHandler}>
              <Text color={'brand.accent'}>Ver más</Text>
            </Pressable>
          </Flex>
          <Carousel
            loop
            mode="parallax"
            autoPlay
            width={width}
            height={280}
            data={newsData}
            scrollAnimationDuration={2500}
            renderItem={({item, index}: any) => (
              <NoticiasCard
                key={index}
                id={item.id}
                title={item.title}
                des={item.body}
                image={item.image}
              />
            )}
          />
        </Box>
      </Flex>
      <Flex flex={1}>
        <Text
          pt={3}
          px={4}
          bg={'brand.primary'}
          color={'brand.textOff'}
          fontWeight={'semibold'}
          fontSize={'xl'}>
          Comunidad Barra
        </Text>
        <ComunidadEventos />
      </Flex>
    </Flex>
  );
};

export default Home;
