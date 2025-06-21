import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {BACK_ADDRESS} from '@env';
import axios from 'axios';

interface InitialState {}

const initialState: InitialState = {};

export const addMembersAsync = createAsyncThunk(
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

      return response.data;
    } catch (e: any) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data);
    }
  },
);

export const getMembersAsync = createAsyncThunk(
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

      return response.data;
    } catch (e: any) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data);
    }
  },
);

export const joinClubAsync = createAsyncThunk(
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

      return response.data;
    } catch (e: any) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data);
    }
  },
);

export const inviteClubAsync = createAsyncThunk(
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

      return response.data;
    } catch (e: any) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data);
    }
  },
);

export const requestClubAsync = createAsyncThunk(
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

      return response.data;
    } catch (e: any) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data);
    }
  },
);

export const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers: builder => {},
});

export const {} = membersSlice.actions;
export default membersSlice.reducer;
