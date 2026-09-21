import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const name = formData.get('name') as string;
    const ticker = formData.get('ticker') as string;
    const description = formData.get('description') as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // --- MOCK IPFS UPLOAD (PINATA) ---
    // In production, we would stream this file buffer to Pinata's /pinFileToIPFS endpoint.
    console.log(`[IPFS] Uploading ${file.name} to IPFS...`);
    const mockImageHash = "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG"; // Mock dog image hash
    const imageUrl = `https://gateway.pinata.cloud/ipfs/${mockImageHash}`;
    
    console.log(`[IPFS] Image uploaded successfully: ${imageUrl}`);

    // Now we create the JSON metadata file required by Solana Token standard
    const metadata = {
      name,
      symbol: ticker,
      description,
      image: imageUrl,
      attributes: [
        { trait_type: "Platform", value: "ShelterFund" }
      ]
    };

    console.log(`[IPFS] Uploading JSON Metadata to IPFS...`);
    // In production, we would upload this JSON object to Pinata's /pinJSONToIPFS endpoint.
    const mockMetadataHash = "QmZ4t44xW7d64gE625s3Xf2nemtYgPpHdWEz79ojWnPbdG";
    const metadataUri = `https://gateway.pinata.cloud/ipfs/${mockMetadataHash}`;

    console.log(`[IPFS] Metadata pinned successfully: ${metadataUri}`);

    return NextResponse.json({ success: true, metadataUri });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to pin to IPFS" }, { status: 500 });
  }
}
