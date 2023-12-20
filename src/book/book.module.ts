import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookSchema } from './schemas/book.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './book.controller';
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
  ],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
