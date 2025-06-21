import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const Route_Gateway = 'https://prd-gateways.barra.mx/';

interface InitialState {
  getNewsLoading: boolean;
  getNewsSuccess: boolean;
  getNewsError: boolean;
  getNewsData: any;

  getSingleNewsLoading: boolean;
  getSingleNewsSuccess: boolean;
  getSingleNewsError: boolean;
  getSingleNewsData: any;

  postLikeNewsLoading: boolean;
  postLikeNewsSuccess: boolean;
  postLikeNewsError: boolean;
  postLikeNews: any;

  postCommentNewsLoading: boolean;
  postCommentNewsSuccess: boolean;
  postCommentNewsError: boolean;
}

const initialState: InitialState = {
  getNewsLoading: false,
  getNewsSuccess: false,
  getNewsError: false,
  getNewsData: [],

  getSingleNewsLoading: false,
  getSingleNewsSuccess: false,
  getSingleNewsError: false,
  getSingleNewsData: [],

  postLikeNewsLoading: false,
  postLikeNewsSuccess: false,
  postLikeNewsError: false,
  postLikeNews: [],

  postCommentNewsLoading: false,
  postCommentNewsSuccess: false,
  postCommentNewsError: false,
};

export const getNews = createAsyncThunk(
  'get/news',
  async (token: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${Route_Gateway}api/community/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          is_news: 1,
          club_id: '_NULL_',
        },
      });

      return response.data.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const postLikeNews = createAsyncThunk(
  'postLike/news',
  async (data: {token: string; id: string}, thunkAPI) => {
    try {
      const response = await axios.get(
        `${Route_Gateway}api/community/events/${data.id}/like`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        },
      );

      return response.data.data;
    } catch (e: any) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const getSingleNews = createAsyncThunk(
  'getSingle/news',
  async (data: {token: string; id: string}, thunkAPI) => {
    try {
      const response = await axios.get(
        `${Route_Gateway}api/community/events/${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        },
      );

      return response.data;
    } catch (e: any) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const postCommentNews = createAsyncThunk(
  'postComment/news',
  async (data: {token: string; id: string; comment: string}, thunkAPI) => {
    console.log(data);
    try {
      const response = await axios.post(
        `${Route_Gateway}api/community/events/${data.id}/comment/`,
        {
          comment: data.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        },
      );

      return response.data;
    } catch (e: any) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    resetPostLikeNews: state => {
      state.postLikeNewsSuccess = false;
      state.postLikeNewsLoading = false;
      state.postLikeNewsError = false;
      state.postLikeNews = [];
    },
    resetPostComment: state => {
      state.postCommentNewsLoading = false;
      state.postCommentNewsSuccess = false;
      state.postCommentNewsError = false;
    },
    resetGetSingleNews: state => {
      state.getSingleNewsLoading = false;
      state.getSingleNewsSuccess = false;
      state.getSingleNewsError = false;
      state.getSingleNewsData = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getNews.pending, (state, action) => {
        state.getNewsLoading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.getNewsLoading = false;
        state.getNewsSuccess = true;
        state.getNewsData = action.payload;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.getNewsLoading = false;
        state.getNewsSuccess = false;
        state.getNewsError = true;
      })
      .addCase(getSingleNews.pending, (state, action) => {
        state.getSingleNewsLoading = true;
      })
      .addCase(getSingleNews.fulfilled, (state, action) => {
        state.getSingleNewsLoading = false;
        state.getSingleNewsSuccess = true;
        state.getSingleNewsData = action.payload;
      })
      .addCase(getSingleNews.rejected, (state, action) => {
        state.getSingleNewsLoading = false;
        state.getSingleNewsSuccess = false;
        state.getSingleNewsError = true;
      })
      .addCase(postLikeNews.pending, (state, action) => {
        state.postLikeNewsLoading = true;
      })
      .addCase(postLikeNews.fulfilled, (state, action) => {
        state.postLikeNewsLoading = false;
        state.postLikeNewsSuccess = true;
        state.postLikeNews = action.payload;
      })
      .addCase(postLikeNews.rejected, (state, action) => {
        state.postLikeNewsLoading = false;
        state.postLikeNewsError = true;
      })
      .addCase(postCommentNews.pending, (state, action) => {
        state.postCommentNewsLoading = true;
      })
      .addCase(postCommentNews.fulfilled, (state, action) => {
        state.postCommentNewsLoading = false;
        state.postCommentNewsSuccess = true;
      })
      .addCase(postCommentNews.rejected, (state, action) => {
        state.postCommentNewsLoading = false;
        state.postCommentNewsError = true;
      });
  },
});

export const {resetPostLikeNews, resetPostComment, resetGetSingleNews} =
  newsSlice.actions;
export default newsSlice.reducer;
