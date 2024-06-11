import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
@UsePipes(new ValidationPipe()) // activa las validaciones de las peticiones
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) : Promise<User> {
    const user = await this.usersService.findOne(id);
    if(!user){
      throw new HttpException(`usuario con id ${id} no encontrado`, HttpStatus.NOT_FOUND)
    }
    return user;
  }

}
