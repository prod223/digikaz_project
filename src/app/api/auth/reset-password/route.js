import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { validateEmail } from '@/lib/model';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validation des données
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email requis' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Envoyer l'email de réinitialisation avec Supabase Auth
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`
    });

    if (error) {
      console.error('Erreur Supabase Auth lors de la réinitialisation:', error);
      return NextResponse.json(
        { success: false, error: 'Erreur lors de l\'envoi de l\'email de réinitialisation' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email de réinitialisation envoyé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la réinitialisation du mot de passe' },
      { status: 500 }
    );
  }
}



