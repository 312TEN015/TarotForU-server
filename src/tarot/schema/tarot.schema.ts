import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TarotDocument = Tarot & Document;

@Schema({ _id: false })
class CardResult {
  @Prop()
  keyword: [string];

  @Prop()
  description: string;
}

@Schema({ _id: false })
class OverallResult {
  @Prop()
  summary: string;

  @Prop()
  full: string;
}

@Schema()
export class Tarot {
  @Prop()
  tarotId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  tarotType: number;

  @Prop()
  cards: number[];

  @Prop()
  cardResults: CardResult[];

  @Prop()
  overallResult: OverallResult;
}

export const TarotSchema = SchemaFactory.createForClass(Tarot);
