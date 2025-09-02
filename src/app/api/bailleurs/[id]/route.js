import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Bailleur, validateEmail, validatePhone } from '@/lib/model';

// GET /api/bailleurs/[id] - Récupérer un bailleur par ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID du bailleur requis' },
        { status: 400 }
      );
    }

    const bailleur = await Bailleur.getById(id);

    if (!bailleur) {
      return NextResponse.json(
        { success: false, error: 'Bailleur non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: bailleur
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du bailleur:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération du bailleur' },
      { status: 500 }
    );
  }
}

// PUT /api/bailleurs/[id] - Mettre à jour un bailleur
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { nom, email, telephone } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID du bailleur requis' },
        { status: 400 }
      );
    }

    const bailleur = await Bailleur.getById(id);

    if (!bailleur) {
      return NextResponse.json(
        { success: false, error: 'Bailleur non trouvé' },
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
      
      // Vérifier si l'email existe déjà (sauf pour ce bailleur)
      const { data: existingBailleur } = await supabase
        .from('bailleurs')
        .select('id')
        .eq('email', email)
        .neq('id', id)
        .single();

      if (existingBailleur) {
        return NextResponse.json(
          { success: false, error: 'Un bailleur avec cet email existe déjà' },
          { status: 409 }
        );
      }
      updateData.email = email;
    }

    if (telephone !== undefined) {
      if (!validatePhone(telephone)) {
        return NextResponse.json(
          { success: false, error: 'Format de téléphone invalide' },
          { status: 400 }
        );
      }
      updateData.telephone = telephone;
    }

    // Mettre à jour le bailleur
    const updatedBailleur = await bailleur.update(updateData);

    return NextResponse.json({
      success: true,
      data: updatedBailleur,
      message: 'Bailleur mis à jour avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du bailleur:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour du bailleur' },
      { status: 500 }
    );
  }
}

// DELETE /api/bailleurs/[id] - Désactiver un bailleur
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID du bailleur requis' },
        { status: 400 }
      );
    }

    const bailleur = await Bailleur.getById(id);

    if (!bailleur) {
      return NextResponse.json(
        { success: false, error: 'Bailleur non trouvé' },
        { status: 404 }
      );
    }

    // Désactiver le bailleur (soft delete)
    await bailleur.deactivate();

    return NextResponse.json({
      success: true,
      message: 'Bailleur désactivé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la désactivation du bailleur:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la désactivation du bailleur' },
      { status: 500 }
    );
  }
}



