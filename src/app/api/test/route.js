export async function GET() {
  return Response.json({
    success: true,
    message: 'API DigiKaz fonctionne correctement !',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
}
