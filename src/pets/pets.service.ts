import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepo: Repository<Pet>) {}

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepo.create(createPetInput);
    return this.petsRepo.save(newPet);
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepo.find();
  }

  async findOne(id: number): Promise<Pet> {
    return this.petsRepo.findOneOrFail({ where: { id: id } });
  }
}
