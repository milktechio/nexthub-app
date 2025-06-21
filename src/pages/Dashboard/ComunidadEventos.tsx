import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Votaciones from '../Comunidad/Votaciones';
import Retos from '../Comunidad/Retos';

export type TopNavigator = {
  votaciones: undefined;
  colectivos: undefined;
  eventos: undefined;
};

const Tab = createMaterialTopTabNavigator<TopNavigator>();

const ComunidadEventos = () => {
  return (
    <Tab.Navigator
      style={{backgroundColor: '#0F101E'}}
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
          marginTop: 20,
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
        name="votaciones"
        component={Votaciones}
        options={{
          tabBarLabelStyle: {
            textTransform: 'capitalize',
            fontWeight: '500',
            fontSize: 14,
            marginTop: -9,
          },
        }}
      />
      {/* <Tab.Screen
          name="colectivos"
          component={Colectivos}
          options={{
            tabBarLabelStyle: {
              textTransform: 'capitalize',
              fontWeight: '500',
              fontSize: 14,
              marginTop: -5,
            },
          }}
        /> */}
      <Tab.Screen
        name="eventos"
        component={Retos}
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
  );
};

export default ComunidadEventos;
