const User = require('../models/User');
const Room = require('../models/Room');

const asyncHandler = require('express-async-handler');

//@desc Get all users
//@route GET /users
//@access Private
const getAllUsers = asyncHandler(async(req,res) => {
    const users = await User.find().lean();
    if(!users?.length) {
        return res.status(400).json({message:"No users found"});
    }
    res.json(users);
})

//@desc Create new user
//@route POST /users
//@access Private
const createNewUser = asyncHandler(async (req,res) => {
    const {nickname} = req.body;
    //Confirm data
    if(!nickname?.length) {
        return res.status(400).json({message:'Nickname is required'});
    }

    const userObject = {nickname};

    //create and stor new user
    const user = await User.create(userObject)
    if(user) {
        res.status(201).json({message:`New user ${nickname} created`})
    } else {
        res.status(400).json({message:'Invalid user data'})
    }

})

//@desc Update user
//@route PATCH /users
//@access Private
const updateUser = asyncHandler(async(req,res) => {
    const {id,nickname} = req.body;
    if(!id || !nickname) {
        return res.status(400).json({message:'Incomplete Data'});
    }
    const user = await User.findById(id).exec();

    if(!user) {
        return res.status(400).json({message:'User not found'});
    }

    user.nickname = nickname;

    const updatedUser = await user.save();
    res.json({message: `${updatedUser.nickname} updated`});

})


//@desc Delete user
//@route DELETE /users
//@access Private
const deleteUser = asyncHandler(async(req,res) => {
    
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}