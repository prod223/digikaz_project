import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { validateEmail, validatePhone } from '@/lib/model';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, nom, telephone, type_utilisateur } = body;

    // Validation des données
    if (!email || !password || !nom || !telephone || !type_utilisateur) {
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

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      );
    }

    if (!['bailleur', 'locataire'].includes(type_utilisateur)) {
      return NextResponse.json(
        { success: false, error: 'Type d\'utilisateur invalide (bailleur ou locataire)' },
        { status: 400 }
      );
    }

    // Créer l'utilisateur dans Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nom,
          telephone,
          type_utilisateur
        }
      }
    });

    if (authError) {
      console.error('Erreur Supabase Auth:', authError);
      
      // Gestion spécifique des erreurs d'email
      if (authError.code === 'email_address_invalid') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Adresse email invalide',
            details: 'Veuillez utiliser une adresse email valide (évitez les domaines comme example.com)',
            suggestion: 'Utilisez une adresse email réelle comme gmail.com, outlook.com, etc.'
          },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Erreur lors de la création du compte',
          details: authError.message
        },
        { status: 500 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { success: false, error: 'Impossible de créer l\'utilisateur' },
        { status: 500 }
      );
    }

    // Créer le profil dans la table appropriée
    let profileData;
    if (type_utilisateur === 'bailleur') {
      const { data: bailleurData, error: bailleurError } = await supabase
        .from('bailleurs')
        .insert([{
          user_id: authData.user.id,
          nom,
          email,
          telephone,
          is_active: true
        }])
        .select()
        .single();

      if (bailleurError) {
        // Supprimer l'utilisateur créé si l'insertion du profil échoue
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw bailleurError;
      }
      profileData = bailleurData;
    } else {
      const { data: locataireData, error: locataireError } = await supabase
        .from('locataires')
        .insert([{
          user_id: authData.user.id,
          nom,
          email,
          telephone,
          is_active: true
        }])
        .select()
        .single();

      if (locataireError) {
        // Supprimer l'utilisateur créé si l'insertion du profil échoue
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw locataireError;
      }
      profileData = locataireData;
    }

    return NextResponse.json({
      success: true,
      message: 'Compte créé avec succès. Vérifiez votre email pour confirmer votre compte.',
      data: {
        user: {
          id: authData.user.id,
          email: authData.user.email,
          type_utilisateur
        },
        profile: profileData
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  }
}


