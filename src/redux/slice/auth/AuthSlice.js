import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../service/auth/AuthService';

// get users from local storage
// const user = JSON.parse(localStorage.getItem('user'));
let user;
if (typeof window !== 'undefined') {
  //get users from local storage
  user = JSON.parse(localStorage.getItem('user'));
}

const initialState = {
  user: user ? user : null,
  isLoggedIn: false,
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: '',
};

//1.register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      const data = await authService.register(user);
      if (data.status === false || data.result === null)
        return thunkAPI.rejectWithValue(data.error_message);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error_message);
    }
  }
);

//2. login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const data = await authService.login(user);
    if (data.status === false || data.result === null)
      return thunkAPI.rejectWithValue(data.error_message);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

//3.Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  return await authService.logout();
});

//4. refresh user token
export const refreshToken = createAsyncThunk(
  'auth/token',
  async (_, thunkAPI) => {
    try {
      return await authService.refreshToken();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.isLoggedIn = false;
        state.message = action.payload;
      })
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
