// src/graphql/schema.ts
import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Owner {
    id: ID!
    name: String!
    email: String!
    pets: [Pet]
  }

  type Pet {
    id: ID!
    name: String!
    type: String!
    ownerId: ID!
  }

  input CreateOwnerInput {
    name: String!
    email: String!
  }

  input CreatePetInput {
    name: String!
    type: String!
    ownerId: ID!
  }

  type Query {
    owners: [Owner]
    pets: [Pet]
    ownerPets(ownerId: ID!): [Pet]
    petOwner(petId: ID!): Owner
  }

  type Mutation {
    createOwner(input: CreateOwnerInput!): Owner
    createPet(input: CreatePetInput!): Pet
  }
`;
