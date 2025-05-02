import { GraphQLError } from 'graphql';
import { OwnerService } from '../service/OwnerService';
import { PetService } from '../service/PetService';

const ownerService = new OwnerService();
const petService = new PetService();

export const resolvers = {
  Query: {
    owners: async () => {
      return await ownerService.findAll();
    },
    pets: async () => {
      return await petService.findAll();
    },
    ownerPets: async (_: any, args: { ownerId: string }) => {
      return await petService.findByOwner(args.ownerId);
    },
  },
  Mutation: {
    createOwner: async (_: any, args: { input: { name: string; email: string } }) => {
      const { name, email } = args.input;
      if (!name || !email) {
        throw new GraphQLError('Name and email are required');
      }
      return await ownerService.create(name, email);
    },
    createPet: async (_: any, args: { input: { name: string; type: string; ownerId: string } }) => {
      const { name, type, ownerId } = args.input;
      if (!name || !type || !ownerId) {
        throw new GraphQLError('Name, type, and ownerId are required');
      }
      return await petService.create(name, type, ownerId);
    },
  },
};
