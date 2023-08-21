const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        min: 6,
        max: 20,
    },
    email: {
        unique: true,
        type: String,
        max: 50,
        require: true,
    },
    password: {
        type: String,
        require: true,
        min: 6,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    desc:{
        type:String,
        max: 100,

    },
    city:{
        type:String,
        max: 50,
    },
    from:{
        type:String,
        max:50
    },
    relationShip:{
        type:Number,
        enum:[1,2,3]

    },

},
{timestamps:true}
);
module.exports = mongoose.model("UserModel" ,UserSchema)
