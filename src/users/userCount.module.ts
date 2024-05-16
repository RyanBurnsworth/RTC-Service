import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserCount, UserCountSchema } from "src/schemas/userCount.schema";
import { UserCountController } from "./userCount.controller";
import { UserCountService } from "./userCount.service";

@Module({
    providers: [UserCountService],
    controllers: [UserCountController],
    imports: [
      MongooseModule.forFeature([{name: UserCount.name, schema: UserCountSchema}])
    ]
  })
  export class UserCountModule {}
  