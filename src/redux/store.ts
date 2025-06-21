import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import communitySlice from './slices/communitySlice';
import newsSlice from './slices/newsSlice';
import supportSlice from './slices/supportSlice';
import membersSlice from './slices/membersSlice';

const rootReducer = combineReducers({
  user: userSlice,
  community: communitySlice,
  members: membersSlice,
  news: newsSlice,
  support: supportSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
