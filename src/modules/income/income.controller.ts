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

  @Post('getDetail')
  getDetail (@Body() idDto: IDDTO) {
    return this.incomeService.getDetail(idDto)
  }
  
  @Post('create')
  createIncome (@Body() createDto: CreateDTO) {
    return this.incomeService.createIncome(createDto)
  }

  @Post('edit')
  editIncome (@Body() editDto: EditDTO) {
    return this.incomeService.editIncome(editDto)
  }

  @Delete(':id')
  deleteIncome (@Param() idDto: IDDTO) {
    return this.incomeService.deleteIncome(idDto)
  }
}
