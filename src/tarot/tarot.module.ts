import { Module } from '@nestjs/common';
import { TarotController } from './tarot.controller';
import { TarotService } from './tarot.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tarot, TarotSchema } from './schema/tarot.schema';
import { TarotRepository } from './tarot.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tarot.name, schema: TarotSchema }]),
  ],
  controllers: [TarotController],
  providers: [TarotService, TarotRepository],
})
export class TarotModule {}
