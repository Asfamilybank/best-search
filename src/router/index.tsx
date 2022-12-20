import { createBrowserRouter } from 'react-router-dom'
import Home from 'pages/home'
import Search from 'pages/search'
import { ROUTE_HOME, ROUTE_SEARCH } from './path'

const Router = createBrowserRouter([
  {
    path: ROUTE_HOME,
    element: <Home />,
    children: [
      { path: ROUTE_SEARCH + '/:keyword', element: <Search /> },
      { path: ROUTE_SEARCH, element: <Search /> }
    ]
  }
])

export default Router
