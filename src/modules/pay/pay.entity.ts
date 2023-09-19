import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn,
  CreateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Pay {
    // 主键id
    @PrimaryGeneratedColumn()
    id: number;
  
    // 创建时间
    @CreateDateColumn()
    createTime: Date
  
    // 更新时间
    @UpdateDateColumn()
    updateTime: Date
  
    // 软删除
    @Column({
      default: false
    })
    isDelete: boolean
  
    // 更新次数
    @VersionColumn()
    version: number
  
    // 支出类型
    @Column('int')
    payType: number;

    // 支出金额
    @Column('int')
    payMoney: number;

    // 支出备注
    @Column({ nullable: true, type: 'text' })
    payRemark: string;

    // 用户id
    @Column('text')
    userID: string;
}
