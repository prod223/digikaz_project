import { supabase } from './supabase.js';

// =============================================
// CLASSE: Bailleur (Landlord)
// =============================================
export class Bailleur {
  constructor(data = {}) {
    this.id = data.id;
    this.nom = data.nom;
    this.email = data.email;
    this.telephone = data.telephone;
    this.date_inscription = data.date_inscription;
    this.is_active = data.is_active;
    this.user_id = data.user_id;
  }

  // Créer un nouveau bailleur
  static async create(bailleurData) {
    try {
      const { data, error } = await supabase
        .from('bailleurs')
        .insert([bailleurData])
        .select()
        .single();

      if (error) throw error;
      return new Bailleur(data);
    } catch (error) {
      throw new Error(`Erreur lors de la création du bailleur: ${error.message}`);
    }
  }

  // Récupérer un bailleur par ID
  static async getById(id) {
    try {
      const { data, error } = await supabase
        .from('bailleurs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data ? new Bailleur(data) : null;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du bailleur: ${error.message}`);
    }
  }

  // Récupérer un bailleur par user_id
  static async getByUserId(userId) {
    try {
      const { data, error } = await supabase
        .from('bailleurs')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data ? new Bailleur(data) : null;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du bailleur: ${error.message}`);
    }
  }

  // Mettre à jour un bailleur
  async update(updateData) {
    try {
      const { data, error } = await supabase
        .from('bailleurs')
        .update(updateData)
        .eq('id', this.id)
        .select()
        .single();

      if (error) throw error;
      Object.assign(this, data);
      return this;
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour du bailleur: ${error.message}`);
    }
  }

  // Désactiver un bailleur
  async deactivate() {
    return this.update({ is_active: false });
  }

  // Récupérer tous les logements du bailleur
  async getLogements() {
    try {
      const { data, error } = await supabase
        .from('logements')
        .select('*')
        .eq('bailleur_id', this.id);

      if (error) throw error;
      return data.map(logement => new Logement(logement));
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des logements: ${error.message}`);
    }
  }
}

// =============================================
// CLASSE: Locataire (Tenant)
// =============================================
export class Locataire {
  constructor(data = {}) {
    this.id = data.id;
    this.nom = data.nom;
    this.email = data.email;
    this.date_inscription = data.date_inscription;
    this.is_active = data.is_active;
    this.universite = data.universite;
    this.user_id = data.user_id;
  }

  // Créer un nouveau locataire
  static async create(locataireData) {
    try {
      const { data, error } = await supabase
        .from('locataires')
        .insert([locataireData])
        .select()
        .single();

      if (error) throw error;
      return new Locataire(data);
    } catch (error) {
      throw new Error(`Erreur lors de la création du locataire: ${error.message}`);
    }
  }

  // Récupérer un locataire par ID
  static async getById(id) {
    try {
      const { data, error } = await supabase
        .from('locataires')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data ? new Locataire(data) : null;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du locataire: ${error.message}`);
    }
  }

  // Récupérer un locataire par user_id
  static async getByUserId(userId) {
    try {
      const { data, error } = await supabase
        .from('locataires')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data ? new Locataire(data) : null;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du locataire: ${error.message}`);
    }
  }

  // Mettre à jour un locataire
  async update(updateData) {
    try {
      const { data, error } = await supabase
        .from('locataires')
        .update(updateData)
        .eq('id', this.id)
        .select()
        .single();

      if (error) throw error;
      Object.assign(this, data);
      return this;
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour du locataire: ${error.message}`);
    }
  }

  // Désactiver un locataire
  async deactivate() {
    return this.update({ is_active: false });
  }

  // Récupérer le profil du locataire
  async getProfil() {
    try {
      const { data, error } = await supabase
        .from('locataireprofil')
        .select('*')
        .eq('locataire_id', this.id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du profil: ${error.message}`);
    }
  }

  // Récupérer les préférences du locataire
  async getPreferences() {
    try {
      const { data, error } = await supabase
        .from('preferenceslocataires')
        .select('*')
        .eq('locataire_id', this.id);

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des préférences: ${error.message}`);
    }
  }

  // Récupérer les réservations du locataire
  async getReservations() {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('locataire_id', this.id);

      if (error) throw error;
      return data.map(reservation => new Reservation(reservation));
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des réservations: ${error.message}`);
    }
  }
}

// =============================================
// CLASSE: Logement (Listing)
// =============================================
export class Logement {
  constructor(data = {}) {
    this.id = data.id;
    this.bailleur_id = data.bailleur_id;
    this.titre = data.titre;
    this.accroche = data.accroche;
    this.adresse = data.adresse;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.prix = data.prix;
    this.type_logement = data.type_logement;
    this.score = data.score;
    this.disponible = data.disponible;
    this.date_ajout = data.date_ajout;
    this.statut_logement = data.statut_logement;
    this.photos = data.photos || [];
  }

  // Créer un nouveau logement
  static async create(logementData) {
    try {
      const { data, error } = await supabase
        .from('logements')
        .insert([logementData])
        .select()
        .single();

      if (error) throw error;
      return new Logement(data);
    } catch (error) {
      throw new Error(`Erreur lors de la création du logement: ${error.message}`);
    }
  }

  // Récupérer un logement par ID
  static async getById(id) {
    try {
      const { data, error } = await supabase
        .from('logements')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data ? new Logement(data) : null;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du logement: ${error.message}`);
    }
  }

  // Rechercher des logements avec filtres
  static async search(filters = {}) {
    try {
      let query = supabase
        .from('logements')
        .select('*');

      // Appliquer les filtres
      if (filters.type_logement) {
        query = query.eq('type_logement', filters.type_logement);
      }
      if (filters.prix_min !== undefined) {
        query = query.gte('prix', filters.prix_min);
      }
      if (filters.prix_max !== undefined) {
        query = query.lte('prix', filters.prix_max);
      }
      if (filters.disponible !== undefined) {
        query = query.eq('disponible', filters.disponible);
      }
      if (filters.statut_logement) {
        query = query.eq('statut_logement', filters.statut_logement);
      }

      // Tri par score ou date
      if (filters.sort_by === 'score') {
        query = query.order('score', { ascending: false });
      } else {
        query = query.order('date_ajout', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data.map(logement => new Logement(logement));
    } catch (error) {
      throw new Error(`Erreur lors de la recherche de logements: ${error.message}`);
    }
  }

  // Rechercher des logements par proximité géographique
  static async searchByLocation(lat, lng, radiusKm = 10) {
    try {
      // Calculer les bornes de la zone de recherche
      const latDelta = radiusKm / 111.32; // 1 degré ≈ 111.32 km
      const lngDelta = radiusKm / (111.32 * Math.cos(lat * Math.PI / 180));

      const { data, error } = await supabase
        .from('logements')
        .select('*')
        .gte('latitude', lat - latDelta)
        .lte('latitude', lat + latDelta)
        .gte('longitude', lng - lngDelta)
        .lte('longitude', lng + lngDelta)
        .eq('disponible', true)
        .order('score', { ascending: false });

      if (error) throw error;
      return data.map(logement => new Logement(logement));
    } catch (error) {
      throw new Error(`Erreur lors de la recherche géographique: ${error.message}`);
    }
  }

  // Mettre à jour un logement
  async update(updateData) {
    try {
      const { data, error } = await supabase
        .from('logements')
        .update(updateData)
        .eq('id', this.id)
        .select()
        .single();

      if (error) throw error;
      Object.assign(this, data);
      return this;
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour du logement: ${error.message}`);
    }
  }

  // Ajouter des photos
  async addPhotos(photoUrls) {
    const currentPhotos = this.photos || [];
    const newPhotos = [...currentPhotos, ...photoUrls];
    return this.update({ photos: newPhotos });
  }

  // Récupérer le bailleur du logement
  async getBailleur() {
    try {
      const { data, error } = await supabase
        .from('bailleurs')
        .select('*')
        .eq('id', this.bailleur_id)
        .single();

      if (error) throw error;
      return data ? new Bailleur(data) : null;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du bailleur: ${error.message}`);
    }
  }

  // Récupérer les avis du logement
  async getAvis() {
    try {
      const { data, error } = await supabase
        .from('avis')
        .select('*')
        .eq('logement_id', this.id);

      if (error) throw error;
      return data.map(avis => new Avis(avis));
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des avis: ${error.message}`);
    }
  }
}

// =============================================
// CLASSE: Reservation
// =============================================
export class Reservation {
  constructor(data = {}) {
    this.id = data.id;
    this.locataire_id = data.locataire_id;
    this.logement_id = data.logement_id;
    this.date_reservation = data.date_reservation;
    this.statut_reservation = data.statut_reservation;
    this.montant_total = data.montant_total;
    this.date_debut_location = data.date_debut_location;
    this.date_fin_location = data.date_fin_location;
    this.contrat_url = data.contrat_url;
    this.is_paiement_securise = data.is_paiement_securise;
  }

  // Créer une nouvelle réservation
  static async create(reservationData) {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .insert([reservationData])
        .select()
        .single();

      if (error) throw error;
      return new Reservation(data);
    } catch (error) {
      throw new Error(`Erreur lors de la création de la réservation: ${error.message}`);
    }
  }

  // Récupérer une réservation par ID
  static async getById(id) {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data ? new Reservation(data) : null;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de la réservation: ${error.message}`);
    }
  }

  // Mettre à jour le statut d'une réservation
  async updateStatus(newStatus) {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .update({ statut_reservation: newStatus })
        .eq('id', this.id)
        .select()
        .single();

      if (error) throw error;
      Object.assign(this, data);
      return this;
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour du statut: ${error.message}`);
    }
  }

  // Confirmer une réservation
  async confirmer() {
    return this.updateStatus('confirmee');
  }

  // Annuler une réservation
  async annuler() {
    return this.updateStatus('annulee');
  }

  // Récupérer le logement de la réservation
  async getLogement() {
    return Logement.getById(this.logement_id);
  }

  // Récupérer le locataire de la réservation
  async getLocataire() {
    return Locataire.getById(this.locataire_id);
  }
}

// =============================================
// CLASSE: Avis
// =============================================
export class Avis {
  constructor(data = {}) {
    this.id = data.id;
    this.locataire_id = data.locataire_id;
    this.bailleur_id = data.bailleur_id;
    this.logement_id = data.logement_id;
    this.note = data.note;
    this.commentaire = data.commentaire;
    this.date_avis = data.date_avis;
  }

  // Créer un nouvel avis
  static async create(avisData) {
    try {
      const { data, error } = await supabase
        .from('avis')
        .insert([avisData])
        .select()
        .single();

      if (error) throw error;
      return new Avis(data);
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'avis: ${error.message}`);
    }
  }

  // Récupérer les avis d'un logement
  static async getByLogementId(logementId) {
    try {
      const { data, error } = await supabase
        .from('avis')
        .select('*')
        .eq('logement_id', logementId)
        .order('date_avis', { ascending: false });

      if (error) throw error;
      return data.map(avis => new Avis(avis));
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des avis: ${error.message}`);
    }
  }
}

// =============================================
// CLASSE: Interaction
// =============================================
export class Interaction {
  constructor(data = {}) {
    this.id = data.id;
    this.locataire_id = data.locataire_id;
    this.logement_id = data.logement_id;
    this.resultat = data.resultat;
    this.date_interaction = data.date_interaction;
  }

  // Créer une nouvelle interaction
  static async create(interactionData) {
    try {
      const { data, error } = await supabase
        .from('interactions')
        .insert([interactionData])
        .select()
        .single();

      if (error) throw error;
      return new Interaction(data);
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'interaction: ${error.message}`);
    }
  }

  // Récupérer les interactions d'un locataire
  static async getByLocataireId(locataireId) {
    try {
      const { data, error } = await supabase
        .from('interactions')
        .select('*')
        .eq('locataire_id', locataireId)
        .order('date_interaction', { ascending: false });

      if (error) throw error;
      return data.map(interaction => new Interaction(interaction));
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des interactions: ${error.message}`);
    }
  }
}

// =============================================
// FONCTIONS UTILITAIRES
// =============================================

// Calculer la distance entre deux points géographiques
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Valider une adresse email
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Valider un numéro de téléphone français
export function validatePhone(phone) {
  const re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return re.test(phone);
}

// Formater un prix
export function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);
}

// Générer un score de compatibilité entre un locataire et un logement
export async function calculateCompatibilityScore(locataireId, logementId) {
  try {
    // Récupérer les préférences du locataire
    const locataire = await Locataire.getById(locataireId);
    const preferences = await locataire.getPreferences();
    
    // Récupérer le logement
    const logement = await Logement.getById(logementId);
    
    if (!preferences || !logement) return 0;
    
    let score = 0;
    let totalCriteria = 0;
    
    // Vérifier le type de logement
    if (preferences.some(p => p.type_logement === logement.type_logement)) {
      score += 30;
    }
    totalCriteria += 30;
    
    // Vérifier le budget
    const budgetPref = preferences.find(p => 
      logement.prix >= p.budget_min && logement.prix <= p.budget_max
    );
    if (budgetPref) {
      score += 40;
    }
    totalCriteria += 40;
    
    // Vérifier la distance (si des repères sont définis)
    // Cette logique peut être étendue selon vos besoins
    
    return Math.round((score / totalCriteria) * 100);
  } catch (error) {
    console.error('Erreur lors du calcul du score de compatibilité:', error);
    return 0;
  }
}

export default {
  Bailleur,
  Locataire,
  Logement,
  Reservation,
  Avis,
  Interaction,
  calculateDistance,
  validateEmail,
  validatePhone,
  formatPrice,
  calculateCompatibilityScore
};
