import { expect } from 'chai';
import { HelloController } from '../src/controllers/HelloController';
import { HelloMessage } from '../src/models/HelloMessage';
import { Database } from '../src/config/database';

describe('Hello API Tests', () => {
  let helloController: HelloController;

  before(async () => {
    // Connect to test database
    process.env.MONGODB_URI = 'mongodb://localhost:27017/project-jarvis-test';
    await Database.connect();
    helloController = new HelloController();
  });

  after(async () => {
    // Clean up and disconnect
    await HelloMessage.deleteMany({});
    await Database.disconnect();
  });

  beforeEach(async () => {
    // Clear the collection before each test
    await HelloMessage.deleteMany({});
  });

  describe('GET /hello', () => {
    it('should return a default message when database is empty', async () => {
      const result = await helloController.getHello();

      expect(result).to.have.property('message');
      expect(result).to.have.property('timestamp');
      expect(result).to.have.property('fromDatabase');
      expect(result.message).to.equal(
        'Hello from Project Jarvis Backend! This is your first message.'
      );
      expect(result.fromDatabase).to.be.true;
    });

    it('should return the latest message from database', async () => {
      // First create a message
      const testMessage = 'Test hello message';
      await helloController.createHello({ message: testMessage });

      // Then fetch it
      const result = await helloController.getHello();

      expect(result).to.have.property('message');
      expect(result.message).to.equal(testMessage);
      expect(result.fromDatabase).to.be.true;
    });

    it('should return the most recent message when multiple exist', async () => {
      // Create multiple messages
      await helloController.createHello({ message: 'First message' });
      await new Promise((resolve) => setTimeout(resolve, 10)); // Small delay to ensure different timestamps
      await helloController.createHello({ message: 'Second message' });
      await new Promise((resolve) => setTimeout(resolve, 10));
      const latestMessage = 'Latest message';
      await helloController.createHello({ message: latestMessage });

      // Fetch should return the latest
      const result = await helloController.getHello();

      expect(result.message).to.equal(latestMessage);
      expect(result.fromDatabase).to.be.true;
    });
  });

  describe('POST /hello', () => {
    it('should create a new hello message', async () => {
      const testMessage = 'New test message';
      const result = await helloController.createHello({
        message: testMessage,
      });

      expect(result).to.have.property('message');
      expect(result).to.have.property('timestamp');
      expect(result).to.have.property('fromDatabase');
      expect(result.message).to.equal(testMessage);
      expect(result.fromDatabase).to.be.true;
    });

    it('should create a message with userId', async () => {
      const testMessage = 'Message with user';
      const testUserId = 'user123';
      const result = await helloController.createHello({
        message: testMessage,
        userId: testUserId,
      });

      expect(result.message).to.equal(testMessage);
      expect(result.fromDatabase).to.be.true;

      // Verify the message was saved in database
      const savedMessage = await HelloMessage.findOne({ message: testMessage });
      expect(savedMessage).to.not.be.null;
      expect(savedMessage!.userId).to.equal(testUserId);
    });

    it('should store multiple messages', async () => {
      await helloController.createHello({ message: 'Message 1' });
      await helloController.createHello({ message: 'Message 2' });
      await helloController.createHello({ message: 'Message 3' });

      const count = await HelloMessage.countDocuments();
      expect(count).to.equal(3);
    });
  });

  describe('Database Integration', () => {
    it('should handle gracefully when database operation fails', async () => {
      // Disconnect from database to simulate failure
      await Database.disconnect();

      const result = await helloController.getHello();

      expect(result.message).to.include('Database unavailable');
      expect(result.fromDatabase).to.be.false;

      // Reconnect for other tests
      await Database.connect();
    });
  });
});
