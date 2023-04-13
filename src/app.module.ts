import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanksModule } from './banks/banks.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { StatisticsModule } from './statistics/statistics.module';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRoot(dataSourceOptions
), BanksModule, CategoriesModule, TransactionsModule, StatisticsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  // constructor(private dataSource: DataSource){}
}

