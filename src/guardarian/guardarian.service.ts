import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { classToPlain } from 'class-transformer';

import { GetEstimationDto } from './dto/get-estimation-dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GuardarianService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  /**
   * Get estimate exchange rate
   * @param getEstimationDto
   */
  async getEstimation(getEstimationDto: GetEstimationDto) {
    const baseURL = this.configService.get('GUARDARIAN_API_BASE_URL');
    const apiKey = this.configService.get('GUARDARIAN_API_KEY');

    if (!apiKey) {
      Logger.error('Missing Api Key for Guardarian!');
      throw new InternalServerErrorException(
        'Oops! Something went wrong from our side, please try again later',
      );
    }

    try {
      return await lastValueFrom(
        this.httpService.get('estimate', {
          baseURL,
          headers: {
            'x-api-key': apiKey,
          },
          params: classToPlain(getEstimationDto),
        }),
      );
    } catch (error) {
      if (error.isAxiosError) {
        throw new HttpException(
          error.response.statusText,
          error.response.status,
        );
      }

      throw new HttpException(error.message, error.statusCode);
    }
  }
}
