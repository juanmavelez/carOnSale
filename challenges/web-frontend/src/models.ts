export interface IResponseAuth {
  token: string;
  authenticared: boolean;
  userId: string;
  internalUserId: number;
  internalUserUUID: string;
  type: string;
  privileges: string;
}
