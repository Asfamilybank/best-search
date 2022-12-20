import { createSlice } from '@reduxjs/toolkit'

export interface KeywordState {
  value: string
}

const initialState: KeywordState = {
  value: ''
}

export const keywordSlice = createSlice({
  name: 'keyword',
  initialState,
  reducers: {
    updateKeyword: (state, { payload }) => {
      state.value = payload
    }
  }
})

export const { updateKeyword } = keywordSlice.actions

export default keywordSlice.reducer
