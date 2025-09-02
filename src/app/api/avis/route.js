import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Avis, Logement, Locataire, Bailleur } from '@/lib/model';

// GET /api/avis - Récupérer les avis avec filtres
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const offset = (page - 1) * limit;

    // Paramètres de filtrage
    const logement_id = searchParams.get('logement_id');
    const locataire_id = searchParams.get('locataire_id');
    const bailleur_id = searchParams.get('bailleur_id');
    const note_min = searchParams.get('note_min') ? parseInt(searchParams.get('note_min')) : null;
    const note_max = searchParams.get('note_max') ? parseInt(searchParams.get('note_max')) : null;

    let query = supabase
      .from('avis')
      .select(`
        *,
        logements:titre,
        locataires:nom,
        bailleurs:nom
      `, { count: 'exact' });

    // Appliquer les filtres
    if (logement_id) {
      query = query.eq('logement_id', logement_id);
    }
    if (locataire_id) {
      query = query.eq('locataire_id', locataire_id);
    }
    if (bailleur_id) {
      query = query.eq('bailleur_id', bailleur_id);
    }
    if (note_min !== null) {
      query = query.gte('note', note_min);
    }
    if (note_max !== null) {
      query = query.lte('note', note_max);
    }

    const { data, error, count } = await query
      .order('date_avis', { ascending: false })
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
    console.error('Erreur lors de la récupération des avis:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des avis' },
      { status: 500 }
    );
  }
}

// POST /api/avis - Créer un nouvel avis
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      locataire_id,
      bailleur_id,
      logement_id,
      note,
      commentaire
    } = body;

    // Validation des données
    if (!logement_id || !note) {
      return NextResponse.json(
        { success: false, error: 'Le logement et la note sont requis' },
        { status: 400 }
      );
    }

    if (note < 1 || note > 5) {
      return NextResponse.json(
        { success: false, error: 'La note doit être comprise entre 1 et 5' },
        { status: 400 }
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

    // Vérifier que le locataire existe (si fourni)
    if (locataire_id) {
      const locataire = await Locataire.getById(locataire_id);
      if (!locataire || !locataire.is_active) {
        return NextResponse.json(
          { success: false, error: 'Locataire non trouvé ou inactif' },
          { status: 404 }
        );
      }
    }

    // Vérifier que le bailleur existe (si fourni)
    if (bailleur_id) {
      const bailleur = await Bailleur.getById(bailleur_id);
      if (!bailleur || !bailleur.is_active) {
        return NextResponse.json(
          { success: false, error: 'Bailleur non trouvé ou inactif' },
          { status: 404 }
        );
      }
    }

    // Vérifier si l'utilisateur a déjà laissé un avis pour ce logement
    const { data: existingAvis } = await supabase
      .from('avis')
      .select('id')
      .eq('logement_id', logement_id);

    if (locataire_id) {
      const { data: existingLocataireAvis } = await supabase
        .from('avis')
        .select('id')
        .eq('logement_id', logement_id)
        .eq('locataire_id', locataire_id)
        .single();

      if (existingLocataireAvis) {
        return NextResponse.json(
          { success: false, error: 'Vous avez déjà laissé un avis pour ce logement' },
          { status: 409 }
        );
      }
    }

    if (bailleur_id) {
      const { data: existingBailleurAvis } = await supabase
        .from('avis')
        .select('id')
        .eq('logement_id', logement_id)
        .eq('bailleur_id', bailleur_id)
        .single();

      if (existingBailleurAvis) {
        return NextResponse.json(
          { success: false, error: 'Vous avez déjà laissé un avis pour ce logement' },
          { status: 409 }
        );
      }
    }

    // Créer l'avis
    const avis = await Avis.create({
      locataire_id: locataire_id || null,
      bailleur_id: bailleur_id || null,
      logement_id,
      note,
      commentaire: commentaire?.trim() || null
    });

    // Mettre à jour le score du logement
    const { data: allAvis } = await supabase
      .from('avis')
      .select('note')
      .eq('logement_id', logement_id);

    if (allAvis && allAvis.length > 0) {
      const totalNotes = allAvis.reduce((sum, avis) => sum + avis.note, 0);
      const scoreMoyen = totalNotes / allAvis.length;
      
      await logement.update({ score: Math.round(scoreMoyen * 10) / 10 });
    }

    return NextResponse.json({
      success: true,
      data: avis,
      message: 'Avis créé avec succès'
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de la création de l\'avis:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création de l\'avis' },
      { status: 500 }
    );
  }
}


