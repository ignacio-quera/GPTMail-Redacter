import {
    createBrowserRouter,
    RouterProvider,
    redirect
  } from 'react-router-dom';

import Layout from './components/Layout'
import MainPage from './views/MainPage'

function Router() {
    const router = createBrowserRouter([
        {
          path: '/',
          element: <Layout />,
          children: [
            {
              path: '',
              element: <MainPage />
            }
            ]
        },
        {
          path: '*', 
          loader: () => {
            return redirect('/')
          }
        } 
      ])
    
      return (
        <RouterProvider router={router} />
      );
    }

export default Router;