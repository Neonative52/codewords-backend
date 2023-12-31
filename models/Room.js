const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        players: [{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }],
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Room',roomSchema);