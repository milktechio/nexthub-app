import React, {useEffect, useState} from 'react';
import HeaderNav from '../../components/Header';
import {StatusBar, VStack, Text, Input, Button} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  getSingleNews,
  postCommentNews,
  resetPostComment,
} from '../../redux/slices/newsSlice';
import {MainNavigator} from '../../routes/RoutesMain';
import {Alert} from 'react-native';

const NoticiasComment = () => {
  const [comment, setComment] = useState<string>('');
  const route = useRoute<RouteProp<MainNavigator, 'noticiasComment'>>();

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const token = useAppSelector(state => state.user.jwtToken);
  const postCommentLoading = useAppSelector(
    state => state.news.postCommentNewsLoading,
  );
  const postCommentSuccess = useAppSelector(
    state => state.news.postCommentNewsSuccess,
  );
  const postCommentError = useAppSelector(
    state => state.news.postCommentNewsError,
  );

  function sendHandler() {
    const data = {
      token,
      id: route.params.id,
      comment,
    };

    dispatch(postCommentNews(data));
  }

  useEffect(() => {
    if (postCommentSuccess) {
      Alert.alert('Comentario enviado correctamente ✅');
      dispatch(resetPostComment());
      dispatch(getSingleNews({token, id: route.params.id}));

      navigation.goBack();
    }

    if (postCommentError) {
      Alert.alert('Error ❌', 'Por favor intenta de nuevo.');
      setComment('');
      dispatch(resetPostComment());
    }
  }, [postCommentSuccess, postCommentError]);

  return (
    <>
      <HeaderNav title="Dejar Comentario" />
      <StatusBar barStyle={'light-content'} />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          alignItems: 'center',
          height: '100%',
        }}
        style={{backgroundColor: '#0F101E'}}>
        <VStack space={9} w="85%" mt={12}>
          <Text color="brand.textOff">
            Los comentarios están sujetos a los Términos de Uso y el Código de
            Conducta de Barra.
          </Text>
          <Input
            variant="underlined"
            placeholder="Comentario"
            borderColor={'brand.textOff'}
            color={'brand.secondary'}
            placeholderTextColor={'brand.textOff'}
            type="text"
            size={'lg'}
            value={comment}
            onChangeText={setComment}
            autoCapitalize="none"
            _focus={{borderBottomColor: 'brand.accent'}}
          />
          <Button
            bg={'brand.tertiary'}
            _pressed={{opacity: 0.5, backgroundColor: 'brand.teriary'}}
            _loading={{bg: 'brand.teriary', opacity: 1}}
            isLoading={postCommentLoading}
            isLoadingText={'CARGANDO...'}
            onPress={sendHandler}>
            ENVIAR
          </Button>
        </VStack>
      </KeyboardAwareScrollView>
    </>
  );
};

export default NoticiasComment;
