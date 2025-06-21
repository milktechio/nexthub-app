import React from 'react';
import {Flex, FlatList} from 'native-base';
import ItemCard from '../../components/ItemCard';
import {useAppSelector} from '../../redux/hooks';
import {Alert} from 'react-native';

const Retos = () => {
  const retos = useAppSelector(state => state.community.getRetos);

  return (
    <Flex alignItems={'center'} h={'100%'} bg="brand.primary" pt={9}>
      <FlatList
        data={retos}
        renderItem={({item, index}: any) => (
          <ItemCard
            key={index}
            type="retos"
            title={item.title}
            des={item.description}
            image={item.image}
            date={item.created_at}
            id={item.id}
            participations={item.evidences_count}
          />
        )}
        w={'100%'}
        px={7}
      />
    </Flex>
  );
};

export default Retos;
