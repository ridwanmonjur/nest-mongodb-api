import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/student')
  findAllStudents() {
    return this.userService.findAllStudents();
  }

  @Get('/student/populate')
  populate(@Param('id') id: string) {
    this.userService.removeAllStudents();
    return this.userService.createTestStudents();
  }

  @Get('/student/:id')
  findOneStudent(@Param('id') id: string) {
    return this.userService.findOneStudent(id);
  }

}
