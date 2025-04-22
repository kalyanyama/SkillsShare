const express = require("express");
const router = express.Router();
const models = require("../../models");

router.post("/room", async (req, res, next) => {
  const { roomId, userId, tutorId } = req.body;
  try {
    let room = await models.chatroom.findOne({ roomId, userId, tutorId });
    if (!room) {
      room = await models.chatroom.create({ roomId, userId, tutorId });
    }
    res.json({ success: true, room });
  } catch (err) {
    next(err);
  }
});

router.post("/message", async (req, res, next) => {
  const { roomId, senderId, message } = req.body;
  try {
    const chat = await models.chatmessages.create({
      roomId,
      senderId,
      message,
    });
    res.json({ success: true, data: chat });
  } catch (err) {
    next(err);
  }
});

router.get("/room/:roomId/messages", async (req, res, next) => {
  try {
    const messages = await models.chatmessages
      .find({ roomId: req.params.roomId })
      .sort("createdAt");
    res.json({ success: true, messages });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
