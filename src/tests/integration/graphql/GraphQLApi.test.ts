import request from 'supertest';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from '../../../graphql/schema';
import { resolvers } from '../../../graphql/resolvers';
import cors from 'cors';
import 'reflect-metadata';
import { prisma } from '../../../database/prisma';

let app: express.Express;

beforeAll(async () => {
  app = express();
  app.use(cors());
  app.use(express.json());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use('/graphql', expressMiddleware(server));
});

beforeEach(async () => {
  await prisma.pet.deleteMany();
  await prisma.owner.deleteMany();
});

describe('GraphQL API (Integration Tests)', () => {
  let createdOwnerId: string;

  it('should create a new owner successfully', async () => {
    const mutation = {
      query: `
        mutation {
          createOwner(input: { name: "John GraphQL", email: "john.graphql@example.com" }) {
            id
            name
            email
          }
        }
      `
    };

    const response = await request(app).post('/graphql').send(mutation);

    expect(response.status).toBe(200);
    expect(response.body.data.createOwner).toHaveProperty('id');
    expect(response.body.data.createOwner.name).toBe('John GraphQL');

    createdOwnerId = response.body.data.createOwner.id;
  });

  it('should fetch all owners', async () => {
    // Garante Owner antes de buscar
    await prisma.owner.create({
      data: {
        name: 'Owner Test',
        email: 'ownertest@example.com',
      },
    });

    const query = {
      query: `
        query {
          owners {
            id
            name
            email
          }
        }
      `
    };

    const response = await request(app).post('/graphql').send(query);

    expect(response.status).toBe(200);
    expect(response.body.data.owners.length).toBeGreaterThan(0);
  });

  it('should fail to create owner with missing fields', async () => {
    const brokenMutation = {
      query: `
        mutation {
          createOwner(input: { name: "", email: "" }) {
            id
          }
        }
      `
    };

    const response = await request(app).post('/graphql').send(brokenMutation);

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBe('Name and email are required');
  });

  it('should create a pet linked to an owner', async () => {
    // Cria Owner para o teste
    const ownerMutation = {
      query: `
        mutation {
          createOwner(input: { name: "Owner for Pet", email: "ownerpet@example.com" }) {
            id
          }
        }
      `
    };

    const ownerResponse = await request(app).post('/graphql').send(ownerMutation);
    const ownerId = ownerResponse.body.data.createOwner.id;

    const petMutation = {
      query: `
        mutation {
          createPet(input: { name: "Buddy", type: "Dog", ownerId: "${ownerId}" }) {
            id
            name
            type
            ownerId
          }
        }
      `
    };

    const response = await request(app).post('/graphql').send(petMutation);

    expect(response.status).toBe(200);
    expect(response.body.data.createPet).toHaveProperty('id');
    expect(response.body.data.createPet.name).toBe('Buddy');
  });

  it('should fail to create pet with missing fields', async () => {
    const brokenPetMutation = {
      query: `
        mutation {
          createPet(input: { name: "", type: "", ownerId: "" }) {
            id
          }
        }
      `
    };

    const response = await request(app).post('/graphql').send(brokenPetMutation);

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBe('Name, type, and ownerId are required');
  });

  it('should fetch all pets', async () => {
    const owner = await prisma.owner.create({
      data: {
        name: 'OwnerPets',
        email: 'pets@example.com',
      }
    });

    await prisma.pet.create({
      data: {
        name: 'Rex',
        type: 'Dog',
        ownerId: owner.id,
      }
    });

    const query = {
      query: `
        query {
          pets {
            id
            name
            type
            ownerId
          }
        }
      `
    };

    const response = await request(app).post('/graphql').send(query);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data.pets)).toBe(true);
    expect(response.body.data.pets.length).toBeGreaterThan(0);
  });

  it('should fetch pets by ownerId', async () => {
    const owner = await prisma.owner.create({
      data: {
        name: 'OwnerForPetsQuery',
        email: 'query@example.com',
      }
    });

    await prisma.pet.create({
      data: {
        name: 'Bella',
        type: 'Cat',
        ownerId: owner.id,
      }
    });

    const query = {
      query: `
        query {
          ownerPets(ownerId: "${owner.id}") {
            id
            name
            type
          }
        }
      `
    };

    const response = await request(app).post('/graphql').send(query);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data.ownerPets)).toBe(true);
    expect(response.body.data.ownerPets.length).toBeGreaterThan(0);
  });

  it('should return empty array if owner has no pets', async () => {
    const owner = await prisma.owner.create({
      data: {
        name: 'OwnerNoPets',
        email: 'nopets@example.com',
      }
    });

    const query = {
      query: `
        query {
          ownerPets(ownerId: "${owner.id}") {
            id
            name
            type
          }
        }
      `
    };

    const response = await request(app).post('/graphql').send(query);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data.ownerPets)).toBe(true);
    expect(response.body.data.ownerPets).toEqual([]);
  });
});
