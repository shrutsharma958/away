const roomModel = require("../models/room.model");
const { v4: uuidv4 } = require("uuid");

async function createRoom(req, res) {
    try {
        console.log("Creating room for user:", req.user); // ✅ add this
        const room = await roomModel.create({
            roomid: uuidv4(),
            host: req.user.id
        });
        console.log("Room created:", room); // ✅ add this
        res.status(201).json({ roomid: room.roomid });
    } catch (err) {
        console.log("ROOM ERROR:", err.message); // ✅ add this
        res.status(500).json({ message: err.message });
    }
}

async function joinRoom(req, res) {
    try {
        const room = await roomModel.findOne({
            roomid: req.params.roomid,
            isActive: true
        });
        if (!room) {
            return res.status(404).json({ message: "no room found" });
        }
        res.json(room);
    } catch (err) {
        console.log("JOIN ERROR:", err.message); // ✅ add this
        res.status(500).json({ message: err.message });
    }
}

module.exports = { joinRoom, createRoom };