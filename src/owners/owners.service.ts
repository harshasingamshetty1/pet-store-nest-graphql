import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from 'src/pets/pet.entity';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(@InjectRepository(Owner) private ownerRepo: Repository<Owner>) {}
  create(createOwnerInput: CreateOwnerInput) {
    const newOwner = this.ownerRepo.create(createOwnerInput);
    return this.ownerRepo.save(newOwner);
  }

  findAll() {
    return this.ownerRepo.find();
  }

  findOne(id: number) {
    return this.ownerRepo.findOneOrFail({ where: { id: id } });
  }

  async getPets(id: number): Promise<Pet[]> {
    const owners = await this.ownerRepo.find({
      where: { id },
      relations: ['pets'],
    });

    // Extract the 'pets' property from each owner
    const petsArray = owners.map((owner) => owner.pets).flat();
    console.log('pets array', petsArray);

    return petsArray;
  }

  // update(id: number, updateOwnerInput: UpdateOwnerInput) {
  //   return `This action updates a #${id} owner`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} owner`;
  // }
}
