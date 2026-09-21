import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany();
    const tokens = await prisma.token.findMany();
    const claims = await prisma.claim.findMany();

    const totalRaised = campaigns.reduce((sum, camp) => sum + camp.raised, 0);
    const totalGoal = campaigns.reduce((sum, camp) => sum + camp.goal, 0);
    const totalVolume = tokens.reduce((sum, token) => sum + token.volumeUsd, 0);
    const totalClaims = claims.reduce((sum, claim) => sum + claim.amountUsdc, 0);

    return NextResponse.json({ 
      success: true, 
      data: {
        totalCampaigns: campaigns.length,
        totalTokens: tokens.length,
        totalRaised,
        totalGoal,
        totalVolume,
        totalClaims
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch analytics" }, { status: 500 });
  }
}
