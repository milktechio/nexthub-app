import React from 'react';
import {Box, Text, HStack, VStack, Pressable} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

type Props = {
  data: {
    title: string;
    date: string;
    status: string;
  }[];
};

const TicketList = ({data}: Props) => {
  const navigation = useNavigation();

  function navigateToViewTicketHandler() {
    //@ts-ignore
    navigation.navigate('chatTicket');
  }

  return (
    <>
      {data.map((item, i) => {
        return (
          <Pressable
            mb={6}
            key={i}
            borderRadius={9}
            onPress={navigateToViewTicketHandler}
            bg="#232532"
            _pressed={{opacity: 0.5}}>
            <VStack space={6}>
              <HStack
                pt={5}
                px={5}
                justifyContent="space-between"
                alignItems="center">
                <Text
                  fontSize={20}
                  color="brand.secondary"
                  fontWeight={'semibold'}>
                  {item.title}
                </Text>
                <VStack>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    size={18}
                    color="#1594DB"
                  />
                </VStack>
              </HStack>
              <HStack
                pb={5}
                px={5}
                alignItems="center"
                justifyContent="space-between">
                <Text fontSize={14} color="brand.secondary">
                  {item.date}
                </Text>
                <HStack space={3}>
                  <Text fontSize={14} color="brand.secondary">
                    {item.status}
                  </Text>
                  <Box
                    alignSelf="center"
                    borderRadius={15}
                    bg="brand.accent"
                    size={3}
                  />
                </HStack>
              </HStack>
            </VStack>
          </Pressable>
        );
      })}
    </>
  );
};

export default TicketList;
