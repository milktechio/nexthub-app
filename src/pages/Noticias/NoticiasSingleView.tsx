import React, {useEffect} from 'react';
import HeaderNav from '../../components/Header';
import {
  Box,
  Divider,
  Flex,
  Image,
  Pressable,
  ScrollView,
  Spinner,
  StatusBar,
  Text,
  VStack,
} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMessage, faUser} from '@fortawesome/free-solid-svg-icons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {MainNavigator} from '../../routes/RoutesMain';
import {Alert} from 'react-native';
import {faHeart as HeartOutline} from '@fortawesome/free-regular-svg-icons';
import {faHeart as HeartSolid} from '@fortawesome/free-solid-svg-icons';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  getSingleNews,
  postLikeNews,
  resetPostComment,
  resetPostLikeNews,
} from '../../redux/slices/newsSlice';

const NoticiasSingleView = () => {
  const route = useRoute<RouteProp<MainNavigator, 'noticiasSingleView'>>();
  const dataTitle: any = route.params.title;
  const dataDes: any = route.params.des;
  const dataImage: any = route.params.image;
  const dataLocation: any = route.params?.location;
  const dataDate: any = route.params?.date;

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const token = useAppSelector(state => state.user.jwtToken);

  const news = useAppSelector(state => state.news.getSingleNewsData);
  const newsLoading = useAppSelector(state => state.news.getSingleNewsLoading);

  const likeLoading = useAppSelector(state => state.news.postLikeNewsLoading);
  const likeSuccess = useAppSelector(state => state.news.postLikeNewsSuccess);
  const likeError = useAppSelector(state => state.news.postLikeNewsError);

  const commentSuccess = useAppSelector(
    state => state.news.postCommentNewsSuccess,
  );
  const commentError = useAppSelector(state => state.news.postCommentNewsError);

  function shareHandler() {
    Alert.alert('Muy pronto ;)');
  }

  function likeHandler() {
    const data = {
      token,
      id: route.params.id,
    };

    dispatch(postLikeNews(data));
  }

  function commentHandler() {
    // @ts-ignore
    navigation.navigate('noticiasComment', {id: route.params.id});
  }

  useEffect(() => {
    if (likeSuccess) {
      dispatch(resetPostLikeNews());
      dispatch(getSingleNews({token, id: route.params.id}));
    }

    if (commentSuccess) {
      dispatch(resetPostComment());
      dispatch(getSingleNews({token, id: route.params.id}));
    }
  }, [likeSuccess, likeError, commentError, commentSuccess]);

  useEffect(() => {
    dispatch(getSingleNews({token, id: route.params.id}));
  }, []);

  return (
    <>
      <HeaderNav title="Detalles" />
      <StatusBar barStyle={'light-content'} />
      <ScrollView contentContainerStyle={{height: 'auto'}} bg="brand.primary">
        <Box bg={'brand.primary'} h={'100%'} mb={6} w={'100%'}>
          <VStack h="100%" zIndex={100} alignItems={'center'}>
            <Image
              alt="Img"
              h={'400px'}
              w="100%"
              bg={'brand.textOff'}
              source={{uri: dataImage.replace('http://', 'https://')}}
              resizeMode="cover"
            />
            <VStack w="85%" space={4}>
              <Flex
                flexDir={'row'}
                justifyContent={'space-between'}
                alignItems="center"
                mt={6}>
                <Text color="white" fontWeight={'semibold'} fontSize={'xl'}>
                  {dataTitle}
                </Text>
              </Flex>
              <VStack space={6}>
                <Box>
                  <Text color="brand.textOff">{dataDes}</Text>
                </Box>
                {dataLocation && (
                  <VStack>
                    <Text color="white" mb={2}>
                      Lugar: <Text color="brand.textOff">{dataLocation}</Text>
                    </Text>
                    <Text color="white">
                      Fecha: <Text color="brand.textOff"> {dataDate}</Text>
                    </Text>
                  </VStack>
                )}
                <Divider bg={'brand.textOff'} />
              </VStack>
              <Flex flexDir={'row'} px={4} alignItems={'center'} mb={6}>
                <Pressable
                  flexDir={'row'}
                  flex={1}
                  justifyContent={'center'}
                  alignItems={'center'}
                  onPress={likeHandler}
                  _pressed={{opacity: 0.5}}>
                  {likeLoading && <Spinner color="white" />}
                  {!likeLoading && (
                    <>
                      <Text color="white" mr={3} fontWeight={'medium'}>
                        Like
                      </Text>
                      <FontAwesomeIcon
                        icon={news?.data?.like ? HeartSolid : HeartOutline}
                        color="white"
                        size={20}
                      />
                      <Text color="white" ml={3}>
                        {news?.data?.likes_count}
                      </Text>
                    </>
                  )}
                </Pressable>
                <Pressable
                  flexDir={'row'}
                  flex={2}
                  justifyContent={'center'}
                  alignItems={'center'}
                  onPress={commentHandler}
                  _pressed={{opacity: 0.5}}>
                  <Text color="white" mr={3} fontWeight={'medium'}>
                    Comentarios
                  </Text>
                  <FontAwesomeIcon icon={faMessage} color="white" size={20} />
                  <Text color="white" ml={3}>
                    0
                  </Text>
                </Pressable>
              </Flex>
              {newsLoading && <Spinner color="white" />}
              {!newsLoading &&
                news?.data?.comments?.length > 0 &&
                news.data.comments.map((item: any, i: any) => (
                  <VStack key={i} mb={6}>
                    <Text
                      color="brand.textOff"
                      fontWeight={'semibold'}
                      fontSize={16}>
                      <FontAwesomeIcon
                        icon={faUser}
                        color="#1594DB"
                        size={15}
                      />
                      {'  '}
                      {item.user.username}
                    </Text>
                    <Text color="brand.secondary" mt={1}>
                      {item.comment}
                    </Text>
                  </VStack>
                ))}
              {!newsLoading && news?.data?.comments?.length === 0 && (
                <Text textAlign={'center'} color="brand.textOff" mb={6}>
                  No hay comentarios aún.
                </Text>
              )}
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </>
  );
};

export default NoticiasSingleView;
