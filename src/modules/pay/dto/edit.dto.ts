export class EditDTO {
  readonly id: number;
  readonly userID: string;
  readonly payType: number;
  readonly payMoneny: number;
  readonly payRemark?: string;
}