import React from 'react';
import {Flex, FlatList} from 'native-base';
import ItemCard from '../../components/ItemCard';
import {useAppSelector} from '../../redux/hooks';

const Votaciones = () => {
  const votos = useAppSelector(state => state.community.getVotos);

  return (
    <Flex alignItems={'center'} h={'100%'} bg="brand.primary" pt={6}>
      <FlatList
        data={votos}
        renderItem={({item, index}: any) => (
          <ItemCard
            key={index}
            type="votaciones"
            title={item.title}
            des={item.description}
            image={item.image}
            date={item.created_at}
            id={item.id}
            minimum={item.minimum_participations}
            participations={item.participations_count}
            options={item.options}
          />
        )}
        w={'100%'}
        px={7}
      />
    </Flex>
  );
};

export default Votaciones;
