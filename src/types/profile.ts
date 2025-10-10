export interface UserProfile {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  plan: 'free' | 'premium';
  phone?: string;
  cnic?: string;
  ntn?: string;
  city?: string;
}

export interface ProfileState {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}
