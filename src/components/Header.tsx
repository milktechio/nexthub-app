import React from 'react';
import {StatusBar, Box, Pressable, Text} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import {useAppDispatch} from '../redux/hooks';
import {
  resetGetSingleNews,
  resetPostComment,
  resetPostLikeNews,
} from '../redux/slices/newsSlice';

type Props = {
  title: string;
};

const HeaderNav = ({title}: Props) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  function goBackHandler() {
    navigation.goBack();

    //reset some state
    dispatch(resetPostLikeNews());
    dispatch(resetPostComment());
    dispatch(resetGetSingleNews());
  }

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={{backgroundColor: '#0F101E'}}>
        <Box
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          position={'relative'}
          h={35}
          mb={2}
          bg="brand.primary">
          <Pressable
            position={'absolute'}
            left={6}
            _pressed={{opacity: 0.5}}
            onPress={goBackHandler}>
            <FontAwesomeIcon icon={faChevronLeft} size={25} color="#1594DB" />
          </Pressable>
          <Text
            color="brand.secondary"
            fontSize={'2xl'}
            fontWeight={'semibold'}>
            {title}
          </Text>
        </Box>
      </SafeAreaView>
    </>
  );
};

export default HeaderNav;
