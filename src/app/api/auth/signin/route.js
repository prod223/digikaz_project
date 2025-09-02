import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { validateEmail } from '@/lib/model';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation des données
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Authentifier l'utilisateur avec Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      console.error('Erreur Supabase Auth:', authError);
      
      // Gérer les erreurs spécifiques
      if (authError.message.includes('Invalid login credentials')) {
        return NextResponse.json(
          { success: false, error: 'Email ou mot de passe incorrect' },
          { status: 401 }
        );
      }
      
      if (authError.message.includes('Email not confirmed')) {
        return NextResponse.json(
          { success: false, error: 'Veuillez confirmer votre email avant de vous connecter' },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { success: false, error: 'Erreur lors de la connexion' },
        { status: 500 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { success: false, error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Récupérer le profil utilisateur
    const type_utilisateur = authData.user.user_metadata?.type_utilisateur;
    let profileData = null;

    if (type_utilisateur === 'bailleur') {
      const { data: bailleurData, error: bailleurError } = await supabase
        .from('bailleurs')
        .select('*')
        .eq('user_id', authData.user.id)
        .eq('is_active', true)
        .single();

      if (!bailleurError && bailleurData) {
        profileData = bailleurData;
      }
    } else if (type_utilisateur === 'locataire') {
      const { data: locataireData, error: locataireError } = await supabase
        .from('locataires')
        .select('*')
        .eq('user_id', authData.user.id)
        .eq('is_active', true)
        .single();

      if (!locataireError && locataireData) {
        profileData = locataireData;
      }
    }

    // Vérifier si le profil existe et est actif
    if (!profileData) {
      return NextResponse.json(
        { success: false, error: 'Profil utilisateur non trouvé ou inactif' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Connexion réussie',
      data: {
        user: {
          id: authData.user.id,
          email: authData.user.email,
          type_utilisateur
        },
        profile: profileData,
        session: {
          access_token: authData.session.access_token,
          refresh_token: authData.session.refresh_token,
          expires_at: authData.session.expires_at
        }
      }
    });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}



