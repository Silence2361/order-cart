import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { ICreateUser, IUpdateUser, IUser } from './users.interface';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async createUser(data: ICreateUser): Promise<IUser> {
    return this.userModel.create(data);
  }

  async findUsers(): Promise<IUser[]> {
    return this.userModel.findAll();
  }

  async findUserById(userId: number): Promise<IUser | null> {
    return this.userModel.findByPk(userId);
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async findUserByName(name: string): Promise<IUser | null> {
    return this.userModel.findOne({ where: { name } });
  }

  async updateUserById(userId: number, data: IUpdateUser): Promise<void> {
    await this.userModel.update(data, { where: { id: userId } });
  }

  async deleteUserById(userId: number): Promise<void> {
    await this.userModel.destroy({ where: { id: userId } });
  }
}
