import { Controller, Post, Body } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { ChatHistoryService } from '../chat-history/chat-history.service';
import OpenAI from 'openai';

@Controller('openai')
export class OpenAIController {
  constructor(
    private readonly openaiService: OpenAIService,
    private readonly chatHistoryService: ChatHistoryService,
  ) {}

  @Post('chat')
  async generateResponse(
    @Body('messages') messages:OpenAI.Chat.ChatCompletionMessageParam[],
    @Body('userId') userId: string,
    @Body('brandId') brandId: string,
  ): Promise<{ response: string }> {
    const response = await this.openaiService.generateChatCompletion(messages, userId, brandId);
    return { response };
  }
} 