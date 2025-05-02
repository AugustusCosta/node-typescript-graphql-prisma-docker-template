import { OwnerService } from '../../service/OwnerService';
import { prisma } from '../../database/prisma';

describe('OwnerService', () => {
  const service = new OwnerService();

  beforeEach(async () => {
    // Limpa Owners antes de cada teste
    await prisma.pet.deleteMany();
    await prisma.owner.deleteMany();
  });

  it('should create a new owner', async () => {
    const owner = await service.create('Test Owner', 'test@example.com');

    expect(owner).toHaveProperty('id');
    expect(owner.name).toBe('Test Owner');
  });

  it('should find all owners', async () => {
    await service.create('Owner1', 'owner1@example.com');
    await service.create('Owner2', 'owner2@example.com');

    const owners = await service.findAll();

    expect(owners.length).toBeGreaterThanOrEqual(2);
  });

  it('should find owner by id', async () => {
    const created = await service.create('Find Owner', 'findme@example.com');

    const found = await service.findById(created.id);

    expect(found).not.toBeNull();
    expect(found?.email).toBe('findme@example.com');
  });

  it('should return null if owner not found', async () => {
    const found = await service.findById('non-existent-id');
    expect(found).toBeNull();
  });
});
