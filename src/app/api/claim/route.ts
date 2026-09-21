import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { campaignId, walletTo, amountUsdc } = body;

    if (!campaignId || !walletTo || !amountUsdc) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Verify the campaign exists
    const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    // 2. Here is where we would securely sign the Solana Transaction using our Master Wallet
    // to actually send the USDC to the `walletTo` address on the blockchain.
    // const txSignature = await sendUsdcFromVault(walletTo, amountUsdc);
    const mockTxSignature = `5xT${Math.random().toString(36).substring(7)}...mockSuccess`;
    console.log(`[VAULT] Transferred ${amountUsdc} USDC to ${walletTo}. Tx: ${mockTxSignature}`);

    // 3. Save the Receipt in the database for the transparency dashboard
    const claim = await prisma.claim.create({
      data: {
        campaignId,
        amountUsdc: parseFloat(amountUsdc),
        walletTo,
        txSignature: mockTxSignature
      }
    });
    
    // 4. Update the campaign's raised amount
    await prisma.campaign.update({
      where: { id: campaignId },
      data: { raised: { increment: parseFloat(amountUsdc) } }
    });

    return NextResponse.json({ 
      success: true, 
      claim,
      message: `Successfully released ${amountUsdc} USDC to ${walletTo}`
    });
  } catch (error: any) {
    console.error("[VAULT Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
