import request from 'supertest';
import express from 'express';
import { OwnerController } from '../../../controller/OwnerController';
import { prisma } from '../../../database/prisma';

const app = express();
app.use(express.json());
app.post('/api/owners', OwnerController.createOwner);
app.get('/api/owners', OwnerController.getOwners);
app.get('/api/owners/:id', OwnerController.getOwnerById);

describe('OwnerController (REST)', () => {
  beforeEach(async () => {
    await prisma.pet.deleteMany();
    await prisma.owner.deleteMany();
  });

  it('should create a new owner', async () => {
    const response = await request(app)
      .post('/api/owners')
      .send({ name: 'John Doe', email: 'john@example.com' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should return 400 if name or email is missing', async () => {
    const response = await request(app)
      .post('/api/owners')
      .send({ email: 'missingname@example.com' });

    expect(response.status).toBe(400);
  });

  it('should list all owners', async () => {
    await request(app)
      .post('/api/owners')
      .send({ name: 'Owner1', email: 'owner1@example.com' });

    const response = await request(app).get('/api/owners');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return 404 if owner not found', async () => {
    const response = await request(app).get('/api/owners/nonexistent-id');

    expect(response.status).toBe(404);
  });
});
