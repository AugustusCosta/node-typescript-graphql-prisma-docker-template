import { prisma } from '../database/prisma';

export class OwnerService {
  async create(name: string, email: string) {
    return prisma.owner.create({
      data: {
        name,
        email,
      },
    });
  }

  async findAll() {
    return prisma.owner.findMany();
  }

  async findById(id: string) {
    return prisma.owner.findUnique({
      where: { id },
    });
  }

  async findByPet(petId: string) {
    return prisma.owner.findFirst({
      where: {
        pets: {
          some: {
            id: petId,
          },
        },
      },
    });
  }
}
