import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Locataire, validateEmail } from '@/lib/model';

// GET /api/locataires - Récupérer tous les locataires (avec pagination et filtres)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const universite = searchParams.get('universite');
    const offset = (page - 1) * limit;

    let query = supabase
      .from('locataires')
      .select('*', { count: 'exact' })
      .eq('is_active', true);

    // Appliquer les filtres
    if (universite) {
      query = query.ilike('universite', `%${universite}%`);
    }

    const { data, error, count } = await query
      .range(offset, offset + limit - 1)
      .order('date_inscription', { ascending: false });

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
    console.error('Erreur lors de la récupération des locataires:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des locataires' },
      { status: 500 }
    );
  }
}

// POST /api/locataires - Créer un nouveau locataire
export async function POST(request) {
  try {
    const body = await request.json();
    const { nom, email, universite, user_id } = body;

    // Validation des données
    if (!nom || !email || !universite) {
      return NextResponse.json(
        { success: false, error: 'Le nom, l\'email et l\'université sont requis' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    if (!nom.trim() || !universite.trim()) {
      return NextResponse.json(
        { success: false, error: 'Le nom et l\'université ne peuvent pas être vides' },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const { data: existingLocataire } = await supabase
      .from('locataires')
      .select('id')
      .eq('email', email)
      .single();

    if (existingLocataire) {
      return NextResponse.json(
        { success: false, error: 'Un locataire avec cet email existe déjà' },
        { status: 409 }
      );
    }

    // Vérifier si l'utilisateur existe déjà (seulement si user_id est fourni)
    if (user_id) {
      const { data: existingUser } = await supabase
        .from('locataires')
        .select('id')
        .eq('user_id', user_id)
        .single();

      if (existingUser) {
        return NextResponse.json(
          { success: false, error: 'Un profil locataire existe déjà pour cet utilisateur' },
          { status: 409 }
        );
      }
    }

    // Créer le locataire
    const locataireData = {
      nom: nom.trim(),
      email,
      universite: universite.trim(),
      is_active: true
    };

    // Ajouter user_id seulement s'il est fourni
    if (user_id) {
      locataireData.user_id = user_id;
    }

    const locataire = await Locataire.create(locataireData);

    return NextResponse.json({
      success: true,
      data: locataire,
      message: 'Locataire créé avec succès'
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de la création du locataire:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création du locataire' },
      { status: 500 }
    );
  }
}


