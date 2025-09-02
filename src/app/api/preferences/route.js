import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Locataire } from '@/lib/model';

// GET /api/preferences - Récupérer les préférences d'un locataire
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const locataire_id = searchParams.get('locataire_id');

    if (!locataire_id) {
      return NextResponse.json(
        { success: false, error: 'ID du locataire requis' },
        { status: 400 }
      );
    }

    // Vérifier que le locataire existe
    const locataire = await Locataire.getById(locataire_id);
    if (!locataire) {
      return NextResponse.json(
        { success: false, error: 'Locataire non trouvé' },
        { status: 404 }
      );
    }

    // Récupérer les préférences
    const preferences = await locataire.getPreferences();

    return NextResponse.json({
      success: true,
      data: preferences
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des préférences:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des préférences' },
      { status: 500 }
    );
  }
}

// POST /api/preferences - Créer ou mettre à jour les préférences d'un locataire
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      locataire_id,
      type_logement,
      budget_min,
      budget_max,
      rayon_km,
      autres_spec
    } = body;

    // Validation des données
    if (!locataire_id || !type_logement || !budget_min || !budget_max || !rayon_km) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs obligatoires sont requis' },
        { status: 400 }
      );
    }

    if (!['Appartement', 'Maison', 'Studio'].includes(type_logement)) {
      return NextResponse.json(
        { success: false, error: 'Type de logement invalide' },
        { status: 400 }
      );
    }

    if (budget_min <= 0 || budget_max <= 0) {
      return NextResponse.json(
        { success: false, error: 'Les budgets doivent être supérieurs à 0' },
        { status: 400 }
      );
    }

    if (budget_min > budget_max) {
      return NextResponse.json(
        { success: false, error: 'Le budget minimum ne peut pas être supérieur au budget maximum' },
        { status: 400 }
      );
    }

    if (rayon_km <= 0 || rayon_km > 100) {
      return NextResponse.json(
        { success: false, error: 'Le rayon doit être compris entre 1 et 100 km' },
        { status: 400 }
      );
    }

    // Vérifier que le locataire existe
    const locataire = await Locataire.getById(locataire_id);
    if (!locataire || !locataire.is_active) {
      return NextResponse.json(
        { success: false, error: 'Locataire non trouvé ou inactif' },
        { status: 404 }
      );
    }

    // Vérifier si des préférences existent déjà
    const { data: existingPreferences } = await supabase
      .from('preferenceslocataires')
      .select('id')
      .eq('locataire_id', locataire_id);

    if (existingPreferences && existingPreferences.length > 0) {
      // Mettre à jour les préférences existantes
      const { data, error } = await supabase
        .from('preferenceslocataires')
        .update({
          type_logement,
          budget_min,
          budget_max,
          rayon_km,
          autres_spec: autres_spec?.trim() || null
        })
        .eq('locataire_id', locataire_id)
        .select()
        .single();

      if (error) throw error;

      return NextResponse.json({
        success: true,
        data,
        message: 'Préférences mises à jour avec succès'
      });
    }

    // Créer de nouvelles préférences
    const { data, error } = await supabase
      .from('preferenceslocataires')
      .insert([{
        locataire_id,
        type_logement,
        budget_min,
        budget_max,
        rayon_km,
        autres_spec: autres_spec?.trim() || null
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: 'Préférences créées avec succès'
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de la création/mise à jour des préférences:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création/mise à jour des préférences' },
      { status: 500 }
    );
  }
}



