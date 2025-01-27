import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import SignIn from './components/SignIn'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <>
       <Register></Register>
        </>
    },
    {
      path: "/signin",
      element: <SignIn></SignIn>
    },
    {
      path: "/register",
      element: <>
      <Register></Register></>
    }
  ]
)

function App() {

  return (
    <>
     <RouterProvider router={router}>

     </RouterProvider>
    </>
  )
}

export default App
