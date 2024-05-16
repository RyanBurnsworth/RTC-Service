import { Controller, Delete, Get, Post } from "@nestjs/common";
import { UserCountService } from "./userCount.service";

@Controller('user-count')
export class UserCountController {

    constructor(private userCountService: UserCountService) {}

    @Post()
    async addFromUserCount() {
        await this.userCountService.incrementUserCount();
    }

    @Get()
    async getCurrentUserCount() {
        const currentUserCount = await this.userCountService.getCurrentUserCount();
        return { 'userCount': currentUserCount.currentCount };
    }

    @Delete()
    async removeFromUserCount() {
        await this.userCountService.decrementUserCount();
    }
}
