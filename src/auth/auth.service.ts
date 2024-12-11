import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ILogin,
  ILoginResponse,
  IRegistration,
  IRegistrationResponse,
} from '../database/auth/auth.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../database/users/users.repository';
import * as bcrypt from 'bcrypt';
import { IUser } from '../database/users/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async registration(
    credentials: IRegistration,
  ): Promise<IRegistrationResponse> {
    const { email, password, name } = credentials;

    const candidate = await this.usersRepository.findUserByEmail(email);

    if (candidate) {
      throw new ConflictException(`This email ${email} already registered`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = await this.usersRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async login(credentials: ILogin): Promise<ILoginResponse> {
    const { email, password } = credentials;

    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not fount');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong Password');
    }

    const payload = { user_id: user.id };

    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
