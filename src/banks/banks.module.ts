import { Logger, Module } from '@nestjs/common';
import { BanksService } from './banks.service';
import { BanksController } from './banks.controller';
import { Bank } from './entities/bank.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from './entities/guest.entity';

@Module({
  controllers: [BanksController],
  providers: [BanksService],
  imports: [
    TypeOrmModule.forFeature([Bank, Guest]),],
  exports:[BanksService]
})
export class BanksModule {}
