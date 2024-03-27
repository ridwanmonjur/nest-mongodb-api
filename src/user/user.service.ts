import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './entities/student.entity';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';


@Injectable()
export class UserService {
  constructor(@InjectModel(Student.name) private readonly studentModel: Model<Student>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Address.name) private readonly addressModel: Model<Address>,
  ) {}

  async findAllStudents(): Promise<Student[]> {
    return await this.studentModel.find().exec();
  }

  async findOneStudent(id: string): Promise<Student> {
    return await this.studentModel.findById(id).exec();
  }

  async createTestStudents(): Promise<Student[]> {
    const addressesToCreate = [
      { street: 'Green Road', city: 'Banani', country: 'Country 1' },
      { street: 'Street 2', city: 'Dhanmondi', country: 'Country 2' },
    ];
    const createdAddresses = await this.addressModel.create(addressesToCreate);

    const studentsToCreate = [
      { 
        name: 'Ridwan', 
        instituteName: 'Brac', 
        phoneNumber: '01952996432',
        address: createdAddresses[0]._id,
        user: { email: 'ridwan@example.com', password: '123456', role: 'student' }
      },
      { 
        name: 'Monjur', 
        instituteName: 'NSU', 
        phoneNumber: '01817041453',
        address: createdAddresses[1]._id,
        user: { email: 'monjur@example.com', password: '123456', role: 'student' }
      },
    ];

    const createdStudents = await this.studentModel.create(studentsToCreate);
    // const createdStudents = await this.studentModel.populate(createdStudents, { path: 'address', select: '-__v' });
    // createdStudents.forEach((createdStudent, index) => {
    //   createdStudent.address = createdAddresses[index];
    // });
    return createdStudents;
  }

  async removeAllStudents(): Promise<any> {
    return await this.studentModel.deleteMany({});
  }
}