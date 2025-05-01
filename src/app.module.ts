import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    RoomModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/rooms')
  ],
  providers: [MongooseModule]
})
export class AppModule {}
