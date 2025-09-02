import { NextResponse } from 'next/server';
import { supabase, getSupabaseConfig } from '@/lib/supabase';
import { Bailleur, validateEmail, validatePhone } from '@/lib/model';

// GET /api/bailleurs - Récupérer tous les bailleurs (avec pagination)
export async function GET(request) {
  try {
    // Vérifier la configuration Supabase
    const config = getSupabaseConfig();
    if (!config.isConfigured) {
      return NextResponse.json({
        success: false,
        error: 'Configuration Supabase manquante',
        message: 'Veuillez configurer les variables d\'environnement Supabase',
        instructions: [
          '1. Créez un fichier .env.local à la racine du projet',
          '2. Ajoutez NEXT_PUBLIC_SUPABASE_URL=your_project_url',
          '3. Ajoutez NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key',
          '4. Redémarrez le serveur de développement'
        ]
      }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const offset = (page - 1) * limit;

    const { data, error, count } = await supabase
      .from('bailleurs')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .range(offset, offset + limit - 1)
      .order('date_inscription', { ascending: false });

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json({
        success: false,
        error: 'Erreur de base de données',
        details: error.message,
        hint: 'Vérifiez que les tables existent dans Supabase'
      }, { status: 500 });
    }

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
    console.error('Erreur lors de la récupération des bailleurs:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des bailleurs' },
      { status: 500 }
    );
  }
}

// POST /api/bailleurs - Créer un nouveau bailleur
export async function POST(request) {
  try {
    const body = await request.json();
    const { nom, email, telephone, user_id } = body;

    // Validation des données
    if (!nom || !email || !telephone || !user_id) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    if (!validatePhone(telephone)) {
      return NextResponse.json(
        { success: false, error: 'Format de téléphone invalide' },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const { data: existingBailleur } = await supabase
      .from('bailleurs')
      .select('id')
      .eq('email', email)
      .single();

    if (existingBailleur) {
      return NextResponse.json(
        { success: false, error: 'Un bailleur avec cet email existe déjà' },
        { status: 409 }
      );
    }

    // Vérifier si l'utilisateur existe déjà
    const { data: existingUser } = await supabase
      .from('bailleurs')
      .select('id')
      .eq('user_id', user_id)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Un profil bailleur existe déjà pour cet utilisateur' },
        { status: 409 }
      );
    }

    // Créer le bailleur
    const bailleur = await Bailleur.create({
      nom,
      email,
      telephone,
      user_id,
      is_active: true
    });

    return NextResponse.json({
      success: true,
      data: bailleur,
      message: 'Bailleur créé avec succès'
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de la création du bailleur:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création du bailleur' },
      { status: 500 }
    );
  }
}


