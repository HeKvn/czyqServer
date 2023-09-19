import { Body, Controller, Delete, Post, Param } from '@nestjs/common';
import { IncomeService } from './income.service'
import { ListDTO } from './dto/list.dto';
import { CreateDTO } from './dto/create.dto';
import { EditDTO } from './dto/edit.dto';
import { IDDTO } from './dto/id.dto';

@Controller('income')
export class IncomeController {
  constructor (
    private incomeService: IncomeService
  ) {}

  @Post('getList')
  getList (@Body() listDto: ListDTO) {
    return this.incomeService.getList(listDto)
  }
  
  @Post('create')
  createPay (@Body() createDto: CreateDTO) {
    return this.incomeService.createPay(createDto)
  }

  @Post('edit')
  editPay (@Body() editDto: EditDTO) {
    return this.incomeService.editPay(editDto)
  }

  @Delete(':id')
  deletePay (@Param() idDto: IDDTO) {
    return this.incomeService.deletePay(idDto)
  }
}
