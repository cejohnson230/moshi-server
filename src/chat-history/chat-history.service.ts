import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Injectable()
export class ChatHistoryService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async saveMessage(
    userId: string,
    brandId: string,
    role: 'user' | 'assistant',
    content: string
  ): Promise<void> {
    const userHistory = await this.getChatHistory(userId, brandId);
    userHistory.push({
      role,
      content,
      timestamp: new Date(),
    });
    await this.redis.set(this.getCacheKey(userId, brandId), JSON.stringify(userHistory), 'EX', 3600);
  }

  async getChatHistory(userId: string, brandId: string, limit: number = 100): Promise<ChatMessage[]> {
    const userHistory = await this.redis.get(this.getCacheKey(userId, brandId));
    console.log('userHistory', userHistory);
    if (!userHistory) return [];
    return JSON.parse(userHistory).slice(-limit);
  }

  async clearHistory(userId: string, brandId: string): Promise<void> {
    await this.redis.del(this.getCacheKey(userId, brandId));
  }

  private getCacheKey(userId: string, brandId: string): string {
    return `chat:${userId}:${brandId}`;
  }
}