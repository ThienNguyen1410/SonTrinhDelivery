export interface IAccount {
  username: string;
  userId: string;
  birth: string;
  phone: string;
}

export type AccountContextType = {
  account: IAccount;
  updatePhoneNumber: (phone: string) => void;
  updateUsername: (name: string) => void;
  updateBirth: (birth: string) => void;
};
