import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Platform} from 'react-native';
const BACK_ADDRESS = 'https://prd-gateways.barra.mx/';

export const getVotosAsync = createAsyncThunk(
  'getVotos/comunidad',
  async (token: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${BACK_ADDRESS}api/community/vote?page=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Votos', response.data.data);
      return response.data;
    } catch (e: any) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data);
    }
  },
);

export const votosDetailAsync = createAsyncThunk(
  'getVotosDetail/comunidad',
  async (data: {token: string; voteId: string}, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${BACK_ADDRESS}api/community/vote/${data.voteId}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        },
      );

      console.log('DETAIL', response.data.data);
      return response.data.data;
    } catch (e: any) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data);
    }
  },
);

export const voteActionAsync = createAsyncThunk(
  'vote/comunidad',
  async (
    data: {token: string; voteId: string; option: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await axios.post(
        `${BACK_ADDRESS}api/community/voting`,
        {
          option: data.option,
          vote_id: data.voteId,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        },
      );

      console.log(response.data.data);
      return response.data;
    } catch (e: any) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data);
    }
  },
);

export const getVoteResultAsync = createAsyncThunk(
  'getResultvote/comunidad',
  async (data: {token: string; voteId: string}, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${BACK_ADDRESS}api/community/vote/${data.voteId}/result`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        },
      );

      console.log('RESULT', response.data.data);
      return response.data.data;
    } catch (e: any) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data);
    }
  },
);

export const getRetosAsync = createAsyncThunk(
  'getRetos/comunidad',
  async (token: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${BACK_ADDRESS}api/community/challenge?page=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Retos', response.data.data);

      return response.data;
    } catch (e: any) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data.msg);
    }
  },
);

export const getEventosAsync = createAsyncThunk(
  'getEventos/comunidad',
  async (token: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${BACK_ADDRESS}api/community/events?page=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (e: any) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data.msg);
    }
  },
);

export const postEventAsync = createAsyncThunk(
  'postEvent/community',
  async (
    data: {
      token: string;
      body: string;
      image: any;
      title: string;
      club_id: string;
      is_news: number;
      location?: string;
      date?: string;
    },
    thunkAPI,
  ) => {
    data.image.url =
      Platform.OS === 'android' ? data.image.uri : 'file://' + data.image.uri;
    let formData = new FormData();

    formData.append('body', data.body);
    formData.append('image', data.image);
    formData.append('title', data.title);
    formData.append('club_id', data.club_id);
    formData.append('location', data.location);
    formData.append('date', data.date);

    try {
      const response = await axios.post(
        `${BACK_ADDRESS}api/community/events/save`,
        formData,
        {
          headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${data.token}`,
          },
          params: {
            is_news: data.is_news,
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

export const createClubAsync = createAsyncThunk(
  'club/register',
  async (
    data: {
      token: string;
      description: string;
      image: any;
      name: string;
      city: string;
    },
    {rejectWithValue},
  ) => {
    data.image.url =
      Platform.OS === 'android' ? data.image.uri : 'file://' + data.image.uri;
    let formData = new FormData();

    formData.append('description', data.description);
    formData.append('image', data.image);
    formData.append('name', data.name);
    formData.append('city', data.city);

    try {
      const response = await axios.post(
        `${BACK_ADDRESS}api/community/clubs`,
        formData,
        {
          headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${data.token}`,
          },
        },
      );

      return response.data.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const getMyClubsAsync = createAsyncThunk(
  'getClubs/comunidad',
  async (token: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${BACK_ADDRESS}api/community/clubs/mine`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data.data;
    } catch (e: any) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data.msg);
    }
  },
);

export const searchClubsAsync = createAsyncThunk(
  'searchClubs/comunidad',
  async (data: {token: string; title: string}, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${BACK_ADDRESS}api/community/clubs`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        params: {
          s: data.title.trim(),
        },
      });

      return response.data;
    } catch (e: any) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data.msg);
    }
  },
);

export const joinClubsAsync = createAsyncThunk(
  'joinClubs/comunidad',
  async (data: {token: string; clubId: string}, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${BACK_ADDRESS}api/community/clubs/${data.clubId}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        },
      );

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.msg);
    }
  },
);

export const exitClubsAsync = createAsyncThunk(
  'exitClubs/comunidad',
  async (data: {token: string; clubId: string}, {rejectWithValue}) => {
    try {
      const response = await axios.delete(
        `${BACK_ADDRESS}api/community/clubs/${data.clubId}/leave`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        },
      );

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.msg);
    }
  },
);

export const getCommunityEventosAsync = createAsyncThunk(
  'getCommunityEventos/comunidad',
  async (data: {token: string; clubId: string}, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${BACK_ADDRESS}api/community/events`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        params: {
          page: 1,
          club_id: data.clubId,
          is_news: 0,
        },
      });

      return response.data.data.data;
    } catch (e: any) {
      console.log('Error get eventos', e.response.data);
      return rejectWithValue(e.response.data.msg);
    }
  },
);

export const getCommunityNewsAsync = createAsyncThunk(
  'getCommunityNews/comunidad',
  async (data: {token: string; clubId: string}, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${BACK_ADDRESS}api/community/events`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        params: {
          page: 1,
          club_id: data.clubId,
          is_news: 1,
        },
      });

      return response.data.data.data;
    } catch (e: any) {
      console.log('Error get news', e.response.data);
      return rejectWithValue(e.response.data.msg);
    }
  },
);

//* ================================================================================

interface InitialState {
  getVotosLoading: boolean;
  getVotosSuccess: boolean;
  getVotosError: boolean;
  getVotosErrorMsg: string;
  getVotos: [];

  getRetosLoading: boolean;
  getRetosSuccess: boolean;
  getRetosError: boolean;
  getRetosErrorMsg: string;
  getRetos: [];

  searchClubsLoading: boolean;
  searchClubsSuccess: boolean;
  searchClubsError: boolean;
  searchClubsErrorMsg: string;
  searchClubs: [];

  getEventosLoading: boolean;
  getEventosSuccess: boolean;
  getEventosError: boolean;
  getEventosErrorMsg: string;
  getEventos: [];

  postClubLoading: boolean;
  postClubSuccess: boolean;
  postClubError: boolean;
  postClubMsg: string;

  postEventLoading: boolean;
  postEventSuccess: boolean;
  postEventError: boolean;

  voteLoading: boolean;
  voteSuccess: boolean;
  voteError: boolean;

  voteDetailLoading: boolean;
  voteDetailSuccess: boolean;
  voteDetailError: boolean;
  voteDetail: any;

  getVoteResultLoading: boolean;
  getVoteResultSuccess: boolean;
  getVoteResultError: boolean;
  getVoteResultErrorMsg: string;
  getVoteResult: [];

  getClubsLoading: boolean;
  getClubsSuccess: boolean;
  getClubsError: boolean;
  getClubsMsg: string;
  getClubsInfo: any;

  joinClubLoading: boolean;
  joinClubSuccess: boolean;
  joinClubError: boolean;

  exitClubLoading: boolean;
  exitClubSuccess: boolean;
  exitClubError: boolean;

  getCommunityEventosLoading: boolean;
  getCommunityEventosSuccess: boolean;
  getCommunityEventosError: boolean;
  getCommunityEventosErrorMsg: string;
  getCommunityEventos: [];

  getCommunityNewsLoading: boolean;
  getCommunityNewsSuccess: boolean;
  getCommunityNewsError: boolean;
  getCommunityNewsErrorMsg: string;
  getCommunityNews: [];
}

const initialState: InitialState = {
  getVotosLoading: false,
  getVotosSuccess: false,
  getVotosError: false,
  getVotosErrorMsg: '',
  getVotos: [],

  getRetosLoading: false,
  getRetosSuccess: false,
  getRetosError: false,
  getRetosErrorMsg: '',
  getRetos: [],

  searchClubsLoading: false,
  searchClubsSuccess: false,
  searchClubsError: false,
  searchClubsErrorMsg: '',
  searchClubs: [],

  getEventosLoading: false,
  getEventosSuccess: false,
  getEventosError: false,
  getEventosErrorMsg: '',
  getEventos: [],

  postClubLoading: false,
  postClubSuccess: false,
  postClubError: false,
  postClubMsg: '',

  postEventLoading: false,
  postEventSuccess: false,
  postEventError: false,

  voteLoading: false,
  voteSuccess: false,
  voteError: false,

  voteDetailLoading: false,
  voteDetailSuccess: false,
  voteDetailError: false,
  voteDetail: [],

  getVoteResultLoading: false,
  getVoteResultSuccess: false,
  getVoteResultError: false,
  getVoteResultErrorMsg: '',
  getVoteResult: [],

  getClubsLoading: false,
  getClubsSuccess: false,
  getClubsError: false,
  getClubsMsg: '',
  getClubsInfo: [],

  joinClubLoading: false,
  joinClubSuccess: false,
  joinClubError: false,

  exitClubLoading: false,
  exitClubSuccess: false,
  exitClubError: false,

  getCommunityEventosLoading: false,
  getCommunityEventosSuccess: false,
  getCommunityEventosError: false,
  getCommunityEventosErrorMsg: '',
  getCommunityEventos: [],

  getCommunityNewsLoading: false,
  getCommunityNewsSuccess: false,
  getCommunityNewsError: false,
  getCommunityNewsErrorMsg: '',
  getCommunityNews: [],
};

//* ================================================================================

export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    resetPostClub: state => {
      state.postClubLoading = false;
      state.postClubSuccess = false;
      state.postClubError = false;
      state.postClubMsg = '';
    },
    resetGetClubs: state => {
      state.getClubsLoading = false;
      state.getClubsSuccess = false;
      state.getClubsError = false;
      state.getClubsMsg = '';
      state.getClubsInfo = [];
    },
    resetJoinCommunity: state => {
      state.joinClubSuccess = false;
      state.joinClubError = false;
      state.joinClubLoading = false;
    },
    resetExitCommunity: state => {
      state.exitClubSuccess = false;
      state.exitClubError = false;
      state.exitClubLoading = false;
    },
    resetPostEvents: state => {
      state.postEventSuccess = false;
      state.postEventLoading = false;
      state.postEventError = false;
    },
    resetVote: state => {
      state.voteSuccess = false;
      state.voteError = false;
      state.voteLoading = false;
    },
    resetGetVoteResult: state => {
      state.getVoteResult = [];
      state.getVoteResultError = false;
      state.getVoteResultLoading = false;
      state.getVoteResultSuccess = false;
    },
    resetGetVoteDetail: state => {
      state.voteDetailLoading = false;
      state.voteDetailError = false;
      state.voteDetailSuccess = false;
      state.voteDetail = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getVotosAsync.pending, (state, action) => {
        state.getVotosLoading = true;
      })
      .addCase(getVotosAsync.fulfilled, (state, action) => {
        state.getVotosLoading = false;
        state.getVotosSuccess = true;
        state.getVotos = action.payload.data.data;
      })
      .addCase(getVotosAsync.rejected, (state, action: any) => {
        state.getVotosError = true;
        state.getVotosLoading = false;
        state.getVotosErrorMsg = action.payload;
      })
      .addCase(getRetosAsync.pending, (state, action) => {
        state.getRetosLoading = true;
      })
      .addCase(getRetosAsync.fulfilled, (state, action) => {
        state.getRetosLoading = false;
        state.getRetosSuccess = true;
        state.getRetos = action.payload.data.data;
      })
      .addCase(getRetosAsync.rejected, (state, action: any) => {
        state.getRetosError = true;
        state.getRetosLoading = false;
        state.getRetosErrorMsg = action.payload;
      })
      .addCase(searchClubsAsync.pending, (state, action) => {
        state.searchClubsLoading = true;
      })
      .addCase(searchClubsAsync.fulfilled, (state, action) => {
        state.searchClubsLoading = false;
        state.searchClubsSuccess = true;
        state.searchClubs = action.payload.data;
      })
      .addCase(searchClubsAsync.rejected, (state, action: any) => {
        state.searchClubsError = true;
        state.searchClubsLoading = false;
        state.searchClubsErrorMsg = action.payload;
      })
      .addCase(createClubAsync.pending, (state, action) => {
        state.postClubLoading = true;
      })
      .addCase(createClubAsync.fulfilled, (state, action) => {
        state.postClubLoading = false;
        state.postClubSuccess = true;
      })
      .addCase(createClubAsync.rejected, (state, action: any) => {
        state.postClubError = true;
        state.postClubLoading = false;
        state.postClubMsg = action.payload;
      })
      .addCase(getMyClubsAsync.pending, (state, action) => {
        state.getClubsLoading = true;
      })
      .addCase(getMyClubsAsync.fulfilled, (state, action) => {
        state.getClubsLoading = false;
        state.getClubsSuccess = true;
        state.getClubsInfo = action.payload;
      })
      .addCase(getMyClubsAsync.rejected, (state, action: any) => {
        state.getClubsError = true;
        state.getClubsLoading = false;
        state.getClubsMsg = action.payload;
      })
      .addCase(getEventosAsync.pending, (state, action) => {
        state.getEventosLoading = true;
      })
      .addCase(getEventosAsync.fulfilled, (state, action) => {
        state.getEventosLoading = false;
        state.getEventosSuccess = true;
        state.getEventos = action.payload;
      })
      .addCase(getEventosAsync.rejected, (state, action: any) => {
        state.getEventosError = true;
        state.getEventosLoading = false;
      })
      .addCase(postEventAsync.pending, (state, action) => {
        state.postEventLoading = true;
      })
      .addCase(postEventAsync.fulfilled, (state, action) => {
        state.postEventLoading = false;
        state.postEventSuccess = true;
      })
      .addCase(postEventAsync.rejected, (state, action: any) => {
        state.postEventError = true;
        state.postEventLoading = false;
      })
      .addCase(joinClubsAsync.pending, (state, action) => {
        state.joinClubLoading = true;
      })
      .addCase(joinClubsAsync.fulfilled, (state, action) => {
        state.joinClubLoading = false;
        state.joinClubSuccess = true;
      })
      .addCase(joinClubsAsync.rejected, (state, action: any) => {
        state.joinClubError = true;
        state.joinClubLoading = false;
      })
      .addCase(exitClubsAsync.pending, (state, action) => {
        state.exitClubLoading = true;
      })
      .addCase(exitClubsAsync.fulfilled, (state, action) => {
        state.exitClubLoading = false;
        state.exitClubSuccess = true;
      })
      .addCase(exitClubsAsync.rejected, (state, action: any) => {
        state.exitClubError = true;
        state.exitClubLoading = false;
      })
      .addCase(getCommunityEventosAsync.pending, (state, action) => {
        state.getCommunityEventosLoading = true;
      })
      .addCase(getCommunityEventosAsync.fulfilled, (state, action) => {
        state.getCommunityEventosLoading = false;
        state.getCommunityEventosSuccess = true;
        state.getCommunityEventos = action.payload;
      })
      .addCase(getCommunityEventosAsync.rejected, (state, action: any) => {
        state.getCommunityEventosError = true;
        state.getCommunityEventosLoading = false;
      })
      .addCase(getCommunityNewsAsync.pending, (state, action) => {
        state.getCommunityNewsLoading = true;
      })
      .addCase(getCommunityNewsAsync.fulfilled, (state, action) => {
        state.getCommunityNewsLoading = false;
        state.getCommunityNewsSuccess = true;
        state.getCommunityNews = action.payload;
      })
      .addCase(getCommunityNewsAsync.rejected, (state, action: any) => {
        state.getCommunityNewsError = true;
        state.getCommunityNewsLoading = false;
      })
      .addCase(voteActionAsync.pending, (state, action) => {
        state.voteLoading = true;
      })
      .addCase(voteActionAsync.fulfilled, (state, action) => {
        state.voteLoading = false;
        state.voteSuccess = true;
      })
      .addCase(voteActionAsync.rejected, (state, action: any) => {
        state.voteError = true;
        state.voteLoading = false;
      })
      .addCase(getVoteResultAsync.pending, (state, action) => {
        state.getVoteResultLoading = true;
      })
      .addCase(getVoteResultAsync.fulfilled, (state, action) => {
        state.getVoteResultLoading = false;
        state.getVoteResultSuccess = true;
        state.getVoteResult = action.payload;
      })
      .addCase(getVoteResultAsync.rejected, (state, action: any) => {
        state.getVoteResultError = true;
        state.getVoteResultLoading = false;
      })
      .addCase(votosDetailAsync.pending, (state, action) => {
        state.voteDetailLoading = true;
      })
      .addCase(votosDetailAsync.fulfilled, (state, action) => {
        state.voteDetailLoading = false;
        state.voteDetailSuccess = true;
        state.voteDetail = action.payload;
      })
      .addCase(votosDetailAsync.rejected, (state, action: any) => {
        state.voteDetailError = true;
        state.voteDetailLoading = false;
      });
  },
});

export const {
  resetPostClub,
  resetJoinCommunity,
  resetExitCommunity,
  resetPostEvents,
  resetVote,
  resetGetVoteResult,
  resetGetVoteDetail,
} = communitySlice.actions;
export default communitySlice.reducer;
