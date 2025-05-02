import { Request, Response } from 'express';
import { PetService } from '../service/PetService';

const petService = new PetService();

export class PetController {
  static async createPet(req: Request, res: Response) {
    const { name, type, ownerId } = req.body;

    if (!name || !type || !ownerId) {
      return res.status(400).json({ error: 'Name, type, and ownerId are required' });
    }

    try {
      const pet = await petService.create(name, type, ownerId);
      return res.status(201).json(pet);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getPets(req: Request, res: Response) {
    try {
      const pets = await petService.findAll();
      return res.status(200).json(pets);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getPetsByOwner(req: Request, res: Response) {
    const { ownerId } = req.params;

    try {
      const pets = await petService.findByOwner(ownerId);
      return res.status(200).json(pets);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
