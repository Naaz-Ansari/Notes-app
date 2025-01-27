import NoteData from'../model/note-model.js';

const addNoteData = async (req, res) => {
    try{
        await NoteData.create({
            title: req.body.title,
            content: req.body.content,
            _id: req.body._id
        })
        res.json({status:"OK"})
    }
    catch(error) {
        res.json({status:error})
    }
}

export default {addNoteData};