import { Client } from '../decorators/Client';
import { injectable } from 'tsyringe';
import mongoose from 'mongoose';

interface DatabaseStats {
  connected: boolean;
  connectionString: string;
  readyState: number;
  host: string | undefined;
  port: number | undefined;
  name: string | undefined;
}

@Client({ name: 'DatabaseClient' })
@injectable()
export class DatabaseClient {
  private connectionString: string;
  private isConnected: boolean = false;

  constructor() {
    this.connectionString =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/jarvis';
  }

  async connect(): Promise<void> {
    if (this.isConnected) {
      console.log('📡 Database already connected');
      return;
    }

    try {
      await mongoose.connect(this.connectionString);
      this.isConnected = true;
      console.log('✅ Database connected successfully');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected) {
      console.log('📡 Database already disconnected');
      return;
    }

    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('✅ Database disconnected successfully');
    } catch (error) {
      console.error('❌ Database disconnection failed:', error);
      throw error;
    }
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  getConnectionString(): string {
    return this.connectionString;
  }

  async ping(): Promise<boolean> {
    try {
      const adminDb = mongoose.connection.db?.admin();
      if (adminDb) {
        await adminDb.ping();
        return true;
      }
      return false;
    } catch (error) {
      console.error('❌ Database ping failed:', error);
      return false;
    }
  }

  getStats(): DatabaseStats {
    return {
      connected: this.isConnected,
      connectionString: this.connectionString,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      name: mongoose.connection.name,
    };
  }
}
