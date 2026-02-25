import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly postService: UsersService) {}
  @Post()
  create(@Body() createPostDto: CreateUserDto) {
    return this.postService.create(createPostDto);
  }
  @Get()
  findAll() {   return this.postService.findAll();   }
  @Get(':id')
  findOne(@Param('id') id: number) {  return this.postService.findOne(id);   }
  @Put(':id')
  update(@Param('id') id: number, @Body() updatePostDto: UpdateUserDto) {
    return this.postService.update(id, updatePostDto);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postService.remove(id);
  }
}
