import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseFilterDto } from './dto/filter-course.dto';
import { PaginationParams } from './dto/PaginationParams.dto';
import { PaginateResult } from 'mongoose';

@Controller('api/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() createCourse: CreateCourseDto): Promise<Course> {
    return this.courseService.create(createCourse);
  }

  @Get()
  async findAll(
    @Query() paginationParams: PaginationParams,
    @Query() filterDto: CourseFilterDto
  ): Promise<PaginateResult<Course[]>> {
    const { skip, limit } = paginationParams;
    return this.courseService.findAll(
      skip, limit, filterDto
    );
  }

  @Get('/testData')
  async createTestData(): Promise<Course[]> {
    return this.courseService.createTestData();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Course> {
    return this.courseService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCourse: UpdateCourseDto): Promise<Course> {
    return this.courseService.update(id, updateCourse);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Course> {
    return this.courseService.remove(id);
  }
}
