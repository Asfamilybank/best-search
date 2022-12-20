import axios from 'axios'

export type SearchResponse = {
  data: {
    product_trends: {
      name: string
      search_msv: { date: string; sv: number }[]
    }[]
  }
}

export const searchByKeyword = (params: string) => {
  return axios.post<SearchResponse>('/api/interview/keyword_search', { login_token: 'INTERVIEW_SIMPLY2021', search_phrase: params })
}
