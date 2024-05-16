import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { RoomDto } from 'src/dto/room.dto';
import { Room, RoomDocument } from 'src/schemas/room.schema';

@Injectable()
export class RoomService {
    constructor(@InjectModel(Room.name) private readonly room: Model<RoomDocument>) {}

    async findAvailableRoom(): Promise<Room> {
        console.log("Fetching an available room");
        var room = await this.room.findOne().where('userTwoId').equals('').where('endTime').equals('');
        if (!room) {
            console.log("No available rooms found. Creating new room");
            return await this.createRoom();
        }

        console.log("Adding you to room: " + room.roomId);
        room.userTwoId = randomUUID();
        this.updateRoom(room.id, room);
        
        return room;
    }

    async createRoom(): Promise<Room> {
        const userOneId = randomUUID();
        const roomId = randomUUID();

        var roomDto = {
            roomId: roomId,
            userOneId: userOneId,
            userTwoId: '',
            createdTime: new Date(),
            joinTime: '',
            endTime: ''
        }

        return await new this.room({
            ...roomDto,
        }).save();
    }

    async updateRoom(id: string, roomDto: RoomDto): Promise<Room> {
        return await this.room.findByIdAndUpdate(id, roomDto).exec();
    }

    async deleteRoom(id: string): Promise<Room> {
        return await this.room.findByIdAndDelete(id).exec();
    }
}
