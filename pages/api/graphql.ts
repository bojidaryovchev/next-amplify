// the GraphQL implementation follows this tutorial: https://www.prisma.io/blog/fullstack-nextjs-graphql-prisma-2-fwpc6ds155

import { ApolloServer } from 'apollo-server-micro';
import { RequestHandler } from 'micro';
import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { createContext } from '../../graphql/context';
import { schema } from '../../graphql/schema';

// actually the req and res objects are of types NextApiRequest and NextApiResponse
// however, since micro-cors doesn't know that by default, we need to state it explicitly
const cors = Cors() as (handler: (req: NextApiRequest, res: NextApiResponse) => void) => RequestHandler;

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
  // make sure Apollo Studio is only available in development environment
  introspection: process.env.NODE_ENV === 'development',
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});

export const config = {
  api: {
    // disable bodyParser in order to handle GraphQL
    bodyParser: false,
  },
};
