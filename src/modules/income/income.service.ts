import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from './income.entity'
import { ListDTO } from './dto/list.dto';
import { CreateDTO } from './dto/create.dto';
import { EditDTO } from './dto/edit.dto';
import { IDDTO } from './dto/id.dto';

@Injectable()
export class IncomeService {
  constructor (
    @InjectRepository(Income)
    private readonly incomeRepository: Repository<Income>
  ) {}

  private async getListMore (listDto: ListDTO) {}

  private async getListByDateRange (listDto: ListDTO) {}

  async getList (listDto: ListDTO) {
    if (!listDto.dateRange) return this.getListMore(listDto)
    return this.getListByDateRange(listDto)
  }

  async createPay (createDto: CreateDTO) {}

  async editPay (editDto: EditDTO) {}

  async deletePay (idDto: IDDTO) {}
}
