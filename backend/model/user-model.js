import mongoose from 'mongoose';

const UserModel = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        isVarified: {
            type: Boolean,
            default: false
        },
        verficationcode: String
    }, 
    {Timestamp:true}
)

const UserData = new mongoose.model("user", UserModel);
export default UserData;