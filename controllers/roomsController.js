const User = require('../models/User');
const Room = require('../models/Room');

const asyncHandler = require('express-async-handler');

//@desc Get all users
//@route GET /users
//@access Private
const getRoom = asyncHandler(async(req,res) => {
    const rooms = await Room.find().lean();
    if(!rooms?.length) {
        return res.status(400).json({message:"No rooms found"});
    }
    res.json(rooms);
})

//@desc Create new user
//@route POST /users
//@access Private
const createNewRoom = asyncHandler(async (req,res) => {
    const room = await Room.create({});
    if(room) {
        res.status(201).json({message: `New room created`});
    } else {
        res.status(400).json({message:'Invalid data'})
    }
})

//@desc Update user
//@route PATCH /users
//@access Private
const updateRoom = asyncHandler(async(req,res) => {
   const {id} = req.body;
   const player = req.body.player;
   if(!id || !player) {
    return res.status(400).json({message:'Incomplete Data'});
   }

   const room = await Room.findById(id).exec();
   if(!room) {
        return res.status(400).json({message:'Room not found'});
   }
   const {players} = room;
   room.players = [...players,player];
   const updatedRoom = await room.save();
   res.json({message: `${updatedRoom.roomName} updated`});
})


//@desc Delete user
//@route DELETE /users
//@access Private
const deleteRoom = asyncHandler(async(req,res) => {
    
})

module.exports = {
    getRoom,
    createNewRoom,
    updateRoom,
    deleteRoom
}