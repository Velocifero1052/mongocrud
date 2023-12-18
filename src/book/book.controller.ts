import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { BookDto } from './book.dto';

@Controller('book')
export class BookController {
  constructor(readonly bookService: BookService) {}

  @Get()
  getBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  getBookById(@Param() id: string): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Put(':id')
  updateById(@Param()id: string, @Body()bookDto: BookDto): Promise<Book> {
    return this.bookService.updateById(id, bookDto);
  }

  @Delete(':id')
  deleteById(@Param()id: string, @Body()bookDto: BookDto) {
    // @ts-ignore
    return this.bookService.deleteById(id);
  }

  @Post()
  createBook(@Body() bookDto: BookDto): Promise<Book> {
    return this.bookService.create(bookDto);
  }

}
