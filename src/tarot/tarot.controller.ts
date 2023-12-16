import { Body, Controller, Post } from '@nestjs/common';
import { TarotInputDto, TarotOutputDto } from './dto/tarot.dto';
import { TarotService } from './tarot.service';

@Controller('tarot')
export class TarotController {
  constructor(private readonly tarotService: TarotService) {}

  @Post('/study')
  studyTarotResult(@Body() tarot: TarotInputDto): Promise<TarotOutputDto> {
    return this.tarotService.studyTarotResult(tarot);
  }

  @Post('/dream')
  dreamTarotResult(@Body() tarot: TarotInputDto): Promise<TarotOutputDto> {
    return this.tarotService.dreamTarotResult(tarot);
  }

  @Post('/job')
  jobTarotResult(@Body() tarot: TarotInputDto): Promise<TarotOutputDto> {
    return this.tarotService.jobTarotResult(tarot);
  }

  @Post('/love')
  loveTarotResult(@Body() tarot: TarotInputDto): Promise<TarotOutputDto> {
    return this.tarotService.loveTarotResult(tarot);
  }

  @Post('/today')
  todayTarotResult(@Body() tarot: TarotInputDto): Promise<TarotOutputDto> {
    return this.tarotService.todayTarotResult(tarot);
  }
}
