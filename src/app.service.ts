import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor (private prisma: PrismaService){}

  async insertUser(data: { first_name: string, last_name: string}){
    const users = await this.prisma.user.create({
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
}
