import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    // Déconnecter l'utilisateur avec Supabase Auth
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Erreur Supabase Auth lors de la déconnexion:', error);
      return NextResponse.json(
        { success: false, error: 'Erreur lors de la déconnexion' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Déconnexion réussie'
    });

  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la déconnexion' },
      { status: 500 }
    );
  }
}



