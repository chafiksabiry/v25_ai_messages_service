const AIMessage = require('../models/aimessage');

class AIMessageService {
  async createMessage(messageData) {
    try {
      const message = new AIMessage(messageData);
      return await message.save();
    } catch (error) {
      throw new Error(`Error creating AI message: ${error.message}`);
    }
  }

  async getMessagesByCallId(callId) {
    try {
      return await AIMessage.find({ callId }).sort({ timestamp: -1 });
    } catch (error) {
      throw new Error(`Error fetching messages for call ${callId}: ${error.message}`);
    }
  }

  async getMessagesByCategory(category, callId = null) {
    try {
      const query = callId ? { category, callId } : { category };
      return await AIMessage.find(query).sort({ timestamp: -1 });
    } catch (error) {
      throw new Error(`Error fetching messages by category ${category}: ${error.message}`);
    }
  }

  async updateMessage(messageId, updateData) {
    try {
      return await AIMessage.findByIdAndUpdate(messageId, updateData, { new: true });
    } catch (error) {
      throw new Error(`Error updating message ${messageId}: ${error.message}`);
    }
  }

  async deleteMessage(messageId) {
    try {
      return await AIMessage.findByIdAndDelete(messageId);
    } catch (error) {
      throw new Error(`Error deleting message ${messageId}: ${error.message}`);
    }
  }

  async getMessagesByTimeRange(startDate, endDate, callId = null) {
    try {
      const query = {
        timestamp: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      };
      if (callId) query.callId = callId;
      return await AIMessage.find(query).sort({ timestamp: -1 });
    } catch (error) {
      throw new Error(`Error fetching messages by time range: ${error.message}`);
    }
  }

  async getMessagesByPriority(priority, callId = null) {
    try {
      const query = callId ? { priority, callId } : { priority };
      return await AIMessage.find(query).sort({ timestamp: -1 });
    } catch (error) {
      throw new Error(`Error fetching messages by priority ${priority}: ${error.message}`);
    }
  }

  async createMessagesBatch(messages) {
    console.log('messages:', messages);
    try {
      return await AIMessage.insertMany(messages);
    } catch (error) {
      throw new Error(`Error creating messages batch: ${error.message}`);
    }
  }
}

module.exports = new AIMessageService(); 