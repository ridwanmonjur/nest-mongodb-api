import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Student, StudentSchema } from './entities/student.entity';
import { Address, AddressSchema } from './entities/address.entity';
import { AdminSchema, Admin } from './entities/admin.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Student.name, schema: StudentSchema },
      { name: Address.name, schema: AddressSchema },
      { name: Admin.name, schema: AdminSchema }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
