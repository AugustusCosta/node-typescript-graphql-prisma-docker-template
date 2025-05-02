// src/entity/Pet.ts

export class Pet {
    constructor(
      public id: string,
      public name: string,
      public type: string,
      public ownerId: string
    ) {}
  }
  