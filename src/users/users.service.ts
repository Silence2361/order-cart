import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ICreateUser,
  ICreateUserResponse,
  IFindUsersResponse,
  IUpdateUser,
  IUser,
} from 'src/database/users/users.interface';
import { UsersRepository } from 'src/database/users/users.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(data: ICreateUser): Promise<ICreateUserResponse> {
    const { email, password, name } = data;

    const existingEmail = await this.usersRepository.findUserByEmail(email);
    if (existingEmail) {
      throw new ConflictException('User already registered');
    }

    const existingUser = await this.usersRepository.findUserByName(name);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = await this.usersRepository.createUser({
      email,
      password: hashedPassword,
      name,
    });

    return {
      id: user.id,
    };
  }

  async findUsers(): Promise<IFindUsersResponse[]> {
    const users = await this.usersRepository.findUsers();

    return users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
    }));
  }

  async findUserById(userId: number): Promise<IFindUsersResponse> {
    const user = await this.usersRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async updateUserById(userId: number, data: IUpdateUser): Promise<void> {
    const { email, password, name } = data;

    const user: IUser | null = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    let hashedPassword: string | undefined;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUserData = {
      email,
      password: hashedPassword || password,
      name,
    };

    await this.usersRepository.updateUserById(userId, updatedUserData);
  }

  async deleteUserById(userId: number): Promise<void> {
    const user = await this.usersRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    await this.usersRepository.deleteUserById(userId);
  }
}
