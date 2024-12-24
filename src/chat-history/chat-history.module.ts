import { Module } from '@nestjs/common';
import { ChatHistoryController } from './chat-history.controller';
import { ChatHistoryService } from './chat-history.service';

@Module({
//  imports: [CacheModule],
  controllers: [ChatHistoryController],
  providers: [ChatHistoryService],
  exports: [ChatHistoryService],
})
export class ChatHistoryModule {}