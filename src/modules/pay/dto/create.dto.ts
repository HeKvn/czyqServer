export class CreateDTO {
  readonly userID: string;
  readonly payType: number;
  readonly payMoney: number;
  readonly payRemark?: string;
}