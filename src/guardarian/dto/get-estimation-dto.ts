import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export enum FromCurrencyEnum {
  ETH = 'ETH',
  LTC = 'LTC',
  XRP = 'XRP',
}

export enum ToCurrencyEnum {
  EUR = 'EUR',
}

export class GetEstimationDto {
  @IsNotEmpty()
  @IsEnum(FromCurrencyEnum)
  from_currency: FromCurrencyEnum;

  @IsNotEmpty()
  @IsEnum(ToCurrencyEnum)
  to_currency: ToCurrencyEnum;

  @IsNotEmpty()
  @IsNumber()
  from_amount: number;
}
