import { PetService } from '../../service/PetService';
import { OwnerService } from '../../service/OwnerService';
import { prisma } from '../../database/prisma';

describe('PetService', () => {
  const petService = new PetService();
  const ownerService = new OwnerService();
  let ownerId: string;

  beforeEach(async () => {
    // Limpa Owners e Pets antes de cada teste
    await prisma.pet.deleteMany();
    await prisma.owner.deleteMany();

    const owner = await ownerService.create('Pet Owner', 'petowner@example.com');
    ownerId = owner.id;
  });

  afterAll(async () => {
    await prisma.pet.deleteMany();
    await prisma.owner.deleteMany();
  });

  it('should create a new pet', async () => {
    const pet = await petService.create('Buddy', 'Dog', ownerId);

    expect(pet).toHaveProperty('id');
    expect(pet.name).toBe('Buddy');
  });

  it('should find all pets', async () => {
    await petService.create('Max', 'Dog', ownerId);
    await petService.create('Milo', 'Cat', ownerId);

    const pets = await petService.findAll();

    expect(pets.length).toBeGreaterThanOrEqual(2);
  });

  it('should find pets by ownerId', async () => {
    await petService.create('Lucky', 'Dog', ownerId);

    const pets = await petService.findByOwner(ownerId);

    expect(pets.length).toBeGreaterThanOrEqual(1);
    expect(pets[0].ownerId).toBe(ownerId);
  });

  it('should return empty array if owner has no pets', async () => {
    const newOwner = await ownerService.create('Owner No Pets', 'nopets@example.com');

    const pets = await petService.findByOwner(newOwner.id);

    expect(pets).toEqual([]);
  });
});
