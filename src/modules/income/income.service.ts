import { Repository } from 'typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
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

  private async getListMore (listDto: ListDTO) {
    const { page = 1, pageSize = 10, userID = '' } = listDto
    const getList = this.incomeRepository
      .createQueryBuilder('income')
      .where('income.userID = :userID', { userID })
      .andWhere({ isDelete: false })
      .orderBy('income.createTime', 'DESC')
      .select([
        'income.id',
        'income.incomeMoney',
        'income.incomeType',
        'income.createTime'
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
    const getList = this.incomeRepository
      .createQueryBuilder('income')
      .where('income.userID = :userID', { userID })
      .andWhere('income.createTime BETWEEN :start AND :end', { start, end })
      .andWhere({ isDelete: false })
      .select([
        'income.id',
        'income.incomeMoney',
        'income.incomeType'
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
    const detail = this.incomeRepository
      .createQueryBuilder('income')
      .where('income.userID = :userID', { userID })
      .andWhere('income.id = :id', { id })
      .andWhere({ isDelete: false })
      .select([
        'income.incomeMoney',
        'income.incomeType',
        'income.incomeRemark',
        'income.createTime',
        'income.updateTime'
      ])
      .getOne()

      return detail
  }

  async createIncome (createDto: CreateDTO) {
    const income = new Income()

    income.incomeType = createDto.incomeType
    income.incomeMoney = createDto.incomeMoney
    income.userID = createDto.userID
    income.incomeRemark = createDto.incomeRemark || null

    const result = await this.incomeRepository.save(income)

    return result
  }

  async editIncome (editDto: EditDTO) {
    const { id, userID } = editDto
    let incomeToUpdate = await this.incomeRepository.findOne({ where: { id, userID } })

    incomeToUpdate.incomeMoney = editDto.incomeMoney
    incomeToUpdate.incomeType = editDto.incomeType
    incomeToUpdate.incomeRemark = editDto.incomeRemark || null

    const result = await this.incomeRepository.save(incomeToUpdate)
    
    return result
  }

  async deleteIncome (idDto: IDDTO) {
    const { id, userID } = idDto
    let incomeToDelete = await this.incomeRepository.findOne({ where: { id, userID } })

    incomeToDelete.isDelete = true

    const result = await this.incomeRepository.save(incomeToDelete)

    return result
  }
}
