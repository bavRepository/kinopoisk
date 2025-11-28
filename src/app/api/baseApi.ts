import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { handleErrors } from '@/common/utils'
// import { AUTH_TOKEN } from '@/common/constants/constants.ts'
// import { handleError } from '@/common/utils/handleError.ts'

export const baseApi = createApi({
  refetchOnReconnect: true,
  baseQuery: async (args, api, extraOptions) => {
    // await new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //     resolve()
    //   }, 1200)
    // })
    const res = await fetchBaseQuery({
      // await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      // credentials: 'include',
      headers: {
        //  Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        // 'API-KEY': import.meta.env.VITE_API_KEY,
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
  // baseQuery: fetchBaseQuery({
  //   // await fetchBaseQuery({
  //   baseUrl: import.meta.env.VITE_BASE_URL,
  //   // credentials: 'include',
  //   headers: {
  //     Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  //     // 'API-KEY': import.meta.env.VITE_API_KEY,
  //     accept: 'application/json',
  //   },
  //   prepareHeaders: (headers) => {
  //     headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
  //   },
  // }),

  // handleError(api, res)

  // Через сколько обновлять кэш keepUnusedDataFor : 120 можно убрать из глобального и оставить конкретному запросу
  // refetchOnFocus: true чтобы в компаненте сделать локально надо   const { data, isLoading } = useGetTasksQuery({id, params: {page: page}}, {refetchOnFocus: true})

  reducerPath: 'baseApi',
  // tagTypes: ['Todolist', 'Task'],
  endpoints: () => ({}),
  skipSchemaValidation: process.env.NODE_ENV === 'development',
})
