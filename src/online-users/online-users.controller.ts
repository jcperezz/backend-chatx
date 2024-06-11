import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OnlineUsersService } from './online-users.service';
import { CreateOnlineUserDto } from './dto/create-online-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('online-users')
@Controller('online-users')
export class OnlineUsersController {
  constructor(private readonly onlineUsersService: OnlineUsersService) {}

  @Post()
  create(@Body() createOnlineUserDto: CreateOnlineUserDto) {
    return this.onlineUsersService.create(createOnlineUserDto);
  }

  @Get()
  findAll() {
    return this.onlineUsersService.findAll();
  }

  @Delete('/remove-connection')
  removeByUserId(@Query('connectionId') id: string) {
    return this.onlineUsersService.removeByConnectionId(id);
  }
}
