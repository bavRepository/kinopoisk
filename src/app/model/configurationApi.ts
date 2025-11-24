import { baseApi } from '@/app/api/baseApi.ts'
import type { ApiResponse } from './configurationApi.types.ts'

export const configurationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getConfiguration: build.query<ApiResponse, void>({
      query: () => {
        return {
          url: '/configuration',
        }
      },
    }),
  }),
})

export const { useGetConfigurationQuery } = configurationApi
