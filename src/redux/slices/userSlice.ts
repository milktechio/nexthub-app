import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

const INITIAL_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcm9udGVuZCI6ImJhY2tvZmZpY2UifQ.v2BQpAgi_a8lNHytbcoAoXD77TLtO_6knpt6Ep7Jjxg';
const BACK_ADDRESS = 'https://prd-gateways.barra.mx/';

//* ================================================================================

export const RegisterAsync = createAsyncThunk(
  'users/register',
  async (data: {}, {rejectWithValue}) => {
    console.log(data);
    try {
      const response = await axios.post(
        `${BACK_ADDRESS}api/administration/auth/register/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${INITIAL_TOKEN}`,
          },
        },
      );

      return response.data;
    } catch (e: any) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data.data['errors']);
    }
  },
);

export const LoginAsync = createAsyncThunk(
  'users/login',
  async (data: {}, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${BACK_ADDRESS}api/administration/auth/login/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${INITIAL_TOKEN}`,
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

export const getUserProfileAsync = createAsyncThunk(
  'user/profile',
  async (token: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${BACK_ADDRESS}api/administration/users/my-user`,
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

export const updateProfileAsync = createAsyncThunk(
  'save/profile',
  async (data: {token: string; data: {}}, {rejectWithValue}) => {
    try {
      const response = await axios.put(
        `${BACK_ADDRESS}api/administration/profile/update`,
        data.data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${data.token}`,
          },
        },
      );

      return response.data;
    } catch (e: any) {
      console.log(e.respose.data);
      return rejectWithValue(e.response.data.msg);
    }
  },
);

export const getInviteAsync = createAsyncThunk(
  'invite/url',
  async (token: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${BACK_ADDRESS}api/administration/check-url-invite`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (e: any) {
      console.log(e.respose.data);
      return rejectWithValue(e.response.data.msg);
    }
  },
);

export const postNewExpAsync = createAsyncThunk(
  'post/exp',
  async (data: {token: string; data: {}}, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${BACK_ADDRESS}api/administration/experiences`,
        data.data,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        },
      );

      return response.data;
    } catch (e: any) {
      console.log(e.respose.data);
      return rejectWithValue(e.response.data.msg);
    }
  },
);

export const getAllExpAsync = createAsyncThunk(
  'get/exp',
  async (token: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${BACK_ADDRESS}api/administration/experiences`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (e: any) {
      console.log(e.respose.data);
      return rejectWithValue(e.response.data.msg);
    }
  },
);

export const deleteAccountReqAsync = createAsyncThunk(
  'public/RequestProfile',
  async (token: string, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${BACK_ADDRESS}api/administration/users-delete/request`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const deleteAccountAsync = createAsyncThunk(
  'public/DeleteProfile',
  async (data: {token: string; password: string}, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${BACK_ADDRESS}api/administration/users-delete/delete/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        },
      );

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const requestEmailVerificationAsync = createAsyncThunk(
  'public/requestEmail',
  async (email: string, {rejectWithValue}) => {
    console.log(email);
    try {
      const response = await axios.post(
        `${BACK_ADDRESS}api/administration/auth/send-email-verification/`,
        {email},
        {
          headers: {
            Authorization: `Bearer ${INITIAL_TOKEN}`,
          },
        },
      );

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const RecoverPasswordAsync = createAsyncThunk(
  'recover/password',
  async (email: string, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${BACK_ADDRESS}api/administration/auth/recover-password`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${INITIAL_TOKEN}`,
          },
        },
      );

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.msg);
    }
  },
);

export const ChangeRecoverPassAsync = createAsyncThunk(
  'change/password',
  async (
    data: {token: string; password: string; password_confirmation: string},
    {rejectWithValue},
  ) => {
    try {
      console.log(data);

      const response = await axios.post(
        `${BACK_ADDRESS}api/administration/auth/change-password`,
        data,
        {
          headers: {
            Authorization: `Bearer ${INITIAL_TOKEN}`,
          },
        },
      );

      return response.data;
    } catch (e: any) {
      console.log(e.response.data.data['errors']);
      return rejectWithValue(e.response.data.msg);
    }
  },
);

export const cambiarPasswordAsync = createAsyncThunk(
  'update/pass',
  async (
    data: {
      username: string;
      email: string;
      password: string;
      token: string;
    },
    {rejectWithValue},
  ) => {
    try {
      const response = await axios.put(
        `${BACK_ADDRESS}api/administration/users/update`,
        data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${data.token}`,
          },
        },
      );

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  },
);

//* ================================================================================

interface InitialState {
  registerLoading: boolean;
  registerSuccess: boolean;
  registerError: boolean;
  registerErrorMsg: any;

  jwtToken: string;
  isLoggedInLoading: boolean;
  isLoggedInSuccess: boolean;
  isLoggedInError: boolean;
  isLoggedInErrorMsg: string;

  getUserProfileLoading: boolean;
  getUserProfileSuccess: boolean;
  getUserProfileError: boolean;
  getUserProfileErrorMsg: string;
  getUserProfile: any;

  updateUserProfileLoading: boolean;
  updateUserProfileSuccess: boolean;
  updateUserProfileError: boolean;
  updateUserProfileErrorMsg: string;

  postNewExpLoading: boolean;
  postNewExpSuccess: boolean;
  postNewExpError: boolean;
  postNewExpErrorMsg: string;

  getAllExpLoading: boolean;
  getAllExpSuccess: boolean;
  getAllExpError: boolean;
  getAllExpErrorMsg: string;
  getAllExp: any;

  getInviteLoading: boolean;
  getInviteSuccess: boolean;
  getInviteError: boolean;
  getInviteErrorMsg: string;
  getInviteURL: string;
  getInviteQR: string;

  cambiarPasswordLoading: boolean;
  cambiarPasswordSuccess: boolean;
  cambiarPasswordError: boolean;
  cambiarPasswordMsg: string;

  deleteAccountLoading: boolean;
  deleteAccountSuccess: boolean;
  deleteAccountError: boolean;
  deleteAccountMsg: string;

  deleteAccountReqLoading: boolean;
  deleteAccountReqSuccess: boolean;
  deleteAccountReqError: boolean;
  deleteAccountReqMsg: string;

  recoverPasswordLoading: boolean;
  recoverPasswordSuccess: boolean;
  recoverPasswordError: boolean;
  recoverPasswordMsg: string;

  recoverChangePasswordLoading: boolean;
  recoverChangePasswordSuccess: boolean;
  recoverChangePasswordError: boolean;
  recoverChangePasswordMsg: string;
}

const initialState: InitialState = {
  registerLoading: false,
  registerSuccess: false,
  registerError: false,
  registerErrorMsg: '',

  jwtToken: '',
  isLoggedInLoading: false,
  isLoggedInSuccess: false,
  isLoggedInError: false,
  isLoggedInErrorMsg: '',

  getUserProfileLoading: false,
  getUserProfileSuccess: false,
  getUserProfileError: false,
  getUserProfileErrorMsg: '',
  getUserProfile: [],

  updateUserProfileLoading: false,
  updateUserProfileSuccess: false,
  updateUserProfileError: false,
  updateUserProfileErrorMsg: '',

  postNewExpLoading: false,
  postNewExpSuccess: false,
  postNewExpError: false,
  postNewExpErrorMsg: '',

  getAllExpLoading: false,
  getAllExpSuccess: false,
  getAllExpError: false,
  getAllExpErrorMsg: '',
  getAllExp: [],

  getInviteLoading: false,
  getInviteSuccess: false,
  getInviteError: false,
  getInviteErrorMsg: '',
  getInviteURL: '',
  getInviteQR: '',

  cambiarPasswordLoading: false,
  cambiarPasswordSuccess: false,
  cambiarPasswordError: false,
  cambiarPasswordMsg: '',

  deleteAccountLoading: false,
  deleteAccountSuccess: false,
  deleteAccountError: false,
  deleteAccountMsg: '',

  deleteAccountReqLoading: false,
  deleteAccountReqSuccess: false,
  deleteAccountReqError: false,
  deleteAccountReqMsg: '',

  recoverPasswordLoading: false,
  recoverPasswordSuccess: false,
  recoverPasswordError: false,
  recoverPasswordMsg: '',

  recoverChangePasswordLoading: false,
  recoverChangePasswordSuccess: false,
  recoverChangePasswordError: false,
  recoverChangePasswordMsg: '',
};

//* ================================================================================

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.jwtToken = '';
      state.isLoggedInLoading = false;
      state.isLoggedInSuccess = false;
      state.isLoggedInError = false;
      state.isLoggedInErrorMsg = '';
      state.getUserProfileLoading = false;
      state.getUserProfileSuccess = false;
      state.getUserProfileError = false;
      state.getUserProfileErrorMsg = '';
      state.getUserProfile = [];
    },
    resetUpdateProfile: state => {
      state.updateUserProfileLoading = false;
      state.updateUserProfileSuccess = false;
      state.updateUserProfileError = false;
      state.updateUserProfileErrorMsg = '';
    },
    resetAddExp: state => {
      state.postNewExpLoading = false;
      state.postNewExpSuccess = false;
      state.postNewExpError = false;
      state.postNewExpErrorMsg = '';
    },
    resetCambiarPass: state => {
      state.cambiarPasswordLoading = false;
      state.cambiarPasswordSuccess = false;
      state.cambiarPasswordError = false;
      state.cambiarPasswordMsg = '';
    },
    resetDeleteAccount: state => {
      state.deleteAccountLoading = false;
      state.deleteAccountSuccess = false;
      state.deleteAccountError = false;
      state.deleteAccountMsg = '';
    },
    resetDeleteAccountReq: state => {
      state.deleteAccountReqLoading = false;
      state.deleteAccountReqSuccess = false;
      state.deleteAccountReqError = false;
      state.deleteAccountReqMsg = '';
    },
    resetRegister: state => {
      state.registerLoading = false;
      state.registerSuccess = false;
      state.registerError = false;
      state.registerErrorMsg = undefined;
    },
    resetRecoverPass: state => {
      state.recoverPasswordLoading = false;
      state.recoverPasswordSuccess = false;
      state.recoverPasswordError = false;
      state.recoverPasswordMsg = '';
    },
    resetRecoverChangePass: state => {
      state.recoverChangePasswordLoading = false;
      state.recoverChangePasswordSuccess = false;
      state.recoverChangePasswordError = false;
      state.recoverChangePasswordMsg = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(RegisterAsync.pending, (state, action) => {
      state.registerLoading = true;
    });
    builder.addCase(RegisterAsync.fulfilled, (state, action) => {
      state.registerLoading = false;
      state.registerSuccess = true;
    });
    builder.addCase(RegisterAsync.rejected, (state, action: any) => {
      state.registerLoading = false;
      state.registerError = true;
      state.registerErrorMsg = action.payload;
    });
    builder.addCase(LoginAsync.pending, (state, action) => {
      state.isLoggedInLoading = true;
    });
    builder.addCase(LoginAsync.fulfilled, (state, action) => {
      state.isLoggedInLoading = false;
      state.isLoggedInSuccess = true;
      state.jwtToken = action.payload.data;
    });
    builder.addCase(LoginAsync.rejected, (state, action: any) => {
      state.isLoggedInLoading = false;
      state.isLoggedInError = true;
      state.isLoggedInErrorMsg = action.payload;
    });
    builder.addCase(getUserProfileAsync.pending, (state, action) => {
      state.getUserProfileLoading = true;
    });
    builder.addCase(getUserProfileAsync.fulfilled, (state, action) => {
      state.getUserProfileLoading = false;
      state.getUserProfileSuccess = true;
      state.getUserProfile = action.payload;
    });
    builder.addCase(getUserProfileAsync.rejected, (state, action: any) => {
      state.getUserProfileLoading = false;
      state.getUserProfileError = true;
      state.getUserProfileErrorMsg = action.payload;
    });
    builder.addCase(updateProfileAsync.pending, (state, action) => {
      state.updateUserProfileLoading = true;
    });
    builder.addCase(updateProfileAsync.fulfilled, (state, action) => {
      state.updateUserProfileLoading = false;
      state.updateUserProfileSuccess = true;
    });
    builder.addCase(updateProfileAsync.rejected, (state, action: any) => {
      state.updateUserProfileLoading = false;
      state.updateUserProfileError = true;
      state.updateUserProfileErrorMsg = action.payload;
    });
    builder.addCase(postNewExpAsync.pending, (state, action) => {
      state.postNewExpLoading = true;
    });
    builder.addCase(postNewExpAsync.fulfilled, (state, action) => {
      state.postNewExpLoading = false;
      state.postNewExpSuccess = true;
    });
    builder.addCase(postNewExpAsync.rejected, (state, action: any) => {
      state.postNewExpLoading = false;
      state.postNewExpError = true;
      state.postNewExpErrorMsg = action.payload;
    });
    builder.addCase(getAllExpAsync.pending, (state, action) => {
      state.getAllExpLoading = true;
    });
    builder.addCase(getAllExpAsync.fulfilled, (state, action) => {
      state.getAllExpLoading = false;
      state.getAllExpSuccess = true;
      state.getAllExp = action.payload;
    });
    builder.addCase(getAllExpAsync.rejected, (state, action: any) => {
      state.getAllExpLoading = false;
      state.getAllExpError = true;
      state.getAllExpErrorMsg = action.payload;
    });
    builder.addCase(getInviteAsync.pending, (state, action) => {
      state.getInviteLoading = true;
    });
    builder.addCase(getInviteAsync.fulfilled, (state, action) => {
      state.getInviteLoading = false;
      state.getInviteSuccess = true;
      state.getInviteQR = action.payload.data.qr;
      state.getInviteURL = action.payload.data.url;
    });
    builder.addCase(getInviteAsync.rejected, (state, action: any) => {
      state.getInviteLoading = false;
      state.getInviteError = true;
      state.getInviteErrorMsg = action.payload;
    });
    builder.addCase(cambiarPasswordAsync.pending, (state, action) => {
      state.cambiarPasswordLoading = true;
    });
    builder.addCase(cambiarPasswordAsync.fulfilled, (state, action) => {
      state.cambiarPasswordLoading = false;
      state.cambiarPasswordSuccess = true;
    });
    builder.addCase(cambiarPasswordAsync.rejected, (state, action: any) => {
      state.cambiarPasswordLoading = false;
      state.cambiarPasswordError = true;
      state.cambiarPasswordMsg = action.payload;
    });
    builder.addCase(deleteAccountAsync.pending, (state, action) => {
      state.deleteAccountLoading = true;
    });
    builder.addCase(deleteAccountAsync.fulfilled, (state, action) => {
      state.deleteAccountLoading = false;
      state.deleteAccountSuccess = true;
    });
    builder.addCase(deleteAccountAsync.rejected, (state, action: any) => {
      state.deleteAccountLoading = false;
      state.deleteAccountError = true;
      state.deleteAccountMsg = action.payload;
    });
    builder.addCase(deleteAccountReqAsync.pending, (state, action) => {
      state.deleteAccountReqLoading = true;
    });
    builder.addCase(deleteAccountReqAsync.fulfilled, (state, action) => {
      state.deleteAccountReqLoading = false;
      state.deleteAccountReqSuccess = true;
    });
    builder.addCase(deleteAccountReqAsync.rejected, (state, action: any) => {
      state.deleteAccountReqLoading = false;
      state.deleteAccountReqError = true;
      state.deleteAccountReqMsg = action.payload;
    });
    builder.addCase(RecoverPasswordAsync.pending, (state, action) => {
      state.recoverPasswordLoading = true;
    });
    builder.addCase(RecoverPasswordAsync.fulfilled, (state, action) => {
      state.recoverPasswordLoading = false;
      state.recoverPasswordSuccess = true;
    });
    builder.addCase(RecoverPasswordAsync.rejected, (state, action: any) => {
      state.recoverPasswordLoading = false;
      state.recoverPasswordError = true;
      state.recoverPasswordMsg = action.payload;
    });
    builder.addCase(ChangeRecoverPassAsync.pending, (state, action) => {
      state.recoverChangePasswordLoading = true;
    });
    builder.addCase(ChangeRecoverPassAsync.fulfilled, (state, action) => {
      state.recoverChangePasswordLoading = false;
      state.recoverChangePasswordSuccess = true;
    });
    builder.addCase(ChangeRecoverPassAsync.rejected, (state, action: any) => {
      state.recoverChangePasswordLoading = false;
      state.recoverChangePasswordError = true;
      state.recoverChangePasswordMsg = action.payload;
    });
  },
});

export const {
  logout,
  resetCambiarPass,
  resetUpdateProfile,
  resetDeleteAccount,
  resetRegister,
  resetDeleteAccountReq,
  resetAddExp,
  resetRecoverPass,
  resetRecoverChangePass,
} = userSlice.actions;
export default userSlice.reducer;
