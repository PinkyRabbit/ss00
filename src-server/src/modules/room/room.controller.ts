import { Controller, Get, UseGuards, Request, Param } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'guards/jwt-auth.guard';

import { RoomService } from './room.service';

@ApiTags('Rooms')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiOperation({ summary: 'Get random room id' })
  @ApiBearerAuth()
  @Get('/random')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Request() req) {
    return await this.roomService.getRandomRoom();
    // return await this.roomService.getRandomRoom(req.user);
  }

  @ApiOperation({ summary: 'Join room return room + users' })
  @ApiBearerAuth()
  @Get('/join/:roomId')
  @UseGuards(JwtAuthGuard)
  async joinRoom(@Request() req, @Param('roomId') roomId: string) {
    return await this.roomService.joinRoom(req.user, roomId);
  }
}
