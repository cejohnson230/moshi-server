import { Module } from '@nestjs/common';
import { OpenAIController } from './openai.controller';
import { OpenAIService } from './openai.service';
import { ChatHistoryModule } from '../chat-history/chat-history.module';

@Module({
  imports: [ChatHistoryModule],
  controllers: [OpenAIController],
  providers: [OpenAIService],
})
export class OpenAIModule {} 