import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

interface InitialState {}

const initialState: InitialState = {};

export const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {},
  extraReducers: builder => {},
});

export const {} = supportSlice.actions;
export default supportSlice.reducer;
