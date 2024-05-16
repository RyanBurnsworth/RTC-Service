import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserCount, UserCountDocument } from "src/schemas/userCount.schema";

@Injectable()
export class UserCountService {
    constructor(@InjectModel(UserCount.name) private readonly userCount: Model<UserCountDocument>) {}

    async getCurrentUserCount(): Promise<any> {
        let currentCount = await this.userCount.findOne();

        if (currentCount) {
            return currentCount;
        } else {
            return await this.createInitialUserCount();
        }
    }

    async createInitialUserCount() {
        console.log("Creating initial user count document");

        const userCountDto = {
            currentCount: 0,
            lastUpdated: new Date()
        };

        return await new this.userCount({
            ...userCountDto,
        }).save();
    }

    async incrementUserCount() {
        const userCount = await this.getCurrentUserCount();
        const updatedUserCount = {
            currentCount: userCount.currentCount + 1,
            lastUpdated: new Date()
        }

        return await this.userCount.findByIdAndUpdate(userCount._id, updatedUserCount);
    }

    async decrementUserCount() {
        const userCount = await this.getCurrentUserCount();
        const updatedUserCount = {
            currentCount: userCount.currentCount - 1,
            lastUpdated: new Date()
        }

        return await this.userCount.findByIdAndUpdate(userCount._id, updatedUserCount);
    }

    async updateCurrentUserCount(id: string, userCountDto: any) {
        return await this.userCount.findByIdAndUpdate(id, userCountDto);
    }
}
