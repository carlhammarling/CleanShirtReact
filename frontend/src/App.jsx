import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import UserContextProvider from '../src/contexts/UserContext'
import ContextLayout from './layouts/ContextLayout/ContextLayout'
import RootLayout from './layouts/RootLayout/RootLayout'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import Products from './pages/products/Products'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Cart from './pages/Cart/Cart'
import Likes from './pages/Likes/Likes'


const App = () => {

  const router = createBrowserRouter([
    {
      element: <ContextLayout />,
      children: [
        {
          path: '/',
          element: <RootLayout />,
          children: [
            {
              path: '/',
              element: <Home />
            },
            {
              path: '/products',
              element: <Products />
            },
            {
              path: '/products/:id',
              element: <ProductDetails />
            },
            {
              path: '/about',
              element: <About />
            },
            {
              path: '/contact',
              element: <Contact />
            },
            {
              path: '/cart',
              element: <Cart />
            },
            {
              path: '/likes',
              element: <Likes />
            },
            {
              path: '*',
              element: <NotFound />
            },
          ]
        }
      ]
    }
  ])

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  )
}


export default App