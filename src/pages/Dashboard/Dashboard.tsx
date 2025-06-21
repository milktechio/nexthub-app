import React, {useEffect} from 'react';
import {Image, StatusBar, Text} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Menu from './Menu';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBars,
  faEarthAmericas,
  faHouse,
  faPeopleGroup,
  faPeopleRoof,
} from '@fortawesome/free-solid-svg-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {useAppSelector} from '../../redux/hooks';
import Admin from '../Admin/Admin';
import Comunidades from './Comunidades';

export type MainNavigator = {
  home: undefined;
  comunidades: undefined;
  comunidadesEventos: undefined;
  admin: undefined;
  menu: undefined;
};

const Tab = createBottomTabNavigator<MainNavigator>();

const Dashboard = () => {
  const userProfile = useAppSelector(state => state.user.getUserProfile);

  const screenOpacity = useSharedValue(1);
  const screenZIndex = useSharedValue(1000);
  const imageOpacity = useSharedValue(0);
  const imageScale = useSharedValue(1.15);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: withDelay(
        2500,
        withTiming(screenOpacity.value, {
          duration: 1000,
        }),
      ),
      zIndex: withDelay(
        3500,
        withTiming(screenZIndex.value, {
          duration: 0,
        }),
      ),
    };
  });

  const animatedStylesImage = useAnimatedStyle(() => {
    return {
      opacity: withDelay(
        0,
        withTiming(imageOpacity.value, {
          duration: 1000,
        }),
      ),
      transform: [
        {
          scale: withDelay(
            500,
            withTiming(imageScale.value, {
              duration: 1000,
            }),
          ),
        },
      ],
    };
  });

  useEffect(() => {
    screenOpacity.value = 0;
    imageOpacity.value = 1;
    imageScale.value = 0.8;
    screenZIndex.value = 0;
  }, []);

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <Animated.View
        style={[
          {
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#0F101E',
          },
          animatedStyles,
        ]}>
        <Animated.View style={[animatedStylesImage]}>
          <Image
            source={require('../../../assets/logo-login.png')}
            alt="logoImg"
            height={160}
            resizeMode="contain"
            alignSelf={'center'}
          />
          <Text
            color={'brand.secondary'}
            fontSize={'4xl'}
            px={12}
            fontWeight={'bold'}
            mt={12}>
            ¡Hola, {userProfile?.data?.username}!
          </Text>
        </Animated.View>
      </Animated.View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#C219ED',
          tabBarInactiveTintColor: '#656997',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#0F101E',
            borderTopColor: '#656997',
            paddingTop: 10,
          },
        }}>
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon icon={faHouse} color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="comunidades"
          component={Comunidades}
          options={{
            tabBarLabel: 'Comunidades',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon icon={faEarthAmericas} color={color} size={23} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="admin"
          component={Admin}
          options={{
            tabBarLabel: 'Admin',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon icon={faPeopleGroup} color={color} size={23} />
            ),
          }}
        /> */}
        <Tab.Screen
          name="menu"
          component={Menu}
          options={{
            tabBarLabel: 'Menú',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon icon={faBars} color={color} size={25} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Dashboard;
