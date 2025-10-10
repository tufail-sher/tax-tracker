import { RootState } from '../../store/store';

export const selectUser = (state: RootState) => state.profile.user;
export const selectUserName = (state: RootState) => state.profile.user?.name || '';
export const selectUserEmail = (state: RootState) => state.profile.user?.email || '';
export const selectUserPlan = (state: RootState) => state.profile.user?.plan || 'free';
export const selectProfilePicture = (state: RootState) => state.profile.user?.profilePicture;
export const selectIsLoading = (state: RootState) => state.profile.isLoading;
export const selectError = (state: RootState) => state.profile.error;
