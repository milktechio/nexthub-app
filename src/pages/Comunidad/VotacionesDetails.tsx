import React, {useEffect} from 'react';
import HeaderNav from '../../components/Header';
import {
  Box,
  Divider,
  Flex,
  Image,
  Progress,
  StatusBar,
  VStack,
  Text,
  Button,
  ScrollView,
  Spinner,
} from 'native-base';

import {RouteProp, useRoute} from '@react-navigation/native';
import {MainNavigator} from '../../routes/RoutesMain';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  getVoteResultAsync,
  resetVote,
  voteActionAsync,
  votosDetailAsync,
} from '../../redux/slices/communitySlice';
import {Alert} from 'react-native';

const VotacionesDetails = () => {
  const route = useRoute<RouteProp<MainNavigator, 'votacionesDetails'>>();
  const {title, des, image, date, id, minimum, options, participations} =
    route.params;

  const token = useAppSelector(state => state.user.jwtToken);

  const {
    voteLoading,
    voteError,
    voteSuccess,
    getVoteResultLoading,
    getVoteResultError,
    getVoteResult,
    voteDetailLoading,
    voteDetailSuccess,
    voteDetail,
  } = useAppSelector(state => state.community);

  const dispatch = useAppDispatch();

  function voteHandler(option: string) {
    dispatch(voteActionAsync({token, voteId: id, option}));
  }

  useEffect(() => {
    dispatch(votosDetailAsync({token, voteId: id}));
    dispatch(getVoteResultAsync({token, voteId: id}));

    if (getVoteResultError) {
    }

    if (voteError) {
      Alert.alert('Error votando ❌', 'Por favor intente de nuevo');
      dispatch(resetVote());
    }

    if (voteSuccess) {
      Alert.alert('Haz votado correctamente ✅');
      dispatch(resetVote());
    }
  }, [voteSuccess, voteError, getVoteResultError]);

  return (
    <>
      <HeaderNav title="Votaciones" />
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        bg="brand.primary"
        h="100%"
        contentContainerStyle={{alignItems: 'center'}}>
        <Image
          alt="img"
          bg="brand.textOff"
          h={230}
          w={'100%'}
          mt={6}
          source={{
            uri: image?.replace('http://', 'https://'),
          }}
          resizeMode="cover"
        />
        <VStack w={'85%'} pt={6} space={6}>
          <Flex
            flexDir={'row'}
            justifyContent={'space-between'}
            alignItems="center">
            <Text color="white" fontWeight={'semibold'} fontSize={'xl'}>
              {title}
            </Text>
            <Text color="white">{date?.slice(0, 10)}</Text>
          </Flex>
          <VStack space={2}>
            <Box>
              <Progress
                zIndex={100}
                bg="brand.textOff"
                _filledTrack={{
                  bg: 'brand.tertiary',
                }}
                value={(participations! / minimum!) * 100}
              />
            </Box>
            <Flex
              flexDir={'row'}
              justifyContent={'space-between'}
              alignItems="center">
              <Text color="brand.textOff">Objetivo de la votación:</Text>
              <Text color="brand.textOff">
                {participations}/{minimum}
              </Text>
            </Flex>
          </VStack>
          <Text color="white">{des}</Text>
          <Divider bg={'brand.textOff'} />
          <VStack alignItems={'center'} space={6} mb={12}>
            {voteLoading && <Spinner color="white" />}
            {!voteLoading && voteDetail?.my_vote === null && (
              <>
                <Text color="brand.textOff">Votar por:</Text>
                {options?.map((item, index) => (
                  <Button
                    key={index}
                    w="100%"
                    bg={'brand.primary'}
                    borderWidth={1}
                    color={'brand.tertiary'}
                    borderColor={'brand.tertiary'}
                    onPress={() => voteHandler(item)}
                    _pressed={{opacity: 0.5, bg: 'brand.tertiary'}}>
                    {item}
                  </Button>
                ))}
              </>
            )}
            {voteDetail?.my_vote !== null &&
              getVoteResult?.map((item: any, i: any) => (
                <Box
                  key={i}
                  w={'100%'}
                  h={10}
                  borderRadius={5}
                  borderWidth={1}
                  color={'brand.tertiary'}
                  borderColor={'brand.tertiary'}>
                  <Box
                    position={'absolute'}
                    w={`${item.percentaje}%`}
                    h={10}
                    borderRadius={5}
                    bg={'brand.tertiary'}
                    color={'brand.tertiary'}
                  />
                  <Text
                    top={2.5}
                    w="100%"
                    color="white"
                    fontWeight={'semibold'}
                    position={'absolute'}
                    textAlign={'center'}>
                    {item.option}
                  </Text>
                </Box>
              ))}
          </VStack>
        </VStack>
      </ScrollView>
    </>
  );
};

export default VotacionesDetails;
