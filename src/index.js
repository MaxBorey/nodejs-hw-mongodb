import { initMongoDB } from './db/initMongoDB.js';
import { setupServer } from './server.js';


await initMongoDB();
setupServer();