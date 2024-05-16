import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModule } from './room/room.module';
import { UserCountModule } from './users/userCount.module';

@Module({
  imports: [
    RoomModule,
    UserCountModule,
    MongooseModule.forRoot('mongodb://143.42.130.115:27017/rooms')
  ],
  providers: [MongooseModule]
})
export class AppModule {}
