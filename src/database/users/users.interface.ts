export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
}

export interface ICreateUser {
  email: string;
  password: string;
  name: string;
}

export interface ICreateUserResponse {
  id: number;
}

export interface IFindUsersResponse {
  id: number;
  email: string;
  name: string;
}

export interface IUpdateUser {
  email?: string;
  password?: string;
  name?: string;
}
