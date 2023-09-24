export class EditDTO {
  readonly id: number;
  readonly userID: string;
  readonly payType: number;
  readonly payMoney: number;
  readonly payRemark?: string;
}