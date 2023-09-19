import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn,
  CreateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Income {
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

    // 收入类型
    @Column('int')
    incomeType: number;

    // 收入金额
    @Column('int')
    incomeMoney: number;

    // 收入备注
    @Column('text')
    incomeRemark: string;

    // 用户id
    @Column('text')
    userID: string;
}
