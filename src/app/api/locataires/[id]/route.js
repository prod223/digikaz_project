import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Locataire, validateEmail } from '@/lib/model';

// GET /api/locataires/[id] - Récupérer un locataire par ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID du locataire requis' },
        { status: 400 }
      );
    }

    const locataire = await Locataire.getById(id);

    if (!locataire) {
      return NextResponse.json(
        { success: false, error: 'Locataire non trouvé' },
        { status: 404 }
      );
    }

    // Récupérer les informations complètes du locataire
    const [profil, preferences, reservations] = await Promise.all([
      locataire.getProfil(),
      locataire.getPreferences(),
      locataire.getReservations()
    ]);

    return NextResponse.json({
      success: true,
      data: {
        ...locataire,
        profil,
        preferences,
        reservations
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du locataire:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération du locataire' },
      { status: 500 }
    );
  }
}

// PUT /api/locataires/[id] - Mettre à jour un locataire
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { nom, email, universite } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID du locataire requis' },
        { status: 400 }
      );
    }

    const locataire = await Locataire.getById(id);

    if (!locataire) {
      return NextResponse.json(
        { success: false, error: 'Locataire non trouvé' },
        { status: 404 }
      );
    }

    // Validation des données
    const updateData = {};
    
    if (nom !== undefined) {
      if (!nom.trim()) {
        return NextResponse.json(
          { success: false, error: 'Le nom ne peut pas être vide' },
          { status: 400 }
        );
      }
      updateData.nom = nom.trim();
    }

    if (email !== undefined) {
      if (!validateEmail(email)) {
        return NextResponse.json(
          { success: false, error: 'Format d\'email invalide' },
          { status: 400 }
        );
      }
      
      // Vérifier si l'email existe déjà (sauf pour ce locataire)
      const { data: existingLocataire } = await supabase
        .from('locataires')
        .select('id')
        .eq('email', email)
        .neq('id', id)
        .single();

      if (existingLocataire) {
        return NextResponse.json(
          { success: false, error: 'Un locataire avec cet email existe déjà' },
          { status: 409 }
        );
      }
      updateData.email = email;
    }

    if (universite !== undefined) {
      if (!universite.trim()) {
        return NextResponse.json(
          { success: false, error: 'L\'université ne peut pas être vide' },
          { status: 400 }
        );
      }
      updateData.universite = universite.trim();
    }

    // Mettre à jour le locataire
    const updatedLocataire = await locataire.update(updateData);

    return NextResponse.json({
      success: true,
      data: updatedLocataire,
      message: 'Locataire mis à jour avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du locataire:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour du locataire' },
      { status: 500 }
    );
  }
}

// DELETE /api/locataires/[id] - Désactiver un locataire
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID du locataire requis' },
        { status: 400 }
      );
    }

    const locataire = await Locataire.getById(id);

    if (!locataire) {
      return NextResponse.json(
        { success: false, error: 'Locataire non trouvé' },
        { status: 404 }
      );
    }

    // Désactiver le locataire (soft delete)
    await locataire.deactivate();

    return NextResponse.json({
      success: true,
      message: 'Locataire désactivé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la désactivation du locataire:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la désactivation du locataire' },
      { status: 500 }
    );
  }
}



