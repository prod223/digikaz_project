import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Interaction, Locataire, Logement } from '@/lib/model';

// GET /api/interactions - Récupérer les interactions avec filtres
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const offset = (page - 1) * limit;

    // Paramètres de filtrage
    const locataire_id = searchParams.get('locataire_id');
    const logement_id = searchParams.get('logement_id');
    const resultat = searchParams.get('resultat');

    let query = supabase
      .from('interactions')
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
    if (resultat) {
      query = query.eq('resultat', resultat);
    }

    const { data, error, count } = await query
      .order('date_interaction', { ascending: false })
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
    console.error('Erreur lors de la récupération des interactions:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des interactions' },
      { status: 500 }
    );
  }
}

// POST /api/interactions - Créer une nouvelle interaction
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      locataire_id,
      logement_id,
      resultat
    } = body;

    // Validation des données
    if (!locataire_id || !logement_id || !resultat) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    if (!['like', 'dislike', 'match'].includes(resultat)) {
      return NextResponse.json(
        { success: false, error: 'Résultat invalide' },
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

    // Vérifier que le logement existe
    const logement = await Logement.getById(logement_id);
    if (!logement) {
      return NextResponse.json(
        { success: false, error: 'Logement non trouvé' },
        { status: 404 }
      );
    }

    // Vérifier si une interaction existe déjà pour cette combinaison
    const { data: existingInteraction } = await supabase
      .from('interactions')
      .select('id, resultat')
      .eq('locataire_id', locataire_id)
      .eq('logement_id', logement_id)
      .single();

    if (existingInteraction) {
      // Mettre à jour l'interaction existante
      const { data, error } = await supabase
        .from('interactions')
        .update({ 
          resultat,
          date_interaction: new Date().toISOString()
        })
        .eq('id', existingInteraction.id)
        .select()
        .single();

      if (error) throw error;

      return NextResponse.json({
        success: true,
        data,
        message: 'Interaction mise à jour avec succès'
      });
    }

    // Créer une nouvelle interaction
    const interaction = await Interaction.create({
      locataire_id,
      logement_id,
      resultat
    });

    return NextResponse.json({
      success: true,
      data: interaction,
      message: 'Interaction créée avec succès'
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de la création de l\'interaction:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création de l\'interaction' },
      { status: 500 }
    );
  }
}



