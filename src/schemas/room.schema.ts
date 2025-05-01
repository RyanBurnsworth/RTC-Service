import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type RoomDocument = Room & Document;

@Schema()
export class Room {
    @Prop({required: true, unique: true, index: true})
    roomId: string;

    @Prop({request: true, type: [String], default: []})
    participants: string[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);

// Automatically remove documents 24 hours after creation
RoomSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });
