import { InjectQueue } from '@nestjs/bull';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Queue } from 'bull';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor (private prisma: PrismaService, @InjectQueue('test') private testQueue: Queue){}

  async insertUser(data: { first_name: string, last_name: string}){
    if(!data.first_name || !data.last_name){
      return new UnprocessableEntityException("enter valid data");
    }
    await this.prisma.user.create({
      data:{
        first_name: data.first_name,
        last_name: data.last_name
      }
    })

    return {
      message: "Users inserted"
    }

  }

  async getUsers() {
    const users = await this.prisma.user.findMany();
    return {
      users
    }
  }

  async insertIntoQueue(data: string = "test"){
    const res = await this.testQueue.add(data)
    return res;
  }
}
