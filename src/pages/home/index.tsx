import { Outlet } from 'react-router-dom'
import SearchBar from './searchBar'

const Home = () => {
  return (
    <div className="w-screen h-screen relative">
      <SearchBar />
      <Outlet />
    </div>
  )
}
export default Home
