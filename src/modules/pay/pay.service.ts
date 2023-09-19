import { Repository } from 'typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pay } from './pay.entity'
import { ListDTO } from './dto/list.dto';
import { CreateDTO } from './dto/create.dto';
import { EditDTO } from './dto/edit.dto';
import { IDDTO } from './dto/id.dto';

@Injectable()
export class PayService {
  constructor (
    @InjectRepository(Pay)
    private readonly payRepository: Repository<Pay>
  ) {}

  private async getListMore (listDto: ListDTO) {
    const { page = 1, pageSize = 10, userID = '' } = listDto
    const getList = this.payRepository
      .createQueryBuilder('pay')
      .where('pay.userID = :userID', { userID })
      .andWhere({ isDelete: false })
      .orderBy('pay.createTime', 'DESC')
      .select([
        'pay.id',
        'pay.payMoney',
        'pay.payType',
        'pay.createTime'
      ])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany()

      const list = await getList
      return list
  }

  private async getListByDateRange (listDto: ListDTO) {
    const { userID = '', dateRange = [] } = listDto
    if (!dateRange.length) throw new BadRequestException('参数不正确')
    const [start, end] = dateRange
    const getList = this.payRepository
      .createQueryBuilder('pay')
      .where('pay.userID = :userID', { userID })
      .andWhere('pay.createTime BETWEEN :start AND :end', { start, end })
      .andWhere({ isDelete: false })
      .select([
        'pay.id',
        'pay.payMoney',
        'pay.payType'
      ])
      .getMany()
  
      const list = await getList
      return list
  }

  async getList (listDto: ListDTO) {
    if (!listDto.dateRange) return this.getListMore(listDto)
    return this.getListByDateRange(listDto)
  }

  async getDetail (idDto: IDDTO) {
    const { id, userID } = idDto
    const detail = this.payRepository
      .createQueryBuilder('pay')
      .where('pay.userID = :userID', { userID })
      .andWhere('pay.id = :id', { id })
      .andWhere({ isDelete: false })
      .select([
        'pay.payMoney',
        'pay.payType',
        'pay.payRemark',
        'pay.createTime',
        'pay.updateTime'
      ])
      .getOne()

      return detail
  }

  async createPay (createDto: CreateDTO) {
    const pay = new Pay()

    pay.payType = createDto.payType
    pay.payMoney = createDto.payMoneny
    pay.userID = createDto.userID
    pay.payRemark = createDto.payRemark || null

    const result = await this.payRepository.save(pay)

    return result
  }

  async editPay (editDto: EditDTO) {
    const { id, userID } = editDto
    let payToUpdate = await this.payRepository.findOne({ where: { id, userID } })

    payToUpdate.payMoney = editDto.payMoneny
    payToUpdate.payType = editDto.payType
    payToUpdate.payRemark = editDto.payRemark || null

    const result = await this.payRepository.save(payToUpdate)
    
    return result
  }

  async deletePay (idDto: IDDTO) {
    const { id, userID } = idDto
    let payToDelete = await this.payRepository.findOne({ where: { id, userID } })

    payToDelete.isDelete = true

    const result = await this.payRepository.save(payToDelete)

    return result
  }
}
