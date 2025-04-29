import mongoose from "mongoose";

const { model, Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSowo-QOJAIn_S2pYgouPnjA3z-8NKvnujKJmhU6h6TXIID1vewuVPPT3iHQ9X9fODjWBc&usqp=CAU"
    }
}, { timestamps: true });

const User = model('User', userSchema);

export { User };
