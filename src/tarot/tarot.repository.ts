import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TarotOutputDto } from './dto/tarot.dto';
import { Tarot } from './schema/tarot.schema';

@Injectable()
export class TarotRepository {
  constructor(
    @InjectModel(Tarot.name) private readonly tarotModel: Model<Tarot>,
  ) {}

  async create(tarotOutputDto: TarotOutputDto): Promise<Tarot> {
    return await this.tarotModel.create(tarotOutputDto);
  }

  async find(id: string): Promise<Tarot> {
    return await this.tarotModel.findOne({ tarotId: id });
  }
}
