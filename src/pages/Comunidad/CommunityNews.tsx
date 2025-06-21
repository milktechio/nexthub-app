import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getCommunityNewsAsync} from '../../redux/slices/communitySlice';
import {Box, ScrollView, Spinner} from 'native-base';
import CommunityCard from '../../components/CommunityEventCard';
import CommunityEventCard from '../../components/CommunityEventCard';

const CommunityNews = ({route}: any) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.user.jwtToken);

  const getCommunityNewsLoading = useAppSelector(
    state => state.community.getCommunityNewsLoading,
  );

  const getCommunityNews = useAppSelector(
    state => state.community.getCommunityNews,
  );

  useEffect(() => {
    dispatch(getCommunityNewsAsync({token, clubId: route.params.clubId}));
  }, []);

  return (
    <ScrollView height={'full'} bg={'brand.primary'} px={6}>
      {getCommunityNewsLoading && <Spinner color="white" mt={6} />}
      {!getCommunityNewsLoading &&
        getCommunityNews?.map((item: any, i: any) => (
          <CommunityEventCard
            key={i}
            title={item.title}
            des={item.body}
            image={item.image}
            id={item.id}
          />
        ))}
      <Box h={9} />
    </ScrollView>
  );
};

export default CommunityNews;
