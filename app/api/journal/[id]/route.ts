import { analyze } from '@/utils/ai';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { NextResponse } from 'next/server';

export const PATCH = async (request, { params }) => {
  const { content } = await request.json();
  const user = await getUserByClerkID();
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  });

  // used upsert instead of update to create analysis on pre-existing data, but in production, we'd have db defaults and use update instead.
  const analysis = await analyze(updatedEntry.content);
  await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    data: {
      entryId: updatedEntry.id,
      ...analysis,
    },
    update: analysis,
  });

  return NextResponse.json({ data: updatedEntry });
};
