import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import path from 'path';

import userRegister from './controller/userController.js';
import verifyEmail from './controller/userController.js'
import addNoteData from './controller/addnoteController.js'; 
import UserData from './model/user-model.js';


const app = express()
app.use(express.json())
app.use(cors());

const _dirname = path.resolve();

//Conneting to database
mongoose.connect('mongodb+srv://naazansari172001:uKGKuH1O7KgXpd00@notes-app.a2wj4.mongodb.net/?retryWrites=true&w=majority&appName=Notes-App/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
}).then(() => {
    console.log("Connected to database.")
}).catch((error) => {
    console.log("Error",error)
})

//Mongodb Client connection
const uri = "mongodb+srv://naazansari172001:uKGKuH1O7KgXpd00@notes-app.a2wj4.mongodb.net/?retryWrites=true&w=majority&appName=Notes-App/test";
// const client = new MongoClient(uri);

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
});


client.connect(err => {
    if(err) {
        console.error('Failed to connect',err);
        return;
    }
    client.close(); 
});


app.get("/get-all-notes", async (req, res) => {
    try {
      // Query to find all documents
    const database = client.db('test');
    const collection = database.collection('notes');
    const data = await collection.find({}).toArray();
    //   console.log("data",data)
  
      res.status(200).json(data); // Send the fetched data as JSON
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: error });
    }
  });


app.post('/register', userRegister.userRegister);  
app.post('/verify-email', verifyEmail.verifyEmail);

//Adding note to database
app.post('/addnote', addNoteData.addNoteData);


app.delete("/delete-note/:id", async (req, res) => {
    // console.log("Route Parameters:", req.params); 
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ status: "Error", message: "ID is required" });
    }
  
    try {
      const database = client.db('test');
      const collection = database.collection('notes');
  
      const deletedNote = await collection.deleteOne({ _id: id });
  
      if (deletedNote.deletedCount === 0) {
        return res.status(404).json({ status: "Error", message: "Note not found" });
      }
  
      res.json({
        status: "OK",
        message: "Note deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      res.status(500).json({
        status: "Error",
        message: "Failed to delete note",
        error: error.message,
      });
    }
  });
  
  
app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*', (_,res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})  

app.listen(7005, ()=>{
    console.log("Listening on Port 7005")
})