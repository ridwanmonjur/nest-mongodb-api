import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Role } from 'src/role.enum';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/student')
  @UseGuards(JwtGuard, RolesGuard)
  @HasRoles(Role.Admin)
  findAllStudents() {
    return this.userService.findAllStudents();
  }

  @Get('/student/testData')
  populate(@Param('id') id: string) {
    this.userService.removeAllStudents();
    return this.userService.createTestStudents();
  }

  @Get('/student/:id')
  findOneStudent(@Param('id') id: string) {
    return this.userService.findOneStudent(id);
  }

}
