import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface LoginState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Initial state
const initialState: LoginState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Simulate API call - Replace with your actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock validation - Replace with actual API response
      if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
        const user: User = {
          id: '1',
          email: credentials.email,
          name: 'Test User',
        };
        return user;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Login slice
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login pending
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Login fulfilled
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      // Login rejected
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = loginSlice.actions;
export default loginSlice.reducer;
