import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getUsers();
  }

  @Post()
  async insertUser(@Body() data: { first_name: string, last_name: string}){
    return await this.appService.insertUser(data)
  }
}
