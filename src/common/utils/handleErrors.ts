import { isErrorWithDetailArray } from '@/common/utils/isErrorWithDetailArray.ts'
import { trimToMaxLength } from '@/common/utils/trimToMaxLength.ts'
import { isErrorWithProperty } from '@/common/utils/isErrorWithProperty.ts'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { errorToast } from '@/common/utils/errorToast.ts'

export const handleErrors = (error: FetchBaseQueryError) => {
  if (error) {
    switch (error.status) {
      case 'FETCH_ERROR':
      case 'PARSING_ERROR':
      case 'CUSTOM_ERROR':
      case 'TIMEOUT_ERROR':
        errorToast(error.error)
        break
      case 400:
        if (isErrorWithDetailArray(error.data)) {
          const errorMessage = error.data.errors[0].detail
          console.log(errorMessage, ' 400   isErrorWithDetailArray')
          if (errorMessage.includes('refresh')) return
          errorToast(trimToMaxLength(error.data.errors[0].detail))
          console.log(errorMessage, ' 400   isErrorWithDetailArray trimToMaxLength')
        } else {
          errorToast(JSON.stringify(error.data))
          console.log(error.data, ' 400   noDetailArray')
        }
        break
      case 403:
        if (isErrorWithDetailArray(error.data)) {
          const errorMessage = error.data.errors[0].detail // del
          console.log(errorMessage, ' 400   isErrorWithDetailArray')
          errorToast(trimToMaxLength(error.data.errors[0].detail))
          console.log(errorMessage, ' 403   isErrorWithDetailArray trimToMaxLength')
        } else {
          errorToast(JSON.stringify(error.data))
          console.log(error.data, ' 403  noDetailArray')
        }
        break
      case 404:
        if (isErrorWithProperty(error.data, 'error')) {
          console.log(error.data, ' 404   isErrorWithProperty')
          errorToast(error.data.error)
        } else {
          console.log(error.data + ' 404')
          errorToast(JSON.stringify(error.data))
        }
        break
      case 429:
        if (isErrorWithProperty(error.data, 'message')) {
          console.log(error.data, ' 429   isErrorWithProperty')
          errorToast(error.data.message)
        } else {
          errorToast(JSON.stringify(error.data))
          console.log(error.data + ' 429')
        }
        break

      default:
        if (error.status >= 500 && error.status < 600) {
          errorToast('Server error occurred. Please try again later.')
        } else {
          errorToast('Some error occurred')
        }
    }
  }
}
