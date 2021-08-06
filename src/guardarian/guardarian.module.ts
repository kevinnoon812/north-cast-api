import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { GuardarianService } from './guardarian.service';
import { GuardarianController } from './guardarian.controller';

@Module({
  imports: [HttpModule],
  providers: [GuardarianService],
  controllers: [GuardarianController],
})
export class GuardarianModule {}
