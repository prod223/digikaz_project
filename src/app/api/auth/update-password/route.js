import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PUT(request) {
  try {
    const body = await request.json();
    const { password } = body;

    // Validation des données
    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Nouveau mot de passe requis' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      );
    }

    // Vérifier que l'utilisateur est connecté
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Utilisateur non authentifié' },
        { status: 401 }
      );
    }

    // Mettre à jour le mot de passe avec Supabase Auth
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      console.error('Erreur Supabase Auth lors de la mise à jour:', error);
      return NextResponse.json(
        { success: false, error: 'Erreur lors de la mise à jour du mot de passe' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Mot de passe mis à jour avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour du mot de passe' },
      { status: 500 }
    );
  }
}



