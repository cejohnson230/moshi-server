import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { ChatHistoryService } from './chat-history.service';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Controller('chat-history')
export class ChatHistoryController {
  constructor(private readonly chatHistoryService: ChatHistoryService) {}

  @Get()
  async getChatHistory(
    @Query('userId') userId: string,  
    @Query('brandId') brandId: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<ChatMessage[]> {
    return this.chatHistoryService.getChatHistory(userId, brandId, limit);
  }
} 