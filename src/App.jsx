import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage } from './pages/main';
import { Layout } from './components/layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
    ]
  },
]);

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}
