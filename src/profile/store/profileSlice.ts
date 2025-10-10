import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, ProfileState } from '../../types/profile';

const initialState: ProfileState = {
  user: {
    id: '1',
    name: 'Maryam Kareem',
    email: 'maryam.kareem@email.com',
    plan: 'free',
    phone: '+92 300 1234567',
    cnic: '12345-1234567-1',
    ntn: '1234567-8',
    city: 'Lahore',
  },
  isLoading: false,
  error: null,
};

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      // const response = await axios.get('/api/user/profile');
      // return response.data;
      
      // Placeholder: Return mock data
      return initialState.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch user profile');
    }
  }
);

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (updates: Partial<UserProfile>, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      // const response = await axios.put('/api/user/profile', updates);
      // return response.data;
      
      // Placeholder: Return updated data
      return updates;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update user profile');
    }
  }
);

// Async thunk for uploading profile picture
export const uploadProfilePicture = createAsyncThunk(
  'profile/uploadProfilePicture',
  async (imageUri: string, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      // const formData = new FormData();
      // formData.append('image', { uri: imageUri, type: 'image/jpeg', name: 'profile.jpg' });
      // const response = await axios.post('/api/user/profile-picture', formData);
      // return response.data.imageUrl;
      
      // Placeholder: Return image URI
      return imageUri;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to upload profile picture');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    updateUserField: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch user profile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update user profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Upload profile picture
    builder
      .addCase(uploadProfilePicture.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.user) {
          state.user.profilePicture = action.payload;
        }
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser, updateUserField } = profileSlice.actions;
export default profileSlice.reducer;
