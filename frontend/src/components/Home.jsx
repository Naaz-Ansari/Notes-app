import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addNote, deleteNote, updateNote } from '../redux/notesSlice';
import axios from 'axios';
import "bootstrap-icons/font/bootstrap-icons.css";
import Notes from './Notes';
import toast from 'react-hot-toast';
import logo from '../assets/top.svg'

export default function Home() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const noteId = searchParams.get("noteId");
  const [notes, setNotes] = useState([]);
  const [myuser, setMyuser] = useState();
  

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("https://notes-app-2-v10w.onrender.com/get-all-notes")
    .then((response => {
      setNotes(response.data);
      // console.log("data", response.data);
      // console.log("notes",notes)
  }))
  .catch((error) => console.log("sss",error))
  },)


  const OnSaveHandler = () => {
    const note = {
      title: title,
      content: content,
      _id: noteId||Date.now().toString(36),
    }

    if(noteId) {
      dispatch(updateNote(note))
    }
    else {
      dispatch(addNote(note))
    }

    setTitle('');
    setContent('');
    setSearchParams({});
  }
  
  const handleDelete = (note) => {
    dispatch(deleteNote(note));
  }

  const myUser = localStorage.getItem("user")
  const myemail = localStorage.getItem("email")

  return (
    <div className='d-flex flex-column mx-auto'>
      <div className="card">
  <div className="card-body">
    <h2>Welcome, {myUser}!</h2>
    <p>{myemail}</p>
  </div>
</div>
      <button 
      className='btn btn-primary p-2 mt-2' data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
      style={{width:"343px"}}
      >Create Note</button>
      <div className="collapse" id="collapseExample">
        <div className="card card-body flex flex-column gap-3">
          <input
           className='form-control' type='text' placeholder='Title'
           value={title}
           onChange={(e)=>setTitle(e.target.value)}
           ></input>
          <textarea
           className='form-control' style={{minHeight:"20rem"}} placeholder='Start writing...' 
           value={content}
           onChange={(e)=>setContent(e.target.value)}></textarea>
          <button className='btn btn-primary' 
          data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
          onClick={()=>{OnSaveHandler()}}>Save</button>
        </div>
      </div>
      <div className='d-flex flex-column'>{
          notes.length > 0 &&
          notes.map((note)=> { 
            return(
              <div className='d-flex flex-column border m-2 p-2'>
              <div className='d-flex justify-content-between' key={note?._id}>
                <div>
                  {note.title}
                </div>
                <div className='d-flex justify-content-between'>

                  <button className='bi bi-trash-fill btn btn-light'
                  data-tooltip-id="my-tooltip" data-tooltip-content="Delete"
                  onClick={()=>handleDelete(note?note:"")}></button>

                  <button className="bi bi-copy btn btn-light"
                  data-tooltip-id="my-tooltip" data-tooltip-content="Copy"
                  onClick={()=> {
                    navigator.clipboard.writeText(note?.content)
                    toast.success("Copied to Clipboard");
                    }}></button>
                </div>
              </div>
              <div>{note.content}</div>

              </div>
            )
          })
        }</div>
    </div>
  )
}
