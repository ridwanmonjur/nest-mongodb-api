import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';

dotenv.config()
console.log({env: process.env.MONGO_URI})
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), 
    CourseModule, UserModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
