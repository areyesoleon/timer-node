import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });
import { Server } from './services/server.service';
const server = new Server();

server.listen();