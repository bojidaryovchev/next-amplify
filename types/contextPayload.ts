import { IncomingMessage, ServerResponse } from 'http';

export type ContextPayload = {
  req: IncomingMessage;
  res: ServerResponse;
};
