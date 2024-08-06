import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AllEvents from './Components/Events/AllEvents.jsx'
import ErrorPage from './ErrorPage.jsx'
import "flowbite";

import CreateEvent from './Components/Events/CreateEvent.jsx'
import UpdateEvents from './Components/Events/UpdateEvent.jsx'
import CreatePromotion from './Components/Events/CreatePromotion.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/promotion",
    element: <CreatePromotion></CreatePromotion>,
  },
  {
    path: "events",
    element: <AllEvents></AllEvents>,
  },
  {
    path: "updateevent/:id",
    element: <UpdateEvents></UpdateEvents>,
  },
  {
    path: "createevent",
    element: <CreateEvent></CreateEvent>,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
