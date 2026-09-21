/* eslint-disable */
// @ts-nocheck
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all tokens, order by volume descending, and include the campaign they support
    const tokens = await prisma.token.findMany({
      orderBy: { volumeUsd: 'desc' },
      include: { campaign: true }
    });
    
    return NextResponse.json({ success: true, data: tokens });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
