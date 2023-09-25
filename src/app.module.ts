import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PayModule } from './modules/pay/pay.module';
import { IncomeModule } from './modules/income/income.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'jizhang',
      password: 'jizhang11',
      database: 'bill',
      autoLoadEntities: true,
      synchronize: true
    }),
    PayModule,
    IncomeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
