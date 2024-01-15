const mongoose = require('mongoose')

const AutoIncrement = require('mongoose-sequence')(mongoose);
const{Schema} = mongoose;

const channelMessageSchema = new Schema({
    channel_id: {
        type:Number,
        required: true
    },
    member_id: {
        type:Number,
        required: true
    },
    nick_name: {
        type:String,
        required: true
    },
    msg_type_code: {
        type:Number,
        required:false
    },
    connection_id: {
        type:String,
        required:false
    },
    message: {
        type:String,
        required:false
    },
    ip_address: {
        type:String,
        required: true
    },
    top_channel_msg_id: {
        type:Number,
        required: false
    },
    msg_stage_code: {
        type:Number,
        required: true
    },
    msg_date: {
        type:Date,
        default:Date.now
    },
    edit_date: {
        type:Date,
        default:Date.now
    },
    del_date: {
        type:Date,
        default:Date.now
    }
})

channelMessageSchema.plugin(AutoIncrement,{inc_field:"channel_msg_id"});

module.exports = mongoose.model('ChannelMessageS', channelMessageSchema);