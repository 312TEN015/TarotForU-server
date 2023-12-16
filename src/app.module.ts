import { Module } from '@nestjs/common';
import { TarotController } from './tarot/tarot.controller';
import { TarotService } from './tarot/tarot.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [TarotController],
  providers: [TarotService],
})
export class AppModule {}
