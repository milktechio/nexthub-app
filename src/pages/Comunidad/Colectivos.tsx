import React from 'react';
import {Flex, FlatList} from 'native-base';
import ItemCard from '../../components/ItemCard';

type Props = {};

const DUMMY_DATA = [
  {
    title: 'Libros reciclados',
    des: 'No te quedes sin tu colección de estos libros rescatados. Ps. estos libros vienen envueltos, asi que sera una sorpresa que titulos te tocan! Participa antes de que se acaben.',
    image: require('../../../assets/books.jpg'),
  },
  {
    title: 'Flotilla de autos Tesla',
    des: 'Hemos comprado una flotilla de autos tesla para esta temporada. No te quedes sin el tuyo y compra el auto de tus sueños!',
    image: require('../../../assets/tesla.jpg'),
  },
];

const Colectivos = (props: Props) => {
  return (
    <Flex alignItems={'center'} h={'100%'} bg="brand.primary" pt={9}>
      <FlatList
        data={DUMMY_DATA}
        renderItem={({item, index}) => (
          <ItemCard
            key={index}
            type="colectivos"
            title={item.title}
            des={item.des}
            image={item.image}
          />
        )}
        w={'100%'}
        px={7}
      />
    </Flex>
  );
};

export default Colectivos;
