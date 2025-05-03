import request from 'supertest';
import express from 'express';
import { PetController } from '../../../controller/PetController';
import { OwnerService } from '../../../service/OwnerService';
import { prisma } from '../../../database/prisma';

const app = express();
app.use(express.json());
app.post('/api/pets', PetController.createPet);
app.get('/api/pets', PetController.getPets);
app.get('/api/pets/owner/:ownerId', PetController.getPetsByOwner);

describe('PetController (REST)', () => {
  let ownerId: string;

  beforeEach(async () => {
    await prisma.pet.deleteMany();
    await prisma.owner.deleteMany();

    // Criar Owner antes dos testes
    const ownerService = new OwnerService();
    const owner = await ownerService.create('Pet Owner', 'owner@example.com');
    ownerId = owner.id;
  });

  afterAll(async () => {
    await prisma.pet.deleteMany();
    await prisma.owner.deleteMany();
  });

  it('should create a new pet', async () => {
    const response = await request(app)
      .post('/api/pets')
      .send({ name: 'Rex', type: 'Dog', ownerId });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Rex');
  });

  it('should return 400 if fields are missing', async () => {
    const response = await request(app)
      .post('/api/pets')
      .send({ name: 'Whiskers' }); // missing type and ownerId

    expect(response.status).toBe(400);
  });

  it('should list all pets', async () => {
    await request(app)
      .post('/api/pets')
      .send({ name: 'Fluffy', type: 'Cat', ownerId });

    const response = await request(app).get('/api/pets');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should find pets by ownerId', async () => {
    await request(app)
      .post('/api/pets')
      .send({ name: 'Bolt', type: 'Dog', ownerId });

    const response = await request(app).get(`/api/pets/owner/${ownerId}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
