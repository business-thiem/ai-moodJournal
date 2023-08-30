import { analyze } from '@/utils/ai';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const user = await getUserByClerkID();
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Tell the a.i. overlords about your day',
    },
  });

  const analysis = await analyze(entry.content);

  // ...analysis copies the exact schema as it was given in entry from zod schema: hover mouse over entry and analysis variables.
  await prisma.analysis.create({
    data: {
      userId: user.id,
      entryId: entry.id,
      ...analysis,
    },
  });

  revalidatePath('/journal');

  return NextResponse.json({ data: entry });
};
