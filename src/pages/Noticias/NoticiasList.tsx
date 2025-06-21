import React from 'react';
import HeaderNav from '../../components/Header';
import {FlatList, Flex, StatusBar} from 'native-base';
import NoticiasItem from '../../components/NoticiasItem';
import {useAppSelector} from '../../redux/hooks';

type Props = {};

const NoticiasList = (props: Props) => {
  const newsData = useAppSelector(state => state.news.getNewsData);

  return (
    <>
      <HeaderNav title="Noticias" />
      <StatusBar barStyle={'light-content'} />
      <Flex alignItems={'center'} flex={1} bg="brand.primary" pt={6}>
        <FlatList
          data={newsData}
          renderItem={({item, index}: any) => (
            <NoticiasItem
              key={index}
              title={item.title}
              des={item.body}
              image={item.image}
              id={item.id}
            />
          )}
          w={'100%'}
          px={7}
        />
      </Flex>
    </>
  );
};

export default NoticiasList;
