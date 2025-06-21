import {Box, FlatList, Flex, HStack, Menu, Pressable, Text} from 'native-base';
import React from 'react';
import ComunidadCard from '../../components/ComunidadCard';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faMagnifyingGlass,
  faPlus,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../redux/hooks';

const Comunidades = () => {
  const navigation = useNavigation();
  const clubs = useAppSelector(state => state.community.getClubsInfo);

  function navigateToCommunityHandler(item: {}) {
    // @ts-ignore
    navigation.navigate('communityView', {item});
  }

  function navigateToCreateOrSearchHandler(type: 'new' | 'search') {
    if (type === 'new') {
      // @ts-ignore
      navigation.navigate('newCommunity');
      return;
    }

    if (type === 'search') {
      // @ts-ignore
      navigation.navigate('searchCommunity');
      return;
    }
  }

  return (
    <Flex bg="brand.primary" flex={1} position={'relative'}>
      <Box position={'absolute'} right={6} bottom={9} zIndex={1000}>
        <Menu
          bg="brand.tertiary"
          w="200"
          borderRadius={10}
          shouldOverlapWithTrigger={false} // @ts-ignore
          placement="top right"
          trigger={triggerProps => {
            return (
              <Pressable
                {...triggerProps}
                bg="brand.tertiary"
                borderRadius={'full'}
                zIndex={1000}
                _pressed={{opacity: 0.5}}
                p={3}>
                <FontAwesomeIcon icon={faPlus} color="white" size={30} />
              </Pressable>
            );
          }}>
          <Menu.Item
            onPress={() => navigateToCreateOrSearchHandler('new')}
            _pressed={{opacity: 0.5}}>
            <HStack flexDir={'row'} alignItems={'center'} space={3}>
              <FontAwesomeIcon icon={faPlusCircle} color="white" size={15} />
              <Text color="white">Nueva Comunidad</Text>
            </HStack>
          </Menu.Item>
          <Menu.Item
            onPress={() => navigateToCreateOrSearchHandler('search')}
            _pressed={{opacity: 0.5}}>
            <HStack flexDir={'row'} alignItems={'center'} space={3}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                color="white"
                size={15}
              />
              <Text color="white">Buscar Comunidad</Text>
            </HStack>
          </Menu.Item>
        </Menu>
      </Box>
      <Text
        color={'white'}
        bg={'brand.primary'}
        pt={70}
        pb={5}
        fontSize={'3xl'}
        fontWeight={'semibold'}
        pl={7}>
        Mis comunidades
      </Text>
      {clubs.length > 0 ? (
        <FlatList
          px={6}
          ItemSeparatorComponent={() => <Box h={6} />}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={clubs}
          numColumns={2}
          renderItem={({item}) => (
            <ComunidadCard
              //@ts-ignore
              desc={item.description}
              //@ts-ignore
              miembros={item.members_count}
              //@ts-ignore
              location={item.city}
              //@ts-ignore
              title={item.name}
              //@ts-ignore
              img={item.image?.replace('http://', 'https://')}
              //@ts-ignore
              onPress={() => navigateToCommunityHandler(item)}
            />
          )}
        />
      ) : (
        <Text textAlign={'center'} color="brand.textOff">
          No tienes comunidades.
        </Text>
      )}
    </Flex>
  );
};

export default Comunidades;
