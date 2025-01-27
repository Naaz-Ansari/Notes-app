import { configureStore } from '@reduxjs/toolkit'
import notesSlice from './redux/notesSlice';

export const store = configureStore({
  reducer: {
    notes: notesSlice
  },
})