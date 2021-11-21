import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import prisma from '../lib/prisma';
import { ContextPayload } from '../types/contextPayload';

export type Context = {
  prisma: PrismaClient;
  authGuard: () => Promise<boolean>;
};

export async function createContext({ req }: ContextPayload): Promise<Context> {
  return {
    prisma,
    authGuard: async () => Boolean(await getSession({ req })),
  };
}
