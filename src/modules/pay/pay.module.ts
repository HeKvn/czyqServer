import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayService } from './pay.service';
import { PayController } from './pay.controller';
import { Pay } from './pay.entity'

@Module({
  imports:[
    TypeOrmModule.forFeature([Pay])
  ],
  providers: [PayService],
  controllers: [PayController]
})
export class PayModule {}
