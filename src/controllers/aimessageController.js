const aiMessageService = require('../services/aimessageService');

class AIMessageController {
  async createMessage(req, res) {
    try {
      const message = await aiMessageService.createMessage(req.body);
      res.status(201).json({
        success: true,
        data: message
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async getMessagesByCallId(req, res) {
    try {
      const { callId } = req.params;
      const messages = await aiMessageService.getMessagesByCallId(callId);
      res.status(200).json({
        success: true,
        data: messages
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async getMessagesByCategory(req, res) {
    try {
      const { category } = req.params;
      const { callId } = req.query;
      const messages = await aiMessageService.getMessagesByCategory(category, callId);
      res.status(200).json({
        success: true,
        data: messages
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async updateMessage(req, res) {
    try {
      const { messageId } = req.params;
      const message = await aiMessageService.updateMessage(messageId, req.body);
      res.status(200).json({
        success: true,
        data: message
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async deleteMessage(req, res) {
    try {
      const { messageId } = req.params;
      await aiMessageService.deleteMessage(messageId);
      res.status(200).json({
        success: true,
        message: 'Message deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async getMessagesByTimeRange(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const { callId } = req.query;
      const messages = await aiMessageService.getMessagesByTimeRange(startDate, endDate, callId);
      res.status(200).json({
        success: true,
        data: messages
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async getMessagesByPriority(req, res) {
    try {
      const { priority } = req.params;
      const { callId } = req.query;
      const messages = await aiMessageService.getMessagesByPriority(priority, callId);
      res.status(200).json({
        success: true,
        data: messages
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async createMessagesBatch(req, res) {
    try {
      console.log('req.body:', req.body);
      const messages = await aiMessageService.createMessagesBatch(req.body);
      res.status(201).json({
        success: true,
        data: messages
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new AIMessageController(); 