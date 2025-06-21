import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../pages/Login/Login';
import ViajemosJuntos from '../pages/OnBoarding/ViajemosJuntos';
import UltimoPaso from '../pages/OnBoarding/UltimoPaso';
import Chat from '../pages/OnBoarding/Chat';
import TermsAndConditions from '../pages/OnBoarding/TermsAndConditions';
import ReqChangePass from '../pages/Login/ReqChangePass';
import CambiarContraseña from '../pages/Perfil/CambiarContra';

export type MainNavigator = {
  login: undefined;
  viajemosJuntos: undefined;
  chat: undefined;
  ultimoPaso: undefined;
  acceptTerms: undefined;
  reqChangePass: undefined;
  changePass: {id: string};
};

const Stack = createNativeStackNavigator<MainNavigator>();

export default function () {
  const linking = {
    prefixes: ['appbarra://', 'appbarrapassword://'],
    config: {
      screens: {
        changePass: {
          path: 'changePass/:id',
        },
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="viajemosJuntos" component={ViajemosJuntos} />
        <Stack.Screen name="chat" component={Chat} />
        <Stack.Screen name="ultimoPaso" component={UltimoPaso} />
        <Stack.Screen name="acceptTerms" component={TermsAndConditions} />
        <Stack.Screen name="reqChangePass" component={ReqChangePass} />
        <Stack.Screen name="changePass" component={CambiarContraseña} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
