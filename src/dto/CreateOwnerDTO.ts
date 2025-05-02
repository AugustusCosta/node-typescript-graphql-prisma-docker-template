// src/dto/CreateOwnerDTO.ts
import { IsString, IsEmail } from 'class-validator';

export class CreateOwnerDTO {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;
}
