import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validation des variables d'environnement
if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL is not defined');
  console.log('📝 Please add NEXT_PUBLIC_SUPABASE_URL to your .env.local file');
  console.log('🔗 Get your URL from: https://supabase.com/dashboard/project/_/settings/api');
}

if (!supabaseKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined');
  console.log('📝 Please add NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file');
  console.log('🔑 Get your key from: https://supabase.com/dashboard/project/_/settings/api');
}

// Création du client Supabase avec validation
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder_key'
);

// Fonction pour vérifier la connexion Supabase
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('bailleurs').select('count').limit(1);
    
    if (error) {
      console.error('❌ Supabase connection error:', error.message);
      return false;
    }
    
    console.log('✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.error('❌ Failed to connect to Supabase:', error.message);
    return false;
  }
}

// Fonction pour obtenir les informations de configuration
export function getSupabaseConfig() {
  return {
    url: supabaseUrl,
    key: supabaseKey ? `${supabaseKey.substring(0, 10)}...` : 'undefined',
    isConfigured: !!(supabaseUrl && supabaseKey)
  };
}