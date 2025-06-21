import {Alert, SafeAreaView, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {
  Box,
  Divider,
  Flex,
  HStack,
  Image,
  Menu,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalendarDays,
  faChevronLeft,
  faDoorOpen,
  faNewspaper,
  faPlus,
  faPlusCircle,
  faShield,
} from '@fortawesome/free-solid-svg-icons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {MainNavigator} from '../../routes/RoutesMain';
import {
  exitClubsAsync,
  getMyClubsAsync,
  resetExitCommunity,
} from '../../redux/slices/communitySlice';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CommunityNews from './CommunityNews';
import CommunityEvents from './CommunityEvents';

export type TopNavigator = {
  noticias: {clubId: string};
  eventos: {clubId: string};
};

const Tab = createMaterialTopTabNavigator<TopNavigator>();

const CommunityView = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.user.jwtToken);
  const exitClubLoading = useAppSelector(
    state => state.community.exitClubLoading,
  );
  const exitClubSuccess = useAppSelector(
    state => state.community.exitClubSuccess,
  );
  const exitClubError = useAppSelector(state => state.community.exitClubError);

  const route = useRoute<RouteProp<MainNavigator, 'communityView'>>();

  function goBackHandler() {
    navigation.goBack();
  }

  function exitClubHandler() {
    Alert.alert('Abandonar grupo 🚪', '¿Estas seguro?', [
      {
        text: 'Cancelar',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Si, quiero salir de este grupo',
        onPress: async () => {
          await dispatch(
            exitClubsAsync({
              token,
              clubId: route.params.item.id,
            }),
          );
        },
      },
    ]);
  }

  useEffect(() => {
    if (exitClubSuccess) {
      Alert.alert('Abandonaste este grupo ✅');
      dispatch(resetExitCommunity());
      dispatch(getMyClubsAsync(token));
      navigation.goBack();
    }

    if (exitClubError) {
      Alert.alert('Error ❌', 'Intente de nuevo');
      dispatch(resetExitCommunity());
    }
  }, [exitClubError, exitClubSuccess]);

  function navigateToCreateItem(type: string) {
    //@ts-ignore
    navigation.navigate('createNewItemCommunity', {
      clubId: route.params.item.id,
      type,
    });
  }

  return (
    <Flex flex={1} bg="brand.primary">
      <StatusBar barStyle={'light-content'} />
      <Flex flex={1.3}>
        <SafeAreaView style={{backgroundColor: '#0F101E'}}>
          <Box
            flexDir={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            position={'relative'}
            h={35}
            mb={3}
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
              Comunidad
            </Text>
            <Pressable
              flexDir={'row'}
              position={'absolute'}
              right={6}
              _pressed={{opacity: 0.5}}
              onPress={exitClubHandler}>
              <FontAwesomeIcon icon={faDoorOpen} size={22} color="#1594DB" />
            </Pressable>
          </Box>
        </SafeAreaView>
        {!exitClubLoading && (
          <VStack
            zIndex={100}
            alignItems={'center'}
            bg={'brand.primary'}
            mb={6}
            w={'100%'}>
            <Image
              alt="Img"
              h={'200px'}
              w="100%"
              bg={'brand.textOff'}
              source={{
                uri: route.params.item.image.replace('http://', 'https://'),
              }}
              resizeMode="cover"
            />
            <VStack w="85%" space={4}>
              <Flex
                flexDir={'row'}
                justifyContent={'space-between'}
                alignItems="center"
                px={3}
                mt={3}>
                <Text color="white" fontWeight={'semibold'} fontSize={'xl'}>
                  {route.params.item.name}
                </Text>
                {route.params.item.membership.role === 'administrador' && (
                  <Box position={'absolute'} right={0} zIndex={1000}>
                    <Menu
                      bg="brand.accent"
                      w="200"
                      borderRadius={10}
                      shouldOverlapWithTrigger={false} // @ts-ignore
                      placement="top right"
                      trigger={triggerProps => {
                        return (
                          <Pressable
                            {...triggerProps}
                            bg="brand.accent"
                            borderRadius={'2xl'}
                            flexDir={'row'}
                            zIndex={1000}
                            _pressed={{opacity: 0.5}}
                            px={3}
                            py={2}>
                            <HStack alignItems={'center'} space={1}>
                              <Text
                                color="white"
                                fontWeight={'medium'}
                                alignItems={'center'}
                                fontSize={'xs'}>
                                Admin
                              </Text>
                              <FontAwesomeIcon
                                icon={faPlusCircle}
                                color="white"
                                size={15}
                              />
                            </HStack>
                          </Pressable>
                        );
                      }}>
                      <Menu.Item
                        onPress={() => navigateToCreateItem('news')}
                        _pressed={{opacity: 0.5}}>
                        <HStack flexDir={'row'} alignItems={'center'} space={3}>
                          <FontAwesomeIcon
                            icon={faNewspaper}
                            color="white"
                            size={15}
                          />
                          <Text color="white">Nueva Noticia</Text>
                        </HStack>
                      </Menu.Item>
                      <Menu.Item
                        onPress={() => navigateToCreateItem('events')}
                        _pressed={{opacity: 0.5}}>
                        <HStack flexDir={'row'} alignItems={'center'} space={3}>
                          <FontAwesomeIcon
                            icon={faCalendarDays}
                            color="white"
                            size={15}
                          />
                          <Text color="white">Nuevo Evento</Text>
                        </HStack>
                      </Menu.Item>
                    </Menu>
                  </Box>
                )}
              </Flex>
              <VStack space={2}>
                <Box px={3}>
                  <Text color="brand.textOff" fontSize={'sm'}>
                    {route.params.item.description}
                  </Text>
                </Box>
                <HStack px={3} justifyContent={'space-between'}>
                  <HStack space={1}>
                    <Text color="white" fontWeight={'semibold'} fontSize={'xs'}>
                      Miembros:{' '}
                    </Text>
                    <Text color="brand.textOff" fontSize={'xs'}>
                      {route.params.item.members_count}
                    </Text>
                  </HStack>
                  <HStack space={1}>
                    <Text color="white" fontWeight={'semibold'} fontSize={'xs'}>
                      Ciudad:{' '}
                    </Text>
                    <Text color="brand.textOff" fontSize={'xs'}>
                      {route.params.item.city}, Mexico
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </VStack>
          </VStack>
        )}
        {exitClubLoading && <Spinner color="white" />}
      </Flex>
      <Flex flex={1} mt={6}>
        {!exitClubLoading && (
          <Tab.Navigator
            screenOptions={{
              swipeEnabled: false,
              tabBarStyle: {
                backgroundColor: '#0F101E',
                borderColor: '#C219ED',
                borderWidth: 1,
                borderRadius: 11,
                width: '85%',
                alignSelf: 'center',
                height: 35,
              },
              tabBarIndicatorStyle: {
                backgroundColor: '#C219ED',
                height: '100%',
                borderRadius: 10,
              },
              tabBarActiveTintColor: 'white',
              tabBarInactiveTintColor: '#656997',
            }}>
            <Tab.Screen
              name="noticias"
              component={CommunityNews}
              initialParams={{clubId: route.params.item.id}}
              options={{
                tabBarLabelStyle: {
                  textTransform: 'capitalize',
                  fontWeight: '500',
                  fontSize: 14,
                  marginTop: -9,
                },
              }}
            />
            <Tab.Screen
              name="eventos"
              component={CommunityEvents}
              initialParams={{clubId: route.params.item.id}}
              options={{
                tabBarLabelStyle: {
                  textTransform: 'capitalize',
                  fontWeight: '500',
                  fontSize: 14,
                  marginTop: -9,
                },
              }}
            />
          </Tab.Navigator>
        )}
      </Flex>
    </Flex>
  );
};

export default CommunityView;
