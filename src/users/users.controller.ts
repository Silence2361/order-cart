import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserDtoResponse } from './dto/create-user-response.dto';
import { FindListOfUsersDto } from './dto/find-list-of-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body() data: CreateUserDto,
  ): Promise<CreateUserDtoResponse> {
    return this.usersService.createUser(data);
  }

  @Get()
  async findUsers(): Promise<FindListOfUsersDto[]> {
    return this.usersService.findUsers();
  }

  @Get(':id')
  async findUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FindListOfUsersDto> {
    return this.usersService.findUserById(id);
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ): Promise<void> {
    return this.usersService.updateUserById(id, data);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.deleteUserById(id);
  }
}
