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
    console.log('Fetching an available room for participantId: ', participantId);
  
    // Find a room with only 1 participant that is not the current participant
    const availableRoom = await this.roomModel.findOne({
      participants: { $size: 1, $ne: participantId },
    });

    // find a room with 1 participant that is the same as the current participant
    const existingParticipantRoom = await this.roomModel.findOne({
        $expr: {
          $and: [
            { $eq: [{ $size: "$participants" }, 1] },
            { $eq: [{ $arrayElemAt: ["$participants", 0] }, participantId] }
          ]
        }
    });

    // if nothing available create a new room
    if (!availableRoom && !existingParticipantRoom) {
      console.log('No room available. Creating new room');
      
      // remove all entries with this participants userId before creating new entry
      await this.roomModel.deleteMany({ participants: participantId }).exec();
      
      return this.createNewRoom(participantId);
    } else if (!availableRoom && existingParticipantRoom) {
        console.log("Returning existing room");
        return existingParticipantRoom;
    }
  
    // join the existing room
    if (!availableRoom.participants.includes(participantId)) {
        console.log(`Storing participantId ${participantId} in room participants`);
        availableRoom.participants.push(participantId);
    }

    console.log(`Joining room: ${availableRoom.roomId} with users: ${availableRoom.participants}`);
    return await availableRoom.save();
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
  
  async deleteRoom(roomId: string) {
    await this.roomModel.findByIdAndDelete({ roomId }).exec();
  }
}
