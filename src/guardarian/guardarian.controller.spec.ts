import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { GuardarianController } from './guardarian.controller';
import { GuardarianService } from './guardarian.service';
import { FromCurrencyEnum, ToCurrencyEnum } from './dto/get-estimation-dto';
import { HttpException } from '@nestjs/common';

describe('GuardarianController', () => {
  let controller: GuardarianController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [GuardarianController],
      providers: [GuardarianService, ConfigService],
    }).compile();

    controller = module.get<GuardarianController>(GuardarianController);
  });

  it('POST /estimate should return correct estimation value', async () => {
    const from_currency = FromCurrencyEnum.ETH;
    const to_currency = ToCurrencyEnum.EUR;
    const from_amount = 1;

    const mockResult = 2272.28292003;
    jest.spyOn(controller, 'getEstimation').mockReturnValue(
      new Promise(() => ({
        data: mockResult,
      })),
    );

    controller
      .getEstimation({
        from_currency,
        to_currency,
        from_amount,
      })
      .then(({ data }) => {
        expect(data).toBe(mockResult);
      });
  });

  it('POST /estimate should throw error when Guardarian API call is failed', async () => {
    const from_currency = FromCurrencyEnum.ETH;
    const to_currency = ToCurrencyEnum.EUR;
    const from_amount = 1;

    jest
      .spyOn(controller, 'getEstimation')
      .mockRejectedValue(new HttpException('Internal Server Error', 500));

    controller
      .getEstimation({
        from_currency,
        to_currency,
        from_amount,
      })
      .catch(({ message }) => {
        expect(message).toBe('Internal Server Error');
      });
  });
});
