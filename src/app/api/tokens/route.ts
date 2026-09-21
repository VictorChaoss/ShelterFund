/* eslint-disable */
// @ts-nocheck
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mintAddress, campaignId, name, ticker } = body;

    // Save the token mapping to the database
    const token = await prisma.token.create({
      data: { 
        mintAddress, 
        campaignId, 
        name, 
        ticker 
      }
    });
    
    console.log(`[DB] Successfully saved Token ${mintAddress} linked to Campaign ${campaignId}`);

    return NextResponse.json({ success: true, token });
  } catch (error: any) {
    console.error("[DB Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
