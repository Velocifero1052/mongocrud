import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Post,
  Delete,
  Query, UseGuards
} from "@nestjs/common";
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { BookDto } from './dto/book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from "@nestjs/passport";
import { ExampleDto } from "./dto/example.dto";

@Controller('book')
export class BookController {
  constructor(readonly bookService: BookService) {}

  @Get()
  getBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    console.log(query);
    return this.bookService.findAll(query);
  }

  @Get(':id')
  getBookById(@Param() id: string): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Put(':id')
  updateById(@Param() id: string, @Body() bookDto: BookDto): Promise<Book> {
    return this.bookService.updateById(id, bookDto);
  }

  @Delete(':id')
  deleteById(@Param() id: string, @Body() bookDto: BookDto) {
    return this.bookService.deleteById(id, bookDto);
  }

  @Post()
  @UseGuards(AuthGuard())
  createBook(@Body() bookDto: BookDto): Promise<Book> {
    return this.bookService.create(bookDto);
  }
}
