import type { RequestStatus } from '@/common/types'
import { createSlice } from '@reduxjs/toolkit'
import type { MoviesImages } from '@/app/model/configurationApi.types.ts'
// import { todolistsApi } from '@/features/todolists/api/todolistsApi.ts'
// import { tasksApi } from '@/features/todolists/api/tasksApi.ts'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    imageConfiguration: {} as MoviesImages,
    themeMode: 'light' as ThemeMode,
    status: 'idle' as RequestStatus,
    error: null as string | null,
    // isLoggedIn: false,
  },
  selectors: {
    selectImageConfiguration: (state) => state.imageConfiguration,
    selectThemeMode: (state) => state.themeMode,
    // selectAppStatus: (state) => state.status,
    selectAppError: (state) => state.error,
    // selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  reducers: (create) => ({
    // setConfigurationData: create.reducer<{ imageConfiguration: MoviesImages }>((state, action) => {
    //   state.imageConfiguration = action.payload.imageConfiguration
    // }),
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    // setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
    //   state.isLoggedIn = action.payload.isLoggedIn
    // }),
  }),
  // extraReducers: (builder) => {
  //   builder

  //1 variant
  // .addMatcher(
  //   (action) => {
  //     return action.type.endsWith("/pending")
  //   },
  //   (state) => {
  //     state.status = "loading"
  //   },
  // )
  // .addMatcher(
  //   (action) => {
  //     return action.type.endsWith("/fulfilled")
  //   },
  //   (state) => {
  //     state.status = "succeeded"
  //   },
  // )
  // .addMatcher(
  //   (action) => {
  //     return action.type.endsWith("/rejected")
  //   },
  //   (state) => {
  //     state.status = "failed"
  //   },
  // )
  // 2variant
  // .addMatcher(isPending, (state) => {
  //   state.status = "loading"
  // }) zakomentil 4tobi 3 varik pokazat snizu

  // .addMatcher(isFulfilled, (state) => {
  //   state.status = 'succeeded'
  // })
  // .addMatcher(isRejected, (state) => {
  //   state.status = 'failed'
  // })
  // //3 varik pod raznie krutilki
  // //3 variant raznie krutilki
  // .addMatcher(isPending, (state, _action) => {
  //   //Передаем экшен он сам с него достанет тип и подставляет
  //   // if (
  //   //   true
  //   //   // todolistsApi.endpoints.fetchTodolists.matchPending(action) ||
  //   //   // tasksApi.endpoints.getTasks.matchPending(action)
  //   // ) {
  //   //   return
  //   // }
  //   state.status = 'loading'
  // })
  // },
})

export const { selectThemeMode, /*selectAppStatus,*/ selectAppError /* selectImageConfiguration */ } =
  appSlice.selectors
export const { changeThemeModeAC, /*setAppStatusAC,*/ setAppErrorAC /*setConfigurationData*/ } = appSlice.actions
export const appReducer = appSlice.reducer

export type ThemeMode = 'dark' | 'light'
