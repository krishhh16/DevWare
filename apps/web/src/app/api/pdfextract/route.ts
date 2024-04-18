// pages/api/pdfExtract.js

import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import PDFParser from 'pdf-parse';

export async function POST(req: NextRequest) {
  
  const { pdfPath } = await req.json();

  try {
    // Read PDF file
    const pdfBuffer = fs.readFileSync(pdfPath);

    // Parse PDF
    const data = await PDFParser(pdfBuffer);
      const text = data.text;
    return NextResponse.json({text}, {status: 200})
  } catch (error) {
    return NextResponse.json({error})
  }
}
