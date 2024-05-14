import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseAndUser, getDb } from '@/app/lib/utils/db';
import { sendErrorResponse } from '@/app/lib/utils/response';

import { pinecone } from '@/app/lib/client/pinecone';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const db = await getDb();
    const requestBody = await req.json();
    const { data, userEmail, chunkBatch } = requestBody;
    const { user } = await getDatabaseAndUser(db, userEmail);

    if (user.ragId) {
      const response = await pinecone.upsert(data, user, chunkBatch);
      if (response.success === false) {
        return sendErrorResponse('Pinecone upsert unsuccessful', 400);
      }
      return NextResponse.json({
        message: 'Pinecone upserted successfully',
        ragId: user.ragId,
        response,
        isRagEnabled: user.isRagEnabled,
        status: 200,
      });
    } else {
      return sendErrorResponse(
        'Upsert cannot proceed without a valid user ragId',
        400
      );
    }
  } catch (error: any) {
    console.error('Pinecone upsert unsuccessful: ', error);
    return sendErrorResponse('Pinecone upsert unsuccessful', 400);
  }
}
