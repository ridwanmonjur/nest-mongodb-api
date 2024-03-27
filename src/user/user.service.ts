import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './entities/student.entity';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(@InjectModel(Student.name) private readonly studentModel: Model<Student>,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async findAllStudents(): Promise<Student[]> {
    return await this.studentModel.find().exec();
  }

  async findOneStudent(id: string): Promise<Student> {
    return await this.studentModel.findById(id).exec();
  }

  async createTestStudents(): Promise<Student[]> {
    const studentsToCreate = [
      { 
        name: 'Student 1', 
        instituteName: 'Institute 1', 
        phoneNumber: '01952996432',
        user: { email: 'student1@example.com', password: '123456', role: 'student' }
      },
      { 
        name: 'Student 2', 
        instituteName: 'Institute 2', 
        phoneNumber: '01952996432',
        user: { email: 'student2@example.com', password: '123456', role: 'student' }
      },
    ];

    return await this.studentModel.create(studentsToCreate);
  }

  async removeAllStudents(): Promise<any> {
    return await this.studentModel.deleteMany({});
  }
}