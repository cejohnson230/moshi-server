import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatHistoryModule } from './chat-history/chat-history.module';
import { OpenAIModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ChatHistoryModule,
    OpenAIModule,
  ],
})
export class AppModule {}
