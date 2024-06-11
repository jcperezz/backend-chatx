import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './entities/room.entity';
import { RoomWithMessages } from './entities/room-with-messages.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Promise<RoomWithMessages> {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAll(): Promise<Room[]>  {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<RoomWithMessages>  {
    return this.roomsService.findOne(id);
  }

  @Post(':id/add-participant')
  @HttpCode(204)
  addParticipant(@Param('id') id: string, @Query('userId') userId: string): Promise<void>  {
    return this.roomsService.addParticipantToRoom(id, userId);
  }

  @Post(':id/add-message')
  @HttpCode(204)
  addMessage(@Param('id') id: string, @Body() message: CreateMessageDto): Promise<void>  {
    return this.roomsService.addMessage(id, message);
  }
}
