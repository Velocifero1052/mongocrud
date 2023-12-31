import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Book } from "./schemas/book.schema";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { BookDto } from "./dto/book.dto";

import { Query } from "express-serve-static-core";
import { User } from "../auth/schemas/user.schema";

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {

    const resPerPage: number = 10
    const currentPage: number = Number(query.page) || 1;
    const skip: number = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    return this.bookModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
  }

  async create(bookDto: BookDto, user: User): Promise<Book> {
    const book: Book = new Book();
    book.title = bookDto.title;
    book.description = bookDto.description;
    book.author = bookDto.author;
    book.price = bookDto.price;
    book.category = bookDto.category;

    const data = Object.assign(book, {user: user._id})

    return await this.bookModel.create(data);
  }

  async findById(id: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException("Please enter correct id");
    }

    const book = await this.bookModel.findById({ _id: new Types.ObjectId(id) });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async updateById(id: string, bookDto: BookDto): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(
      { _id: new Types.ObjectId(id) },
      bookDto,
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async deleteById(id: string, bookDto: BookDto): Promise<Book> {
    return this.bookModel.findByIdAndDelete(
      { _id: new Types.ObjectId(id) },
      bookDto,
    );
  }
}
