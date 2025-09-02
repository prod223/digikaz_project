import { NextResponse } from 'next/server';
import { getSupabaseConfig, checkSupabaseConnection } from '@/lib/supabase';

export async function GET() {
  try {
    const config = getSupabaseConfig();
    const isConnected = await checkSupabaseConnection();

    const healthStatus = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      supabase: {
        configured: config.isConfigured,
        connected: isConnected,
        url: config.url ? 'configured' : 'missing',
        key: config.key ? 'configured' : 'missing'
      },
      environment_variables: {
        NEXT_PUBLIC_SUPABASE_URL: config.url ? '✅ Set' : '❌ Missing',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: config.key ? '✅ Set' : '❌ Missing',
        NODE_ENV: process.env.NODE_ENV || '❌ Missing'
      }
    };

    if (!config.isConfigured) {
      healthStatus.status = 'error';
      healthStatus.message = 'Supabase configuration is missing';
      healthStatus.instructions = [
        '1. Create a .env.local file in your project root',
        '2. Add your Supabase URL: NEXT_PUBLIC_SUPABASE_URL=your_project_url',
        '3. Add your Supabase anon key: NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key',
        '4. Restart your development server'
      ];
    }

    return NextResponse.json(healthStatus, {
      status: healthStatus.status === 'ok' ? 200 : 500
    });

  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Health check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

