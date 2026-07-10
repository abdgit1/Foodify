import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser as loginUserApi, registerUser as registerUserApi } from '../services/authService';

// Thunks: these are the "do the actual work" functions.
// createAsyncThunk wraps our API call and automatically fires
// pending/fulfilled/rejected actions based on what happens.

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(credentials);
      return response; // becomes action.payload on success
    } catch (err) {
      return rejectWithValue(err.message); // becomes action.payload on failure
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (details, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(details);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Initial state — on page load, check if a previous session was saved.
// This is what keeps someone logged in after a page refresh.
const savedUser = localStorage.getItem('user');

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: !!savedUser,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // A plain (non-async) action — no API call needed, just clear everything.
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    },
  },
  // extraReducers handles the pending/fulfilled/rejected actions
  // that loginUser/registerUser automatically produce.
  extraReducers: (builder) => {
    builder
      // ── Login ──
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data;

        localStorage.setItem('access_token', action.payload.token.access);
        localStorage.setItem('refresh_token', action.payload.token.refresh);
        localStorage.setItem('user', JSON.stringify(action.payload.data));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ── Register ──
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data;

        localStorage.setItem('access_token', action.payload.token.access);
        localStorage.setItem('refresh_token', action.payload.token.refresh);
        localStorage.setItem('user', JSON.stringify(action.payload.data));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;