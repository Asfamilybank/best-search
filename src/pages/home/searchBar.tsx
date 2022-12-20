import { Button, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTE_SEARCH } from 'router/path'
import { useAppDispatch } from 'store/hooks'
import { useEffect, useState } from 'react'

const resolveKeyword = (keyword: string) => keyword.replace(/\s/g, '+')

const SearchBar = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const { keyword } = useParams()

  useEffect(() => {
    setValue(keyword ?? '')
  }, [])

  const onSearch = () => {
    navigate(ROUTE_SEARCH + '/' + resolveKeyword(value))
  }

  return (
    <div className="flex items-center p-5 border-b border-gray-200 space-x-2">
      <div className="text-3xl">
        <span className="font-semibold">Best</span>
        <span className="font-extralight">Search</span>
      </div>
      <TextField
        className="flex-1"
        value={value}
        placeholder="Search for new products in 961k stores"
        size="small"
        onChange={(e) => {
          setValue(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.code === '14') {
            onSearch()
          }
        }}
      />
      <Button className="search-button" variant="outlined" size="large" onClick={onSearch}>
        <SearchIcon />
      </Button>
    </div>
  )
}
export default SearchBar
