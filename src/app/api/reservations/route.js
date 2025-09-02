import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Reservation, Logement, Locataire } from '@/lib/model';

// GET /api/reservations - Récupérer les réservations avec filtres
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const offset = (page - 1) * limit;

    // Paramètres de filtrage
    const locataire_id = searchParams.get('locataire_id');
    const logement_id = searchParams.get('logement_id');
    const statut_reservation = searchParams.get('statut_reservation');
    const date_debut = searchParams.get('date_debut');
    const date_fin = searchParams.get('date_fin');

    let query = supabase
      .from('reservations')
      .select(`
        *,
        logements:titre,
        locataires:nom
      `, { count: 'exact' });

    // Appliquer les filtres
    if (locataire_id) {
      query = query.eq('locataire_id', locataire_id);
    }
    if (logement_id) {
      query = query.eq('logement_id', logement_id);
    }
    if (statut_reservation) {
      query = query.eq('statut_reservation', statut_reservation);
    }
    if (date_debut) {
      query = query.gte('date_debut_location', date_debut);
    }
    if (date_fin) {
      query = query.lte('date_fin_location', date_fin);
    }

    const { data, error, count } = await query
      .order('date_reservation', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des réservations' },
      { status: 500 }
    );
  }
}

// POST /api/reservations - Créer une nouvelle réservation
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      locataire_id,
      logement_id,
      montant_total,
      date_debut_location,
      date_fin_location,
      contrat_url
    } = body;

    // Validation des données
    if (!locataire_id || !logement_id || !montant_total || !date_debut_location || !date_fin_location) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs obligatoires sont requis' },
        { status: 400 }
      );
    }

    if (montant_total <= 0) {
      return NextResponse.json(
        { success: false, error: 'Le montant total doit être supérieur à 0' },
        { status: 400 }
      );
    }

    // Validation des dates
    const dateDebut = new Date(date_debut_location);
    const dateFin = new Date(date_fin_location);
    const dateActuelle = new Date();

    if (dateDebut <= dateActuelle) {
      return NextResponse.json(
        { success: false, error: 'La date de début de location doit être dans le futur' },
        { status: 400 }
      );
    }

    if (dateFin <= dateDebut) {
      return NextResponse.json(
        { success: false, error: 'La date de fin doit être postérieure à la date de début' },
        { status: 400 }
      );
    }

    // Vérifier que le locataire existe et est actif
    const locataire = await Locataire.getById(locataire_id);
    if (!locataire || !locataire.is_active) {
      return NextResponse.json(
        { success: false, error: 'Locataire non trouvé ou inactif' },
        { status: 404 }
      );
    }

    // Vérifier que le logement existe et est disponible
    const logement = await Logement.getById(logement_id);
    if (!logement) {
      return NextResponse.json(
        { success: false, error: 'Logement non trouvé' },
        { status: 404 }
      );
    }

    if (!logement.disponible || logement.statut_logement !== 'disponible') {
      return NextResponse.json(
        { success: false, error: 'Le logement n\'est pas disponible' },
        { status: 409 }
      );
    }

    // Vérifier s'il y a des conflits de réservation pour ce logement
    const { data: conflits } = await supabase
      .from('reservations')
      .select('id')
      .eq('logement_id', logement_id)
      .in('statut_reservation', ['en_attente', 'confirmee'])
      .or(`date_debut_location.lte.${dateFin},date_fin_location.gte.${dateDebut}`);

    if (conflits && conflits.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Il existe déjà une réservation pour cette période' },
        { status: 409 }
      );
    }

    // Vérifier que le locataire n'a pas déjà une réservation active pour cette période
    const { data: reservationsLocataire } = await supabase
      .from('reservations')
      .select('id')
      .eq('locataire_id', locataire_id)
      .in('statut_reservation', ['en_attente', 'confirmee'])
      .or(`date_debut_location.lte.${dateFin},date_fin_location.gte.${dateDebut}`);

    if (reservationsLocataire && reservationsLocataire.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Vous avez déjà une réservation pour cette période' },
        { status: 409 }
      );
    }

    // Créer la réservation
    const reservation = await Reservation.create({
      locataire_id,
      logement_id,
      montant_total,
      date_debut_location: dateDebut.toISOString(),
      date_fin_location: dateFin.toISOString(),
      contrat_url: contrat_url || null,
      statut_reservation: 'en_attente',
      is_paiement_securise: false
    });

    // Marquer le logement comme réservé
    await logement.update({
      statut_logement: 'reserve'
    });

    return NextResponse.json({
      success: true,
      data: reservation,
      message: 'Réservation créée avec succès'
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de la création de la réservation:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création de la réservation' },
      { status: 500 }
    );
  }
}



