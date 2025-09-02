import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  try {
    // Récupérer l'utilisateur actuel depuis Supabase Auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Utilisateur non authentifié' },
        { status: 401 }
      );
    }

    // Récupérer le profil utilisateur
    const type_utilisateur = user.user_metadata?.type_utilisateur;
    let profileData = null;

    if (type_utilisateur === 'bailleur') {
      const { data: bailleurData, error: bailleurError } = await supabase
        .from('bailleurs')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (!bailleurError && bailleurData) {
        profileData = bailleurData;
      }
    } else if (type_utilisateur === 'locataire') {
      const { data: locataireData, error: locataireError } = await supabase
        .from('locataires')
        .select('*')
        .eq('user_id', user.id)
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
      data: {
        user: {
          id: user.id,
          email: user.email,
          type_utilisateur,
          email_confirmed_at: user.email_confirmed_at,
          created_at: user.created_at
        },
        profile: profileData
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération du profil' },
      { status: 500 }
    );
  }
}



