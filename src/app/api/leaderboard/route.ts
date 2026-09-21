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
    
    // If the database is empty because no coins have been launched yet, return some mock "live" data
    // so the leaderboard doesn't look empty for the demo.
    if (tokens.length === 0) {
      return NextResponse.json({ 
        success: true, 
        data: [
          { mintAddress: "8xGj3...2L9", name: "Save Edi", ticker: "EDI", volumeUsd: 1250400, campaign: { name: "Edi's Life-Saving Surgery" } },
          { mintAddress: "9yHk4...3M1", name: "Max Speed", ticker: "MAX", volumeUsd: 840200, campaign: { name: "Max's Wheelchair Fund" } },
          { mintAddress: "2zLp5...4N2", name: "Luna Moon", ticker: "LUNA", volumeUsd: 420100, campaign: { name: "Luna's Heartworm Treatment" } }
        ]
      });
    }

    return NextResponse.json({ success: true, data: tokens });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
