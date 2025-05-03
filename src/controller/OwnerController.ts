import { Request, Response } from 'express';
import { OwnerService } from '../service/OwnerService';

const ownerService = new OwnerService();

export class OwnerController {
  static async createOwner(req: Request, res: Response) {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    try {
      const owner = await ownerService.create(name, email);
      return res.status(201).json(owner);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getOwners(req: Request, res: Response) {
    try {
      const owners = await ownerService.findAll();
      return res.status(200).json(owners);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getOwnerById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const owner = await ownerService.findById(id);

      if (!owner) {
        return res.status(404).json({ error: 'Owner not found' });
      }

      return res.status(200).json(owner);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getOwnerByPet(req: Request, res: Response) {
      const { petId } = req.params;
  
      try {
        const owner = await ownerService.findByPet(petId);

        if (!owner) {
          return res.status(404).json({ error: 'Owner not found' });
        }

        return res.status(200).json(owner);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
}
