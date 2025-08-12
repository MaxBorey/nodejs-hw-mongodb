import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
 const app = express();

  if (process.env.NODE_ENV === 'development') {
  app.set('json spaces', 2);
  }
  
  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
    );
    
  app.use(contactsRouter);
  
  app.use(notFoundHandler);
  app.use(errorHandler);
  

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};