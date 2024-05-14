import { NextRequest, NextResponse } from 'next/server';
import {
  getDb,
  getConversation,
  createConversation,
  updateConversationSettings,
} from '@/app/lib/utils/db';
import { sendErrorResponse } from '@/app/lib/utils/response';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const db = await getDb();
  const { userEmail, message } = await req.json();
  try {
    const conversationCollection =
      db.collection<IConversation>('conversations');
    let { conversation } = await getConversation(db, userEmail);

    if (conversation) {
      await updateConversationSettings(
        conversation,
        conversationCollection,
        message
      );
    } else {
      conversation = {
        id: userEmail,
        messages: [message],
      } as IConversation;
      console.log('No existing conversation found. Creating...');
      await createConversation(conversation, conversationCollection);
    }
    return NextResponse.json({
      message: `Conversation message appended via NoSQL database.`,
      userEmail,
      newMessage: message,
      status: 200,
    });
  } catch (error: any) {
    console.error(
      `Error appending message to NoSQL database: ${error}`
    );
    return sendErrorResponse(
      `Error appending message to NoSQL database`,
      400
    );
  }
}