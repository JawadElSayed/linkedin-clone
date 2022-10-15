const mongoose = require('mongoose');

const followersSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});



const model = mongoose.model("Follower", followersSchema);

module.exports = model;
