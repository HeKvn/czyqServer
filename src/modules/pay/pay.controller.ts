import { Body, Controller, Delete, Post, Param } from '@nestjs/common';
import { PayService } from './pay.service'
import { ListDTO } from './dto/list.dto';
import { CreateDTO } from './dto/create.dto';
import { EditDTO } from './dto/edit.dto';
import { IDDTO } from './dto/id.dto';

@Controller('pay')
export class PayController {
  constructor (
    private payService: PayService
  ) {}

  @Post('getList')
  getList (@Body() listDto: ListDTO) {
    return this.payService.getList(listDto)
  }

  @Post('getDetail')
  getDetail (@Body() idDto: IDDTO) {
    return this.payService.getDetail(idDto)
  }
  
  @Post('create')
  createPay (@Body() createDto: CreateDTO) {
    return this.payService.createPay(createDto)
  }

  @Post('edit')
  editPay (@Body() editDto: EditDTO) {
    return this.payService.editPay(editDto)
  }

  @Delete(':id')
  deletePay (@Param() idDto: IDDTO) {
    return this.payService.deletePay(idDto)
  }
}
