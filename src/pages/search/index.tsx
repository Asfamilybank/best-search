import { Skeleton } from '@mui/material'
import { SearchResponse } from 'api/search'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { fetchSearchByKeyword, SearchResultState } from 'store/searchSlice'
import { Area } from '@ant-design/plots'
import dayjs from 'dayjs'

const Search = () => {
  const searchState = useAppSelector((state) => state.search)
  const dispatch = useAppDispatch()
  const { keyword } = useParams()

  useEffect(() => {
    dispatch(fetchSearchByKeyword(keyword ?? ''))
  }, [keyword])

  const switchSearch = (state: SearchResultState['loading']) => {
    switch (state) {
      case 'idle':
        return <></>
      case 'succeeded':
        return (
          <div className="flex flex-wrap">
            {searchState.value.map((item) => (
              <SearchResultItem {...item} />
            ))}
          </div>
        )
      case 'pending':
        return <SearchSkeleton />
      case 'failed':
        return <>{searchState.error}</>
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-5">
      <p className="text-xl mb-3 mx-2">Related product trends</p>
      {switchSearch(searchState.loading)}
    </div>
  )
}

const SearchResultItem = ({ name, search_msv }: SearchResponse['data']['product_trends'][number]) => {
  const startDay = dayjs(search_msv[0].date).format('MMM YYYY')
  const endDay = dayjs(search_msv.slice(-1)[0].date).format('MMM YYYY')

  return (
    <div className="m-2">
      <div className="w-60 h-60 flex flex-col border border-[#E1E1E1] rounded">
        <p className="text-xl capitalize m-4">{name}</p>
        <p className="text-sm mb-2 mx-4 opacity-60">Growth {112}%</p>
        <Area
          data={search_msv}
          xField="date"
          yField="sv"
          smooth={true}
          autoFit
          color="#96C9B5"
          xAxis={{
            grid: null,
            label: null
          }}
          yAxis={{
            grid: null,
            label: null
          }}
        />
        <div className="space-x-2 bg-[#FFFFFF] flex justify-center py-2">
          <span>{startDay}</span>
          <span>-</span>
          <span>{endDay}</span>
        </div>
      </div>
    </div>
  )
}

const SearchSkeleton = () => {
  const SkeletonItem = () => (
    <div className="m-2 w-60">
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="40%" />
      <Skeleton variant="rectangular" height={240} />
    </div>
  )

  return (
    <div className="flex space-x-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </div>
  )
}

export default Search
