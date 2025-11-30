import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { handleErrors } from '@/common/utils'

export const baseApi = createApi({
  refetchOnReconnect: true,
  baseQuery: async (args, api, extraOptions) => {
    const res = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      headers: {
        accept: 'application/json',
      },
      prepareHeaders: (headers) => {
        headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
      },
    })(args, api, extraOptions)
    if (res.error) {
      handleErrors(res.error)
    }
    return res
  },
  reducerPath: 'baseApi',
  endpoints: () => ({}),
  skipSchemaValidation: process.env.NODE_ENV === 'development',
})
