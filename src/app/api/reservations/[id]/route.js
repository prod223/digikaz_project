import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Reservation, Logement } from '@/lib/model';

// GET /api/reservations/[id] - Récupérer une réservation par ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID de la réservation requis' },
        { status: 400 }
      );
    }

    const reservation = await Reservation.getById(id);

    if (!reservation) {
      return NextResponse.json(
        { success: false, error: 'Réservation non trouvée' },
        { status: 404 }
      );
    }

    // Récupérer les informations complètes de la réservation
    const [logement, locataire] = await Promise.all([
      reservation.getLogement(),
      reservation.getLocataire()
    ]);

    return NextResponse.json({
      success: true,
      data: {
        ...reservation,
        logement,
        locataire
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération de la réservation:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération de la réservation' },
      { status: 500 }
    );
  }
}

// PUT /api/reservations/[id] - Mettre à jour une réservation
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const {
      statut_reservation,
      montant_total,
      date_debut_location,
      date_fin_location,
      contrat_url,
      is_paiement_securise
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID de la réservation requis' },
        { status: 400 }
      );
    }

    const reservation = await Reservation.getById(id);

    if (!reservation) {
      return NextResponse.json(
        { success: false, error: 'Réservation non trouvée' },
        { status: 404 }
      );
    }

    // Validation des données
    const updateData = {};

    if (statut_reservation !== undefined) {
      if (!['en_attente', 'confirmee', 'annulee', 'terminee'].includes(statut_reservation)) {
        return NextResponse.json(
          { success: false, error: 'Statut de réservation invalide' },
          { status: 400 }
        );
      }
      updateData.statut_reservation = statut_reservation;
    }

    if (montant_total !== undefined) {
      if (montant_total <= 0) {
        return NextResponse.json(
          { success: false, error: 'Le montant total doit être supérieur à 0' },
          { status: 400 }
        );
      }
      updateData.montant_total = montant_total;
    }

    if (date_debut_location !== undefined) {
      const dateDebut = new Date(date_debut_location);
      const dateActuelle = new Date();
      
      if (dateDebut <= dateActuelle) {
        return NextResponse.json(
          { success: false, error: 'La date de début de location doit être dans le futur' },
          { status: 400 }
        );
      }
      updateData.date_debut_location = dateDebut.toISOString();
    }

    if (date_fin_location !== undefined) {
      const dateFin = new Date(date_fin_location);
      const dateDebut = date_debut_location ? new Date(date_debut_location) : new Date(reservation.date_debut_location);
      
      if (dateFin <= dateDebut) {
        return NextResponse.json(
          { success: false, error: 'La date de fin doit être postérieure à la date de début' },
          { status: 400 }
        );
      }
      updateData.date_fin_location = dateFin.toISOString();
    }

    if (contrat_url !== undefined) {
      updateData.contrat_url = contrat_url;
    }

    if (is_paiement_securise !== undefined) {
      updateData.is_paiement_securise = is_paiement_securise;
    }

    // Mettre à jour la réservation
    const updatedReservation = await reservation.update(updateData);

    // Mettre à jour le statut du logement si nécessaire
    if (statut_reservation === 'confirmee') {
      const logement = await Logement.getById(reservation.logement_id);
      if (logement) {
        await logement.update({ statut_logement: 'reserve' });
      }
    } else if (statut_reservation === 'annulee' || statut_reservation === 'terminee') {
      const logement = await Logement.getById(reservation.logement_id);
      if (logement) {
        await logement.update({ statut_logement: 'disponible' });
      }
    }

    return NextResponse.json({
      success: true,
      data: updatedReservation,
      message: 'Réservation mise à jour avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour de la réservation:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour de la réservation' },
      { status: 500 }
    );
  }
}

// DELETE /api/reservations/[id] - Annuler une réservation
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID de la réservation requis' },
        { status: 400 }
      );
    }

    const reservation = await Reservation.getById(id);

    if (!reservation) {
      return NextResponse.json(
        { success: false, error: 'Réservation non trouvée' },
        { status: 404 }
      );
    }

    // Vérifier si la réservation peut être annulée
    if (reservation.statut_reservation === 'terminee') {
      return NextResponse.json(
        { success: false, error: 'Impossible d\'annuler une réservation terminée' },
        { status: 409 }
      );
    }

    // Annuler la réservation
    await reservation.annuler();

    // Remettre le logement en disponible
    const logement = await Logement.getById(reservation.logement_id);
    if (logement) {
      await logement.update({ statut_logement: 'disponible' });
    }

    return NextResponse.json({
      success: true,
      message: 'Réservation annulée avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de l\'annulation de la réservation:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'annulation de la réservation' },
      { status: 500 }
    );
  }
}



