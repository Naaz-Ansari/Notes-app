import mongoose from'mongoose';

const NoteModel = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String
        },
        _id: {
            type: String,
            required: true
        }
    }
)

const NoteData = new mongoose.model("notes", NoteModel);
export default NoteData;