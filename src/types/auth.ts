// Types pour l'authentification

export interface AuthUser {
  id: string;
  email: string;
  type_utilisateur: 'bailleur' | 'locataire';
  email_confirmed_at?: string;
  created_at: string;
}

export interface AuthProfile {
  id: number;
  user_id: string;
  nom: string;
  email: string;
  telephone: string;
  date_inscription: string;
  is_active: boolean;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export interface SignUpRequest {
  email: string;
  password: string;
  nom: string;
  telephone: string;
  type_utilisateur: 'bailleur' | 'locataire';
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface UpdatePasswordRequest {
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: AuthUser;
    profile: AuthProfile;
    session?: AuthSession;
  };
  error?: string;
}

export interface AuthState {
  user: AuthUser | null;
  profile: AuthProfile | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  register: (userData: SignUpRequest) => Promise<AuthResponse>;
  login: (credentials: SignInRequest) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}



