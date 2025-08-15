import { Service } from '../decorators/Service';
import { HelloMessage, IHelloMessage } from '../models/HelloMessage';
import { HelloResponse, CreateHelloRequest } from '../types';

@Service({ name: 'HelloService' })
export class HelloService {
  constructor() {}

  async getLatestHello(): Promise<HelloResponse> {
    try {
      // Try to get the latest hello message from database
      const latestMessage = await HelloMessage.findOne()
        .sort({ timestamp: -1 })
        .exec();

      if (latestMessage) {
        return {
          message: latestMessage.message,
          timestamp: latestMessage.timestamp,
          fromDatabase: true,
        };
      } else {
        // If no message in database, create a default one
        return await this.createDefaultHello();
      }
    } catch (error) {
      console.error('Error fetching hello message:', error);
      // Return a fallback response if database operation fails
      return {
        message: 'Hello from Project Jarvis Backend! (Database unavailable)',
        timestamp: new Date(),
        fromDatabase: false,
      };
    }
  }

  async createHello(request: CreateHelloRequest): Promise<HelloResponse> {
    try {
      const newMessage = new HelloMessage({
        message: request.message,
        userId: request.userId,
        timestamp: new Date(),
      });

      const savedMessage = await newMessage.save();

      return {
        message: savedMessage.message,
        timestamp: savedMessage.timestamp,
        fromDatabase: true,
      };
    } catch (error) {
      console.error('Error creating hello message:', error);
      throw new Error('Failed to create hello message');
    }
  }

  private async createDefaultHello(): Promise<HelloResponse> {
    const defaultMessage = new HelloMessage({
      message: 'Hello from Project Jarvis Backend! This is your first message.',
      timestamp: new Date(),
    });

    const savedMessage = await defaultMessage.save();

    return {
      message: savedMessage.message,
      timestamp: savedMessage.timestamp,
      fromDatabase: true,
    };
  }

  async getAllHellos(): Promise<IHelloMessage[]> {
    try {
      return await HelloMessage.find().sort({ timestamp: -1 }).exec();
    } catch (error) {
      console.error('Error fetching all hello messages:', error);
      throw new Error('Failed to fetch hello messages');
    }
  }

  async getHellosByUserId(userId: string): Promise<IHelloMessage[]> {
    try {
      return await HelloMessage.find({ userId }).sort({ timestamp: -1 }).exec();
    } catch (error) {
      console.error('Error fetching hello messages by user ID:', error);
      throw new Error('Failed to fetch hello messages by user ID');
    }
  }
}
