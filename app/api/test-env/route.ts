import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasPublicKey: !!process.env.MJ_APIKEY_PUBLIC,
    hasPrivateKey: !!process.env.MJ_APIKEY_PRIVATE,
    publicKeyPreview: process.env.MJ_APIKEY_PUBLIC ? 
      process.env.MJ_APIKEY_PUBLIC.substring(0, 8) + '...' : 
      'NON DÉFINIE',
    privateKeyPreview: process.env.MJ_APIKEY_PRIVATE ? 
      process.env.MJ_APIKEY_PRIVATE.substring(0, 8) + '...' : 
      'NON DÉFINIE',
    timestamp: new Date().toISOString()
  });
} 