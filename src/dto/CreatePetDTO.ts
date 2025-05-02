// src/dto/CreatePetDTO.ts
import { IsString } from 'class-validator';

export class CreatePetDTO {
  @IsString()
  name!: string;

  @IsString()
  type!: string;

  @IsString()
  ownerId!: string;
}
