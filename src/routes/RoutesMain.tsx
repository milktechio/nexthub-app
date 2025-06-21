import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Dashboard from '../pages/Dashboard/Dashboard';
import InviteQr from '../pages/Perfil/InvitarQR';
import TermsAndConditions from '../pages/Perfil/TermsAndConditions';
import Perfil from '../pages/Perfil/Perfil';
import EditarPerfil from '../pages/Perfil/EditarPerfil';
import EditarBio from '../pages/Perfil/EditarBio';
import NoticiasList from '../pages/Noticias/NoticiasList';
import NoticiasSingleView from '../pages/Noticias/NoticiasSingleView';
import ColectivosDetails from '../pages/Comunidad/ColectivosDetails';
import RetosDetails from '../pages/Comunidad/RetosDetails';
import VotacionesDetails from '../pages/Comunidad/VotacionesDetails';
import Soporte from '../pages/Soporte/Soporte';
import NuevoTicket from '../pages/Soporte/NuevoTicket';
import RetosEvidence from '../pages/Comunidad/RetosEvidence';
import ColectivoBuy from '../pages/Comunidad/ColectivoBuy';
import ColectivoSuccess from '../pages/Comunidad/ColectivoSuccess';
import ChatTicket from '../pages/Soporte/ChatTicket';
import Team from '../pages/Perfil/Team';
import EditExperience from '../pages/Perfil/EditExperience';
import CambiarContraseña from '../pages/Perfil/CambiarContra';
import EliminarUsuario from '../pages/Perfil/EliminarUsuario';
import EliminarUsuarioReq from '../pages/Perfil/EliminarUsuarioReq';
import ComunidadEventos from '../pages/Dashboard/ComunidadEventos';
import NewCommunity from '../pages/Dashboard/NewCommunity';
import SearchCommunity from '../pages/Dashboard/SearchCommunity';
import EditCommunityAdmin from '../pages/Admin/EditCommunityAdmin';
import NoticiasComment from '../pages/Noticias/NoticiasComment';
import CommunityView from '../pages/Comunidad/CommunityView';
import CreateNewItemCommunity from '../pages/Comunidad/CreateNewItemCommunity';

type CommunityType = {
  title: string;
  des: string;
  image: string;
  id: string;
  date: string;
  options?: string[];
  minimum?: number;
  participations?: number;
};

export type MainNavigator = {
  dashboard: undefined;
  invite: undefined;
  termsAndCond: undefined;
  profile: undefined;
  changePass: undefined;
  editProfile: undefined;
  editBio: undefined;
  editExperience: undefined;
  deleteUser: undefined;
  deleteUserReq: undefined;
  communityView: {item: any};
  createNewItemCommunity: {clubId: any; type: string};

  support: undefined;
  newTicket: undefined;
  chatTicket: {id: string};

  noticiasList: undefined;
  noticiasSingleView: {
    title: string;
    des: string;
    image: string;
    id: string;
    likesCount: string;
    location: string;
    date: string;
  };
  noticiasComment: {id: string};

  retosDetails: CommunityType;
  retosEvidence: {id?: string};

  votacionesDetails: CommunityType;

  colectivosDetails: CommunityType;
  colectivoBuy: {id?: string};
  colectivoSuccess: {id?: string};

  team: undefined;

  comunidadEventos: {title: string};
  newCommunity: undefined;
  searchCommunity: undefined;
  editCommunityAdmin: {id: string; title: string; img: string; des: string};
};

const Stack = createNativeStackNavigator<MainNavigator>();

export default function () {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="dashboard" component={Dashboard} />
        <Stack.Screen name="invite" component={InviteQr} />
        <Stack.Screen name="termsAndCond" component={TermsAndConditions} />
        <Stack.Screen name="profile" component={Perfil} />
        <Stack.Screen name="editProfile" component={EditarPerfil} />
        <Stack.Screen name="editBio" component={EditarBio} />
        <Stack.Screen name="editExperience" component={EditExperience} />
        <Stack.Screen name="noticiasList" component={NoticiasList} />
        <Stack.Screen name="support" component={Soporte} />
        <Stack.Screen name="newTicket" component={NuevoTicket} />
        <Stack.Screen name="chatTicket" component={ChatTicket} />
        <Stack.Screen
          name="noticiasSingleView"
          component={NoticiasSingleView}
        />
        <Stack.Screen name="noticiasComment" component={NoticiasComment} />
        <Stack.Screen name="colectivosDetails" component={ColectivosDetails} />
        <Stack.Screen name="retosDetails" component={RetosDetails} />
        <Stack.Screen name="votacionesDetails" component={VotacionesDetails} />
        <Stack.Screen name="retosEvidence" component={RetosEvidence} />
        <Stack.Screen name="colectivoBuy" component={ColectivoBuy} />
        <Stack.Screen name="colectivoSuccess" component={ColectivoSuccess} />
        <Stack.Screen name="team" component={Team} />
        <Stack.Screen name="changePass" component={CambiarContraseña} />
        <Stack.Screen name="deleteUser" component={EliminarUsuario} />
        <Stack.Screen name="deleteUserReq" component={EliminarUsuarioReq} />
        <Stack.Screen name="comunidadEventos" component={ComunidadEventos} />
        <Stack.Screen name="newCommunity" component={NewCommunity} />
        <Stack.Screen name="searchCommunity" component={SearchCommunity} />
        <Stack.Screen name="communityView" component={CommunityView} />
        <Stack.Screen
          name="createNewItemCommunity"
          component={CreateNewItemCommunity}
        />
        <Stack.Screen
          name="editCommunityAdmin"
          component={EditCommunityAdmin}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
