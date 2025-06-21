import React from 'react';
import {Flex, StatusBar, Text, ScrollView, Box} from 'native-base';
import HeaderNav from '../../components/Header';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRibbon} from '@fortawesome/free-solid-svg-icons';

type Props = {};

const Team = (props: Props) => {
  return (
    <>
      <HeaderNav title="Nuestro Equipo" />
      <StatusBar barStyle={'light-content'} />
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        h={'100%'}
        bg={'brand.primary'}>
        <ScrollView mt={12} h="95%" w="85%">
          <Box mb={6}>
            <Text color={'brand.textOff'} fontWeight={'semibold'} fontSize={16}>
              Líder del Proyecto
            </Text>
            <Text color={'white'}>Alfredo Cendejas</Text>
          </Box>
          <Box mb={6}>
            <Text color={'brand.textOff'} fontWeight={'semibold'} fontSize={16}>
              Líder Técnico
            </Text>
            <Text color={'white'}>Diego Gonzalez</Text>
          </Box>
          <Box mb={6}>
            <Text color={'brand.textOff'} fontWeight={'semibold'} fontSize={16}>
              Front End Sr.
            </Text>
            <Text color={'white'}>Jaenn Poumian</Text>
          </Box>
          <Box mb={6}>
            <Text color={'brand.textOff'} fontWeight={'semibold'} fontSize={16}>
              Front End Jr.
            </Text>
            <Text color={'white'}>Alan Guerrero</Text>
          </Box>
          <Box mb={6}>
            <Text color={'brand.textOff'} fontWeight={'semibold'} fontSize={16}>
              Back End Sr.
            </Text>
            <Text color={'white'}>Fernando Villanueva</Text>
          </Box>
          <Box mb={6}>
            <Text color={'brand.textOff'} fontWeight={'semibold'} fontSize={16}>
              Back End Jr.
            </Text>
            <Text color={'white'}>Irving Bravo</Text>
          </Box>
          <Box mb={6}>
            <Text color={'brand.textOff'} fontWeight={'semibold'} fontSize={16}>
              Infraestructura y DevOps
            </Text>
            <Text color={'white'}>Said Saad y Alberto Larios</Text>
          </Box>
          <Box mb={6}>
            <Text color={'brand.textOff'} fontWeight={'semibold'} fontSize={16}>
              QA Tester
            </Text>
            <Text color={'white'}>
              Claudio Cardona{' '}
              <FontAwesomeIcon icon={faRibbon} color="white" size={12} />
            </Text>
          </Box>
        </ScrollView>
      </Flex>
    </>
  );
};

export default Team;
