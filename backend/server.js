// server.js
import jsonServer from 'json-server';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const server = jsonServer.create();
const router = jsonServer.router(require.resolve('./db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});