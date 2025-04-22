const skill = require("./skills-category/skill");
const user = require("./user");
const userskills = require("./user/skills");
const skillsCategory = require("./skills-category");
const ChatRoom = require("./chat-room");
const Chat = require("./chat-room/message");

const models = {};

models.user = user;
models.chatroom = ChatRoom;
models.chatmessages = Chat;
models.userskills = userskills;
models.skills = skill;
models.skillsCategory = skillsCategory;

module.exports = models;
