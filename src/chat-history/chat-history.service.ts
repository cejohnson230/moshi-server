import { Injectable } from '@nestjs/common';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Injectable()
export class ChatHistoryService {
  private chatHistory: Map<string, ChatMessage[]> = new Map();

  async saveMessage(userId: string, role: 'user' | 'assistant', content: string): Promise<void> {
    const userHistory = this.chatHistory.get(userId) || [];
    userHistory.push({
      role,
      content,
      timestamp: new Date(),
    });
    this.chatHistory.set(userId, userHistory);
  }

  async getChatHistory(userId: string, limit: number = 10): Promise<ChatMessage[]> {
    const userHistory = this.chatHistory.get(userId) || [];
    return userHistory.slice(-limit);
  }

  async clearHistory(userId: string): Promise<void> {
    this.chatHistory.delete(userId);
  }
}