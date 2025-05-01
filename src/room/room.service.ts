import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { Room, RoomDocument } from 'src/schemas/room.schema';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
  ) {}
  /**
   * Find a room with one user available to join or create a new room
   *
   * @params participantId the id of the participant
   *
   * @returns an available room
   */
  async findAvailableRoom(participantId: string): Promise<Room> {
    console.log('Fetching an available room');
  
    // Find a room with only 1 participant that is not the current participant
    const room = await this.roomModel.findOne({
      participants: { $size: 1, $ne: participantId },
    });
  
    if (!room) {
      console.log('findAvailableRoom: No room available. Creating new room');
      return this.createNewRoom(participantId);
    }
  
    console.log('findAvailableRoom: Joining room: ' + room.roomId);
  
    if (!room.participants.includes(participantId)) {
      room.participants.push(participantId);
    }
  
    return await room.save();
  }

  /**
   * Create a new room
   * 
   * @returns a newly created room
   */
  async createNewRoom(participantId: string): Promise<Room> {
    const roomId = randomUUID();

    const newRoom = new this.roomModel({
      roomId,
      participants: [participantId],
    });

    console.log("createNewRoom: ", newRoom);
    
    return await newRoom.save();
  }
  
  async deleteRoom(id: string) {
    await this.roomModel.findByIdAndDelete(id).exec();
  }
}
