import { baseApi } from '@/app/api/baseApi.ts'
import type { ApiConfigurationResponse } from './configurationApi.types.ts'

export const configurationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getConfiguration: build.query<ApiConfigurationResponse, void>({
      query: () => {
        return {
          url: '/configuration',
        }
      },
    }),
  }),
})

export const { useGetConfigurationQuery } = configurationApi
