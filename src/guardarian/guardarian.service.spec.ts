import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { GuardarianController } from './guardarian.controller';
import { GuardarianService } from './guardarian.service';
import { FromCurrencyEnum, ToCurrencyEnum } from './dto/get-estimation-dto';

describe('GuardarianService', () => {
  let service: GuardarianService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [GuardarianController],
      providers: [GuardarianService, ConfigService],
    }).compile();

    service = module.get<GuardarianService>(GuardarianService);
  });

  it('getEstimation should return correct estimation value', () => {
    expect(service).toBeDefined();
    const from_currency = FromCurrencyEnum.ETH;
    const to_currency = ToCurrencyEnum.EUR;
    const from_amount = 1;

    const mockResult = 2272.28292003;

    jest.spyOn(service, 'getEstimation').mockResolvedValue({
      data: mockResult,
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
      },
      config: {},
    });

    service
      .getEstimation({
        from_currency,
        to_currency,
        from_amount,
      })
      .then(({ data }) => {
        expect(data).toBe(mockResult);
      });
  });
});
