import { InputType, Int, Field } from '@nestjs/graphql';
import { type } from 'os';

@InputType()
export class CreateOwnerInput {
  @Field()
  name: string;
}
