import type { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';

const ideaSchema = z.object({
  title: z.string().min(2).max(280),
});

export async function createIdea(req: Request, res: Response) {
  try {
    const validated = ideaSchema.parse(req.body);
    const idea = await prisma.idea.create({ data: validated });
    res.status(201).json(idea);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
}

export async function listIdeas(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const skip = (page - 1) * pageSize;

  const [ideas, total] = await Promise.all([
    prisma.idea.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
    }),
    prisma.idea.count(),
  ]);

  res.status(200).json({
    ideas,
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  });
}

export async function upVoteIdea(req: Request, res: Response) {
  const { id } = req.params;

  if(!id) {
    return res.status(400).json({ error: 'ID is required' });
  }
  if(isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID must be a number' });
  }

  const idea = await prisma.idea.findUnique({ where: { id: Number(id) } });

  if(!idea) {
    return res.status(404).json({ error: 'Idea not found' });
  }

  try {
    const idea = await prisma.idea.update({
      where: { id: Number(id) },
      data: { upvotes: { increment: 1 } },
    });
    res.status(200).json({ message: "upvoted successfully", id: idea.id, upvotes: idea.upvotes });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
