// Types pour l'API de la plateforme de location de logements

// =============================================
// TYPES DE BASE
// =============================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// =============================================
// TYPES BAILLEUR
// =============================================

export interface Bailleur {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  date_inscription: string;
  is_active: boolean;
  user_id: string;
}

export interface CreateBailleurRequest {
  nom: string;
  email: string;
  telephone: string;
  user_id: string;
}

export interface UpdateBailleurRequest {
  nom?: string;
  email?: string;
  telephone?: string;
}

// =============================================
// TYPES LOCATAIRE
// =============================================

export interface Locataire {
  id: string;
  nom: string;
  email: string;
  date_inscription: string;
  is_active: boolean;
  universite: string;
  user_id: string;
}

export interface LocataireWithDetails extends Locataire {
  profil?: LocataireProfil;
  preferences?: PreferenceLocataire[];
  reservations?: Reservation[];
}

export interface CreateLocataireRequest {
  nom: string;
  email: string;
  universite: string;
  user_id: string;
}

export interface UpdateLocataireRequest {
  nom?: string;
  email?: string;
  universite?: string;
}

// =============================================
// TYPES PROFIL LOCATAIRE
// =============================================

export interface LocataireProfil {
  id: number;
  locataire_id: string;
  age_min?: number;
  age_max?: number;
  budget_min: number;
  budget_max: number;
  genre?: 'Homme' | 'Femme' | 'Non_specifie';
  niveau_etudes?: 'Licence' | 'Master' | 'Doctorat';
  autres_spec?: string;
}

// =============================================
// TYPES PREFERENCES
// =============================================

export interface PreferenceLocataire {
  id: number;
  locataire_id: string;
  type_logement: 'Appartement' | 'Maison' | 'Studio';
  budget_min: number;
  budget_max: number;
  rayon_km: number;
  autres_spec?: string;
}

export interface CreatePreferenceRequest {
  locataire_id: string;
  type_logement: 'Appartement' | 'Maison' | 'Studio';
  budget_min: number;
  budget_max: number;
  rayon_km: number;
  autres_spec?: string;
}

// =============================================
// TYPES LOGEMENT
// =============================================

export interface Logement {
  id: number;
  bailleur_id: string;
  titre: string;
  accroche?: string;
  adresse: string;
  latitude: number;
  longitude: number;
  prix: number;
  type_logement: 'Appartement' | 'Maison' | 'Studio';
  score: number;
  disponible: boolean;
  date_ajout: string;
  statut_logement: 'disponible' | 'reserve' | 'indisponible';
  photos: string[];
}

export interface LogementWithDetails extends Logement {
  bailleur?: Bailleur;
  avis?: Avis[];
  note_moyenne?: number;
  compatibility_score?: number;
}

export interface CreateLogementRequest {
  bailleur_id: string;
  titre: string;
  accroche?: string;
  adresse: string;
  latitude?: number;
  longitude?: number;
  prix: number;
  type_logement: 'Appartement' | 'Maison' | 'Studio';
  photos?: string[];
}

export interface UpdateLogementRequest {
  titre?: string;
  accroche?: string;
  adresse?: string;
  latitude?: number;
  longitude?: number;
  prix?: number;
  type_logement?: 'Appartement' | 'Maison' | 'Studio';
  disponible?: boolean;
  statut_logement?: 'disponible' | 'reserve' | 'indisponible';
  photos?: string[];
}

// =============================================
// TYPES RESERVATION
// =============================================

export interface Reservation {
  id: number;
  locataire_id: string;
  logement_id: number;
  date_reservation: string;
  statut_reservation: 'en_attente' | 'confirmee' | 'annulee' | 'terminee';
  montant_total: number;
  date_debut_location: string;
  date_fin_location: string;
  contrat_url?: string;
  is_paiement_securise: boolean;
}

export interface ReservationWithDetails extends Reservation {
  logement?: Logement;
  locataire?: Locataire;
}

export interface CreateReservationRequest {
  locataire_id: string;
  logement_id: number;
  montant_total: number;
  date_debut_location: string;
  date_fin_location: string;
  contrat_url?: string;
}

export interface UpdateReservationRequest {
  statut_reservation?: 'en_attente' | 'confirmee' | 'annulee' | 'terminee';
  montant_total?: number;
  date_debut_location?: string;
  date_fin_location?: string;
  contrat_url?: string;
  is_paiement_securise?: boolean;
}

// =============================================
// TYPES AVIS
// =============================================

export interface Avis {
  id: number;
  locataire_id?: string;
  bailleur_id?: string;
  logement_id: number;
  note: number;
  commentaire?: string;
  date_avis: string;
}

export interface CreateAvisRequest {
  locataire_id?: string;
  bailleur_id?: string;
  logement_id: number;
  note: number;
  commentaire?: string;
}

// =============================================
// TYPES INTERACTION
// =============================================

export interface Interaction {
  id: number;
  locataire_id: string;
  logement_id: number;
  resultat: 'like' | 'dislike' | 'match';
  date_interaction: string;
}

export interface CreateInteractionRequest {
  locataire_id: string;
  logement_id: number;
  resultat: 'like' | 'dislike' | 'match';
}

// =============================================
// TYPES REPERE
// =============================================

export interface Repere {
  id: number;
  nom: string;
  latitude: number;
  longitude: number;
}

// =============================================
// TYPES DOCUMENT
// =============================================

export interface Document {
  id: number;
  locataire_id: string;
  type_document: string;
  url_document: string;
  statut_verification: 'en_attente' | 'valide' | 'rejete';
  date_upload: string;
}

// =============================================
// TYPES RECHERCHE
// =============================================

export interface SearchFilters {
  type_logement?: 'Appartement' | 'Maison' | 'Studio';
  prix_min?: number;
  prix_max?: number;
  disponible?: boolean;
  statut_logement?: 'disponible' | 'reserve' | 'indisponible';
  sort_by?: 'date_ajout' | 'score' | 'prix' | 'prix_desc' | 'compatibility';
  lat?: number;
  lng?: number;
  radius?: number;
  locataire_id?: string;
  universite?: string;
  score_min?: number;
}

export interface SearchResponse {
  success: boolean;
  data: LogementWithDetails[];
  stats: {
    total_results: number;
    filters_applied: {
      type_logement: boolean;
      prix_range: boolean;
      location: boolean;
      score_min: boolean;
    };
  };
  pagination: PaginationInfo;
  search_params: SearchFilters;
}

// =============================================
// TYPES FILTRES
// =============================================

export interface BailleurFilters {
  page?: number;
  limit?: number;
}

export interface LocataireFilters {
  page?: number;
  limit?: number;
  universite?: string;
}

export interface LogementFilters extends SearchFilters {
  page?: number;
  limit?: number;
}

export interface ReservationFilters {
  page?: number;
  limit?: number;
  locataire_id?: string;
  logement_id?: number;
  statut_reservation?: 'en_attente' | 'confirmee' | 'annulee' | 'terminee';
  date_debut?: string;
  date_fin?: string;
}

export interface AvisFilters {
  page?: number;
  limit?: number;
  logement_id?: number;
  locataire_id?: string;
  bailleur_id?: string;
  note_min?: number;
  note_max?: number;
}

export interface InteractionFilters {
  page?: number;
  limit?: number;
  locataire_id?: string;
  logement_id?: number;
  resultat?: 'like' | 'dislike' | 'match';
}

// =============================================
// TYPES UTILITAIRES
// =============================================

export interface DistanceCalculation {
  lat1: number;
  lng1: number;
  lat2: number;
  lng2: number;
  distance: number;
}

export interface CompatibilityScore {
  locataire_id: string;
  logement_id: number;
  score: number;
  factors: {
    type_logement: number;
    budget: number;
    distance?: number;
  };
}

// =============================================
// TYPES ERREURS
// =============================================

export interface ApiError {
  success: false;
  error: string;
  code?: string;
  details?: any;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// =============================================
// TYPES ENUMS
// =============================================

export const LogementTypes = ['Appartement', 'Maison', 'Studio'] as const;
export const ReservationStatuses = ['en_attente', 'confirmee', 'annulee', 'terminee'] as const;
export const LogementStatuses = ['disponible', 'reserve', 'indisponible'] as const;
export const InteractionResults = ['like', 'dislike', 'match'] as const;
export const VerificationStatuses = ['en_attente', 'valide', 'rejete'] as const;
export const GenderTypes = ['Homme', 'Femme', 'Non_specifie'] as const;
export const EducationLevels = ['Licence', 'Master', 'Doctorat'] as const;
export const SortOptions = ['date_ajout', 'score', 'prix', 'prix_desc', 'compatibility'] as const;

// =============================================
// TYPES POUR LES REQUÊTES
// =============================================

export type CreateEntityRequest<T> = Omit<T, 'id' | 'date_inscription' | 'date_ajout' | 'date_reservation' | 'date_avis' | 'date_interaction' | 'date_upload'>;

export type UpdateEntityRequest<T> = Partial<Omit<T, 'id' | 'date_inscription' | 'date_ajout' | 'date_reservation' | 'date_avis' | 'date_interaction' | 'date_upload'>>;

// =============================================
// TYPES POUR LES RÉPONSES
// =============================================

export type BailleurResponse = ApiResponse<Bailleur>;
export type BailleursResponse = ApiResponse<Bailleur[]>;

export type LocataireResponse = ApiResponse<LocataireWithDetails>;
export type LocatairesResponse = ApiResponse<Locataire[]>;

export type LogementResponse = ApiResponse<LogementWithDetails>;
export type LogementsResponse = ApiResponse<LogementWithDetails[]>;

export type ReservationResponse = ApiResponse<ReservationWithDetails>;
export type ReservationsResponse = ApiResponse<Reservation[]>;

export type AvisResponse = ApiResponse<Avis>;
export type AvisListResponse = ApiResponse<Avis[]>;

export type InteractionResponse = ApiResponse<Interaction>;
export type InteractionsResponse = ApiResponse<Interaction[]>;

export type PreferencesResponse = ApiResponse<PreferenceLocataire[]>;
export type PreferenceResponse = ApiResponse<PreferenceLocataire>;


