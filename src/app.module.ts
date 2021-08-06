import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuardarianModule } from './guardarian/guardarian.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), GuardarianModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
