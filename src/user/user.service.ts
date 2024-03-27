import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './entities/student.entity';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { Role } from 'src/role.enum';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(Student.name) private readonly studentModel: Model<Student>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Address.name) private readonly addressModel: Model<Address>,
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
  ) {}

  async findAllStudents(): Promise<Student[]> {
    return await this.studentModel.find().exec();
  }

  async findOneStudent(id: string): Promise<Student> {
    return await this.studentModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async createUser(email: string, password: string, roles: Role[]): Promise<User[]> {
    return await this.userModel.create([
      { email, password, roles }
    ]);
  }

  async createTestStudents(): Promise<Student[]> {
    await this.userModel.deleteMany({ roles: Role.Student });
    const hashed = await bcrypt.hash('123456', 10);
    const usersToCreate = [
      { email: 'ridwan@example.com', password: hashed, roles: [Role.Student] },
      { email: 'monjur@example.com', password: hashed, roles: [Role.Student] }
    ];
    const createdUsers = await this.userModel.create(usersToCreate);

    const studentsToCreate = [
      { 
        name: 'Ridwan', 
        instituteName: 'Brac', 
        phoneNumber: '01952996432',
        address: { street: 'Kemal Avenue', city: 'Banani', country: 'Bangladesh' },
        user: createdUsers[0]._id
      },
      { 
        name: 'Monjur', 
        instituteName: 'NSU', 
        phoneNumber: '01817041453',
        address: { street: 'Green Road', city: 'Dhanmondi', country: 'Bangladesh' },
        user: createdUsers[0]._id
      },
    ];

    const createdStudents = await this.studentModel.create(studentsToCreate);
    return createdStudents;
  }

  async createTestAdmin(): Promise<Admin[]> {
    await this.userModel.deleteMany({ roles: Role.Admin });
    const hashed = await bcrypt.hash('123456', 10);
    const usersToCreate = [
      { email: 'admin1@example.com', password: hashed, roles: [Role.Admin] },
      { email: 'admin2@example.com', password: hashed, roles: [Role.Admin] }
    ];

    const createdUsers = await this.userModel.create(usersToCreate);
    const adminsToCreate = [
      { 
        name: 'Admin1', 
        user: createdUsers[0]._id
      },
      { 
        name: 'Admin2', 
        user: createdUsers[1]._id
      },
    ];

    return await this.adminModel.create(adminsToCreate);
  }

  async removeAllStudents(): Promise<any> {
    return await this.studentModel.deleteMany({});
  }
}