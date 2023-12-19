import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [BookModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
