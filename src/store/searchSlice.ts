import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { searchByKeyword, SearchResponse } from 'api/search'

export interface SearchResultState {
  value: SearchResponse['data']['product_trends']
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  currentRequestId: string
  error: any
}

const initialState: SearchResultState = {
  value: [],
  loading: 'idle',
  currentRequestId: '',
  error: undefined
}

export const fetchSearchByKeyword = createAsyncThunk('search/fetchSearchByKeyword', async (keyword: string, { rejectWithValue }) => {
  try {
    const res = await searchByKeyword(keyword)
    console.log(res)
    return res.data.data.product_trends
  } catch (_) {
    return rejectWithValue([])
  }
})

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    search: (state) => {
      state.value = []
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchSearchByKeyword.fulfilled, (state, { meta, payload }) => {
        if (meta.requestId === state.currentRequestId) {
          state.value = payload
          state.loading = 'succeeded'
          state.currentRequestId = ''
        }
      })
      .addCase(fetchSearchByKeyword.pending, (state, { meta }) => {
        state.currentRequestId = meta.requestId
        state.loading = 'pending'
      })
      .addCase(fetchSearchByKeyword.rejected, (state, { meta, error }) => {
        if (meta.requestId === state.currentRequestId) {
          state.currentRequestId = meta.requestId
          state.loading = 'failed'
          state.value = []
          state.error = error
        }
      })
})

export const { search } = searchSlice.actions

export default searchSlice.reducer
