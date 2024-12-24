import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatHistoryService } from '../chat-history/chat-history.service';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(
    private readonly chatHistoryService: ChatHistoryService,
  ) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }
    
    this.openai = new OpenAI({
      apiKey: apiKey.trim(),
    });
  }

  async generateChatCompletion(new_messages: OpenAI.Chat.ChatCompletionMessageParam[], userId: string, brandId: string): Promise<string> {
    const previousMessages = await this.chatHistoryService.getChatHistory(userId, brandId);
    
    const messages = [
      ...previousMessages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      ...new_messages
    ];

    const stream = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      stream: true,
    });

    let fullResponse = '';
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      fullResponse += content;
    }

    await this.chatHistoryService.saveMessage(userId, brandId, 'user', messages.pop().content.toString());
    await this.chatHistoryService.saveMessage(userId, brandId, 'assistant', fullResponse);


    return fullResponse;
  }
} 