import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Logement, calculateCompatibilityScore } from '@/lib/model';

// GET /api/search - Recherche avancée de logements
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const offset = (page - 1) * limit;

    // Paramètres de recherche
    const type_logement = searchParams.get('type_logement');
    const prix_min = searchParams.get('prix_min') ? parseInt(searchParams.get('prix_min')) : null;
    const prix_max = searchParams.get('prix_max') ? parseInt(searchParams.get('prix_max')) : null;
    const lat = searchParams.get('lat') ? parseFloat(searchParams.get('lat')) : null;
    const lng = searchParams.get('lng') ? parseFloat(searchParams.get('lng')) : null;
    const radius = searchParams.get('radius') ? parseFloat(searchParams.get('radius')) : 10;
    const sort_by = searchParams.get('sort_by') || 'date_ajout';
    const locataire_id = searchParams.get('locataire_id');
    const universite = searchParams.get('universite');
    const score_min = searchParams.get('score_min') ? parseFloat(searchParams.get('score_min')) : null;

    let query = supabase
      .from('logements')
      .select(`
        *,
        bailleurs:nom,
        bailleurs:email,
        bailleurs:telephone
      `, { count: 'exact' });

    // Filtres de base
    query = query.eq('disponible', true);
    query = query.eq('statut_logement', 'disponible');

    // Appliquer les filtres
    if (type_logement) {
      query = query.eq('type_logement', type_logement);
    }
    if (prix_min !== null) {
      query = query.gte('prix', prix_min);
    }
    if (prix_max !== null) {
      query = query.lte('prix', prix_max);
    }
    if (score_min !== null) {
      query = query.gte('score', score_min);
    }

    // Recherche géographique
    if (lat && lng) {
      const latDelta = radius / 111.32;
      const lngDelta = radius / (111.32 * Math.cos(lat * Math.PI / 180));
      
      query = query
        .gte('latitude', lat - latDelta)
        .lte('latitude', lat + latDelta)
        .gte('longitude', lng - lngDelta)
        .lte('longitude', lng + lngDelta);
    }

    // Tri
    if (sort_by === 'score') {
      query = query.order('score', { ascending: false });
    } else if (sort_by === 'prix') {
      query = query.order('prix', { ascending: true });
    } else if (sort_by === 'prix_desc') {
      query = query.order('prix', { ascending: false });
    } else {
      query = query.order('date_ajout', { ascending: false });
    }

    const { data, error, count } = await query
      .range(offset, offset + limit - 1);

    if (error) throw error;

    // Calculer les scores de compatibilité si un locataire_id est fourni
    let logementsWithScores = data;
    if (locataire_id && data.length > 0) {
      logementsWithScores = await Promise.all(
        data.map(async (logement) => {
          const score = await calculateCompatibilityScore(locataire_id, logement.id);
          return { ...logement, compatibility_score: score };
        })
      );

      // Trier par score de compatibilité si demandé
      if (sort_by === 'compatibility') {
        logementsWithScores.sort((a, b) => b.compatibility_score - a.compatibility_score);
      }
    }

    // Filtrer par université si spécifié (recherche dans les préférences des locataires)
    if (universite && locataire_id) {
      // Cette logique peut être étendue selon vos besoins
      // Pour l'instant, on retourne tous les logements
    }

    // Statistiques de recherche
    const stats = {
      total_results: count,
      filters_applied: {
        type_logement: !!type_logement,
        prix_range: !!(prix_min || prix_max),
        location: !!(lat && lng),
        score_min: !!score_min
      }
    };

    return NextResponse.json({
      success: true,
      data: logementsWithScores,
      stats,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      },
      search_params: {
        type_logement,
        prix_min,
        prix_max,
        lat,
        lng,
        radius,
        sort_by,
        locataire_id: locataire_id ? 'provided' : null,
        universite
      }
    });
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la recherche' },
      { status: 500 }
    );
  }
}



