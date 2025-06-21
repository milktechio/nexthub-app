import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getCommunityEventosAsync} from '../../redux/slices/communitySlice';
import CommunityEventCard from '../../components/CommunityEventCard';
import {Box, ScrollView, Spinner} from 'native-base';

const CommunityEvents = ({route}: any) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.user.jwtToken);

  const getCommunityEventosLoading = useAppSelector(
    state => state.community.getCommunityEventosLoading,
  );
  const getCommunityEventos = useAppSelector(
    state => state.community.getCommunityEventos,
  );

  useEffect(() => {
    dispatch(getCommunityEventosAsync({token, clubId: route.params.clubId}));
  }, []);

  return (
    <ScrollView height={'full'} bg={'brand.primary'} px={6}>
      {getCommunityEventosLoading && <Spinner color="white" mt={6} />}
      {!getCommunityEventosLoading &&
        getCommunityEventos?.map((item: any, i: any) => (
          <CommunityEventCard
            key={i}
            title={item.title}
            des={item.body}
            image={item.image}
            id={item.id}
            location={item.location}
            date={item.date}
          />
        ))}
      <Box h={9} />
    </ScrollView>
  );
};

export default CommunityEvents;
