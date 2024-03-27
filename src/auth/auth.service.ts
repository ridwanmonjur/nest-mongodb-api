import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dto/SignupDto.dto';
import { LoginDto } from './dto/LoginDto.dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const {email, password} = loginDto;
    const user: User = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    
    return { access_token: this.jwtService.sign(user.toObject()) };
  }

  async register(user: SignupDto): Promise<any> {
    const existingUser = await this.usersService.findByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('email already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.usersService.createUser(user.email, hashedPassword, user.roles);
    return newUser;
  }

  async testAdminData() {
    return await this.usersService.createTestAdmin();
  }
}
