import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PaginateModel, PaginateResult } from 'mongoose';
import { Course } from './entities/course.entity';
import { Schedule } from './entities/schedule.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseFilterDto } from './dto/filter-course.dto';
import { PaginationParams } from './dto/PaginationParams.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: PaginateModel<Course>,
    @InjectModel(Course.name) private readonly scheduleModel: Model<Schedule>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const createdCourse = new this.courseModel(createCourseDto);
    const savedCourse = await createdCourse.save();
    return savedCourse;
  }

  async findAll(
    skip: number = 10, limit: number = 10, filterDto: CourseFilterDto
  ): Promise<PaginateResult<Course[]>> {
    const { startDate, endDate } = filterDto;
    const conditions: any = {};
    
    if (startDate) {
      conditions['schedule.startDate'] = this.getQuery(startDate);
    }
    
    if (endDate) {
      conditions['schedule.endDate'] = this.getQuery(endDate);
    }

    console.log({conditions, filterDto});
    return await this.courseModel
      .paginate( conditions, {
        skip, limit
      });
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id).exec();
    return course;
  }

  async update(id: string, updateCourseDto: Partial<UpdateCourseDto>): Promise<Course> {
    const updatedCourse = await this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true }).exec();
    return updatedCourse;
  }

  async remove(id: string): Promise<Course> {
    return await this.courseModel.findByIdAndDelete(id).exec();
  }

  getQuery(value: string): any {
    let query = JSON.stringify(value);
    query = query.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    return JSON.parse(query);
  }

  async createTestData(): Promise<Course[]> {
    await this.courseModel.deleteMany();

    const coursesToSeed = [
      {
      name: 'Nest.js and Fastify Fundamentals',
      description: 'Learn the fundamentals of building APIs with Nest.js and Fastify.',
      price: 6000,
      duration: '6 weeks',
      level: 'Intermediate',
      topics: ['Nest.js', 'Fastify', 'WebSockets'],
      schedule: {
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-04-25'),
        classDays: ['Tuesday', 'Thursday'],
        classTime: '18:00 - 20:00',
      },
    },
    {
      name: 'Cloud Computing with AWS and Kubernetes',
      description: 'Explore cloud computing concepts with AWS and Kubernetes.',
      price: 8500,
      duration: '12 weeks',
      level: 'Advanced',
      topics: ['AWS', 'Kubernetes', 'DevOps'],
      schedule: {
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-06-20'),
        classDays: ['Monday', 'Wednesday', 'Friday'],
        classTime: '20:00 - 22:00',
      },
    },
  ];

    const seededCourses = await this.courseModel.create(coursesToSeed);
    return seededCourses;
  }


}
