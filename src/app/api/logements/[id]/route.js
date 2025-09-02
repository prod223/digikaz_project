import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Logement, calculateCompatibilityScore } from '@/lib/model';

// GET /api/logements/[id] - Récupérer un logement par ID avec détails complets
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const locataire_id = searchParams.get('locataire_id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID du logement requis' },
        { status: 400 }
      );
    }

    const logement = await Logement.getById(id);

    if (!logement) {
      return NextResponse.json(
        { success: false, error: 'Logement non trouvé' },
        { status: 404 }
      );
    }

    // Récupérer les informations complètes du logement
    const [bailleur, avis] = await Promise.all([
      logement.getBailleur(),
      logement.getAvis()
    ]);

    let responseData = {
      ...logement,
      bailleur,
      avis,
      note_moyenne: 0
    };

    // Calculer la note moyenne si il y a des avis
    if (avis && avis.length > 0) {
      const totalNotes = avis.reduce((sum, avis) => sum + avis.note, 0);
      responseData.note_moyenne = Math.round(totalNotes / avis.length * 10) / 10;
    }

    // Calculer le score de compatibilité si un locataire_id est fourni
    if (locataire_id) {
      const compatibilityScore = await calculateCompatibilityScore(locataire_id, id);
      responseData.compatibility_score = compatibilityScore;
    }

    return NextResponse.json({
      success: true,
      data: responseData
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du logement:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération du logement' },
      { status: 500 }
    );
  }
}

// PUT /api/logements/[id] - Mettre à jour un logement
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const {
      titre,
      accroche,
      adresse,
      latitude,
      longitude,
      prix,
      type_logement,
      disponible,
      statut_logement,
      photos
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID du logement requis' },
        { status: 400 }
      );
    }

    const logement = await Logement.getById(id);

    if (!logement) {
      return NextResponse.json(
        { success: false, error: 'Logement non trouvé' },
        { status: 404 }
      );
    }

    // Validation des données
    const updateData = {};
    
    if (titre !== undefined) {
      if (!titre.trim()) {
        return NextResponse.json(
          { success: false, error: 'Le titre ne peut pas être vide' },
          { status: 400 }
        );
      }
      updateData.titre = titre.trim();
    }

    if (accroche !== undefined) {
      updateData.accroche = accroche?.trim() || null;
    }

    if (adresse !== undefined) {
      if (!adresse.trim()) {
        return NextResponse.json(
          { success: false, error: 'L\'adresse ne peut pas être vide' },
          { status: 400 }
        );
      }
      updateData.adresse = adresse.trim();
    }

    if (latitude !== undefined) {
      if (latitude < -90 || latitude > 90) {
        return NextResponse.json(
          { success: false, error: 'Latitude invalide' },
          { status: 400 }
        );
      }
      updateData.latitude = latitude;
    }

    if (longitude !== undefined) {
      if (longitude < -180 || longitude > 180) {
        return NextResponse.json(
          { success: false, error: 'Longitude invalide' },
          { status: 400 }
        );
      }
      updateData.longitude = longitude;
    }

    if (prix !== undefined) {
      if (prix <= 0) {
        return NextResponse.json(
          { success: false, error: 'Le prix doit être supérieur à 0' },
          { status: 400 }
        );
      }
      updateData.prix = prix;
    }

    if (type_logement !== undefined) {
      if (!['Appartement', 'Maison', 'Studio'].includes(type_logement)) {
        return NextResponse.json(
          { success: false, error: 'Type de logement invalide' },
          { status: 400 }
        );
      }
      updateData.type_logement = type_logement;
    }

    if (disponible !== undefined) {
      updateData.disponible = disponible;
    }

    if (statut_logement !== undefined) {
      if (!['disponible', 'reserve', 'indisponible'].includes(statut_logement)) {
        return NextResponse.json(
          { success: false, error: 'Statut de logement invalide' },
          { status: 400 }
        );
      }
      updateData.statut_logement = statut_logement;
    }

    if (photos !== undefined) {
      if (!Array.isArray(photos)) {
        return NextResponse.json(
          { success: false, error: 'Les photos doivent être un tableau' },
          { status: 400 }
        );
      }
      updateData.photos = photos;
    }

    // Mettre à jour le logement
    const updatedLogement = await logement.update(updateData);

    return NextResponse.json({
      success: true,
      data: updatedLogement,
      message: 'Logement mis à jour avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du logement:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour du logement' },
      { status: 500 }
    );
  }
}

// DELETE /api/logements/[id] - Supprimer un logement (soft delete)
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID du logement requis' },
        { status: 400 }
      );
    }

    const logement = await Logement.getById(id);

    if (!logement) {
      return NextResponse.json(
        { success: false, error: 'Logement non trouvé' },
        { status: 404 }
      );
    }

    // Vérifier s'il y a des réservations actives
    const { data: reservations } = await supabase
      .from('reservations')
      .select('id')
      .eq('logement_id', id)
      .in('statut_reservation', ['en_attente', 'confirmee']);

    if (reservations && reservations.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Impossible de supprimer un logement avec des réservations actives' },
        { status: 409 }
      );
    }

    // Marquer le logement comme indisponible (soft delete)
    await logement.update({
      disponible: false,
      statut_logement: 'indisponible'
    });

    return NextResponse.json({
      success: true,
      message: 'Logement supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression du logement:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression du logement' },
      { status: 500 }
    );
  }
}



