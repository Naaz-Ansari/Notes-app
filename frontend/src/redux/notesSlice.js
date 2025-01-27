import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
  notes: localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : []
}

export const notesSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote: (state, action) => {
      let note = {} 
      note = action.payload;
      state.notes.push(note);
      // localStorage.setItem('notes', JSON.stringify(state.notes));
      // console.log("nm",note);

      axios
        .post('https://notes-app-2-v10w.onrender.com/addnote', note)
        .then(() => {
          toast.success('Added to notes successfully.');
        })
        .catch((err) => {
          // console.error('Error adding note:', err);
          toast.error('Failed to add note.');
        });
     
    },
    updateNote: (state, action) => {
      const note = action.payload;
      const index = state.notes.findIndex((item) => 
        item._id === note._id
      )
      if(index >= 0){
        state.notes[index] = note;
        localStorage.setItem("notes",JSON.stringify(state.notes))
        toast("Updated Successfully")
      }
     
    },
    deleteNote: (state, action) => {
      const note = action.payload;
      const id = JSON.stringify(note._id)
      axios.delete(`https://notes-app-2-v10w.onrender.com/delete-note/${note._id}`)
      .then(() => {
        toast.success('Deleted successfully.');
      })
      .catch((err) => {
        // console.error('Error adding note:', err);
        toast.error('Failed to delete note.');
      });
     
    },
  },
})

// Action creators are generated for each case reducer function
export const { addNote, updateNote, deleteNote } = notesSlice.actions

export default notesSlice.reducer