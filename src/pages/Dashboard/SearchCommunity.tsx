import {Alert, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderNav from '../../components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Box,
  Button,
  Divider,
  Input,
  Pressable,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  getMyClubsAsync,
  joinClubsAsync,
  resetJoinCommunity,
  searchClubsAsync,
} from '../../redux/slices/communitySlice';
import {useNavigation} from '@react-navigation/native';

interface ItemProps {
  title: string;
  des: string;
  members: string;
  location: string;
  id: string;
}

const SearchItem = ({title, des, members, location, id}: ItemProps) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.user.jwtToken);

  function joinCommunityHandler() {
    Alert.alert(title, '¿Deseas unirte a esta comunidad?', [
      {
        text: 'Cancelar',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Si, quiero unirme!',
        onPress: async () => {
          await dispatch(joinClubsAsync({token, clubId: id}));
        },
      },
    ]);
  }

  return (
    <Pressable
      onPress={joinCommunityHandler}
      _pressed={{opacity: 0.5}}
      w="100%"
      alignSelf={'flex-end'}
      borderTopRightRadius={12}
      borderTopLeftRadius={12}
      borderBottomLeftRadius={12}
      mb={3}>
      <Text color="white" fontWeight={'semibold'} fontSize={18}>
        {title}
      </Text>
      <Text color="brand.textOff" my={3}>
        {des}
      </Text>
      <Box flexDir={'row'} alignItems={'center'} mb={1}>
        <Text color="brand.secondary">Miembros:</Text>
        <Text color="brand.accent"> {members}</Text>
      </Box>
      <Box flexDir={'row'} alignItems={'center'}>
        <Text color="brand.secondary">Ubicación:</Text>
        <Text color="brand.textOff"> {location}</Text>
      </Box>
      <Divider backgroundColor="brand.textOff" mt={3} />
    </Pressable>
  );
};

const SearchCommunity = () => {
  const [title, setTitle] = useState<string>('');
  const token = useAppSelector(state => state.user.jwtToken);
  const searchClubs = useAppSelector(state => state.community.searchClubs);
  const searchClubsError = useAppSelector(
    state => state.community.searchClubsError,
  );
  const searchClubsLoading = useAppSelector(
    state => state.community.searchClubsLoading,
  );
  const joinCommunityLoading = useAppSelector(
    state => state.community.joinClubLoading,
  );
  const joinCommunitySuccess = useAppSelector(
    state => state.community.joinClubSuccess,
  );

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  function searchCommunityHandler() {
    if (!title) {
      Alert.alert('Por favor llene todos los campos.');
      return;
    }

    dispatch(searchClubsAsync({token, title}));
  }

  useEffect(() => {
    if (searchClubsError) {
      Alert.alert('Error, intente de nuevo.');
    }

    if (joinCommunitySuccess) {
      Alert.alert('Te haz unido correctamente ✅');
      dispatch(resetJoinCommunity());
      dispatch(getMyClubsAsync(token));
      navigation.goBack();
    }
  }, [searchClubsError, joinCommunitySuccess]);

  return (
    <>
      <HeaderNav title="Buscar Comunidad" />
      <StatusBar barStyle={'light-content'} />
      <Box bg="brand.primary" alignItems={'center'} pt={6}>
        <Input
          InputLeftElement={
            <FontAwesomeIcon
              icon={faSearch}
              style={{marginLeft: 12, color: '#656997'}}
            />
          }
          InputRightElement={
            <Button mr={1} variant={'ghost'} onPress={searchCommunityHandler}>
              Buscar
            </Button>
          }
          borderRadius={10}
          placeholder="Nombre de la comunidad"
          borderColor={'brand.textOff'}
          px={3}
          value={title}
          onChangeText={setTitle}
          w="85%"
          py={3}
          color={'brand.textOff'}
          placeholderTextColor={'brand.textOff'}
          type="text"
          size={'lg'}
          autoCapitalize="none"
          _focus={{borderBottomColor: 'brand.accent'}}
        />
      </Box>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          alignItems: 'center',
          height: '100%',
        }}
        style={{backgroundColor: '#0F101E'}}>
        <VStack space={6} w="85%" mt={6}>
          {(searchClubsLoading || joinCommunityLoading) && (
            <Spinner color="white" />
          )}
          {(!searchClubsLoading || !joinCommunityLoading) &&
            searchClubs.length === 0 && (
              <Text color="brand.textOff" textAlign={'center'} fontSize={12}>
                Lo sentimos :( No existen comunidades con ese nombre. Intenta
                buscar de nuevo.
              </Text>
            )}
          {!searchClubsLoading &&
            !joinCommunityLoading &&
            searchClubs.map((item: any, i: any) => (
              <SearchItem
                title={item.name}
                des={item.description}
                members={item.members_count}
                location={item.city}
                id={item.id}
                key={i}
              />
            ))}
        </VStack>
      </KeyboardAwareScrollView>
    </>
  );
};

export default SearchCommunity;
