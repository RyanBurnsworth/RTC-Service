import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserCountDocument = UserCount & Document;

@Schema()
export class UserCount {
    @Prop({required: true})
    currentCount: number;

    @Prop({required: true})
    lastUpdated: Date;
}

export const UserCountSchema = SchemaFactory.createForClass(UserCount);