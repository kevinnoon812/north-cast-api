import { Body, Controller, Post } from '@nestjs/common';

import { GetEstimationDto } from './dto/get-estimation-dto';
import { GuardarianService } from './guardarian.service';

@Controller('guardarian')
export class GuardarianController {
  constructor(private guardarianService: GuardarianService) {}

  @Post('/estimate')
  async getEstimation(@Body() getEstimationDto: GetEstimationDto) {
    const { data } = await this.guardarianService.getEstimation(
      getEstimationDto,
    );

    return { data };
  }
}
