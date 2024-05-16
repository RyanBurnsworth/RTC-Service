import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type RoomDocument = Room & Document;

@Schema()
export class Room {
    @Prop({required: true})
    roomId: string;

    @Prop({required: true})
    userOneId: string;

    @Prop({required: true})
    createdTime: Date;

    @Prop()
    userTwoId?: string;

    @Prop()
    joinTime?: Date;

    @Prop()
    endTime?: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);