
import { Category } from '../schemas/book.schema';
import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "../../auth/schemas/user.schema";

export class BookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsEnum(Category, { message: "Please enter correct category"})
  readonly category: Category;

  @IsEmpty({message: "use cannot pass user id"})
  readonly user: User;
}

