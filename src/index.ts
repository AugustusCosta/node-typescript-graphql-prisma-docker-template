import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { OwnerController } from './controller/OwnerController';
import { PetController } from './controller/PetController';
import 'reflect-metadata';

async function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // GraphQL setup
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  app.use('/graphql', expressMiddleware(server));

  // REST API setup
  app.post('/api/owners', OwnerController.createOwner);
  app.get('/api/owners', OwnerController.getOwners);
  app.get('/api/owners/:id', OwnerController.getOwnerById);

  app.post('/api/pets', PetController.createPet);
  app.get('/api/pets', PetController.getPets);
  app.get('/api/pets/owner/:ownerId', PetController.getPetsByOwner);

  // Start Server
  app.listen({ port: 4000 }, () =>
    console.log('🚀 Server ready at http://localhost:4000/graphql and /api')
  );
}

startServer();
