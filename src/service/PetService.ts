import { prisma } from '../database/prisma';

export class PetService {
  async create(name: string, type: string, ownerId: string) {
    return prisma.pet.create({
      data: {
        name,
        type,
        ownerId,
      },
    });
  }

  async findAll() {
    return prisma.pet.findMany();
  }

  async findByOwner(ownerId: string) {
    return prisma.pet.findMany({
      where: { ownerId },
    });
  }
}
