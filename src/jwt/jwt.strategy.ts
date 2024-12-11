import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from '../database/users/users.repository';
import { IValidatedUser, JwtPayload } from './payload/jwt.payload';
import { IUser } from '../database/users/users.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<IValidatedUser> {
    const user: IUser = await this.usersRepository.findUserById(
      payload.user_id,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return { id: user.id };
  }
}
