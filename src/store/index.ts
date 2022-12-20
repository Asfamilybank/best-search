import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import searchReducer from './searchSlice'
import keywordReducer from './keywordSlice'

const store = configureStore({
  reducer: {
    search: searchReducer,
    keyword: keywordReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
