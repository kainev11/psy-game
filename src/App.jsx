import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage, loader as mainLoader } from './pages/main';
import { Layout } from './components/layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MainPage />,
        loader: mainLoader,
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
