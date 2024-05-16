import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoomDto } from 'src/dto/room.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
    constructor(private readonly service: RoomService) {}

    @Get()
    async getAvailableRoom() {
        return await this.service.findAvailableRoom();
    }

    @Post()
    async createRoom() {
        return await this.service.createRoom();
    }

    @Put(':id')
    async updateRoom(@Param('id') id: string, @Body() roomDto: RoomDto) {
        return await this.service.updateRoom(id, roomDto);
    }

    @Delete(':id')
    async deleteRoom(@Param('id') id: string) {
        return await this.service.deleteRoom(id);
    }
}
