export class EditDTO {
  readonly id: number;
  readonly userID: string;
  readonly incomeType: number;
  readonly incomeMoney: number;
  readonly incomeRemark?: string;
}