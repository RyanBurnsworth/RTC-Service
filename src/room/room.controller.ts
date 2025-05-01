import { Controller, Delete, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from 'src/schemas/room.schema';

@Controller('room')
export class RoomController {
    constructor(private readonly service: RoomService) {}

    @Get(":id")
    async getAvailableRoom(@Param("id") id: string): Promise<Room> {
        return await this.service.findAvailableRoom(id);
    }

    @Delete(':id')
    async deleteRoom(@Param('id') id: string) {
        await this.service.deleteRoom(id);
    }
}
