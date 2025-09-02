import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Logement, calculateCompatibilityScore } from '@/lib/model';

// GET /api/logements - Rechercher des logements avec filtres avancés
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
    const disponible = searchParams.get('disponible') !== null ? searchParams.get('disponible') === 'true' : null;
    const statut_logement = searchParams.get('statut_logement');
    const sort_by = searchParams.get('sort_by') || 'date_ajout';
    const lat = searchParams.get('lat') ? parseFloat(searchParams.get('lat')) : null;
    const lng = searchParams.get('lng') ? parseFloat(searchParams.get('lng')) : null;
    const radius = searchParams.get('radius') ? parseFloat(searchParams.get('radius')) : 10;
    const locataire_id = searchParams.get('locataire_id'); // Pour calculer la compatibilité

    let query = supabase
      .from('logements')
      .select('*', { count: 'exact' });

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
    if (disponible !== null) {
      query = query.eq('disponible', disponible);
    }
    if (statut_logement) {
      query = query.eq('statut_logement', statut_logement);
    }

    // Recherche géographique si les coordonnées sont fournies
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

    return NextResponse.json({
      success: true,
      data: logementsWithScores,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      },
      filters: {
        type_logement,
        prix_min,
        prix_max,
        disponible,
        statut_logement,
        sort_by,
        lat,
        lng,
        radius
      }
    });
  } catch (error) {
    console.error('Erreur lors de la recherche de logements:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la recherche de logements' },
      { status: 500 }
    );
  }
}

// POST /api/logements - Créer un nouveau logement
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      bailleur_id,
      titre,
      accroche,
      adresse,
      latitude,
      longitude,
      prix,
      type_logement,
      statut_logement,
      photos = []
    } = body;

    // Validation des données
    if (!bailleur_id || !titre || !adresse || !prix || !type_logement) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs obligatoires sont requis' },
        { status: 400 }
      );
    }

    if (!titre.trim() || !adresse.trim()) {
      return NextResponse.json(
        { success: false, error: 'Le titre et l\'adresse ne peuvent pas être vides' },
        { status: 400 }
      );
    }

    if (prix <= 0) {
      return NextResponse.json(
        { success: false, error: 'Le prix doit être supérieur à 0' },
        { status: 400 }
      );
    }

    if (!['Studio', 'Maison', 'Appartement'].includes(type_logement)) {
      return NextResponse.json(
        { success: false, error: 'Type de logement invalide. Types acceptés: Studio, Maison, Appartement' },
        { status: 400 }
      );
    }

    // Validation du statut_logement
    if (statut_logement && !['disponible', 'reserve', 'indisponible'].includes(statut_logement)) {
      return NextResponse.json(
        { success: false, error: 'Statut de logement invalide. Statuts acceptés: disponible, reserve, indisponible' },
        { status: 400 }
      );
    }

    if (latitude && (latitude < -90 || latitude > 90)) {
      return NextResponse.json(
        { success: false, error: 'Latitude invalide' },
        { status: 400 }
      );
    }

    if (longitude && (longitude < -180 || longitude > 180)) {
      return NextResponse.json(
        { success: false, error: 'Longitude invalide' },
        { status: 400 }
      );
    }

    // Vérifier que le bailleur existe
    const { data: bailleur } = await supabase
      .from('bailleurs')
      .select('id')
      .eq('id', bailleur_id)
      .eq('is_active', true)
      .single();

    if (!bailleur) {
      return NextResponse.json(
        { success: false, error: 'Bailleur non trouvé ou inactif' },
        { status: 404 }
      );
    }

    // Créer le logement
    const logement = await Logement.create({
      bailleur_id,
      titre: titre.trim(),
      accroche: accroche?.trim() || null,
      adresse: adresse.trim(),
      latitude: latitude || 0,
      longitude: longitude || 0,
      prix,
      type_logement,
      score: 0,
      disponible: true,
      statut_logement: statut_logement || 'disponible',
      photos: Array.isArray(photos) ? photos : []
    });

    return NextResponse.json({
      success: true,
      data: logement,
      message: 'Logement créé avec succès'
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de la création du logement:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création du logement' },
      { status: 500 }
    );
  }
}


