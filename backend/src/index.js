import dotenv from 'dotenv';

import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'http';

import routes from './routes';
import { setupWebsocket } from './websocket';

const app = express();
const PORT = 3333;
const server = Server(app);

dotenv.config();
setupWebsocket(server);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(json()) // for parsing application/json
app.use(routes);

server.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
