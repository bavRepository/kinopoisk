import s from './searchForm.module.css'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { searchSchema } from '@/common/components/SearchForm/lib/shemas.ts'
import * as z from 'zod'
import { useNavigate } from 'react-router'
import { Path } from '@/common/routing'
import { useEffect } from 'react'

type SearchFormProps = {
  setSkip?: (skip: boolean) => void
  searchQueryOuter?: string
}

export type searchInput = z.infer<typeof searchSchema>

export const SearchForm = ({ setSkip, searchQueryOuter }: SearchFormProps) => {
  const currentTheme = useAppSelector(selectThemeMode)
  const inputClasses = currentTheme === 'dark' ? ' ' + s.searchInputNight : ''
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<searchInput>({
    resolver: zodResolver(searchSchema),
  })
  const searchQuery = watch('query')

  useEffect(() => {
    if (searchQueryOuter !== undefined) {
      setValue('query', searchQueryOuter)
    }
  }, [searchQueryOuter])

  const navigateToPageWithQueryData = (url: string, data: searchInput) => {
    navigate(`${url}/?query=${encodeURIComponent(data.query)}`)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit((data) => {
        onSubmit(data)
      })()
    }
  }
  const onSubmit = (data: searchInput) => {
    setSkip?.(false)
    navigateToPageWithQueryData(Path.Search, data)
  }

  return (
    <form className={s.searchForm} onSubmit={handleSubmit(onSubmit)}>
      <input
        id='query'
        className={s.searchInput + inputClasses}
        type='search'
        placeholder={'Search for a movie'}
        {...register('query')}
        onKeyDown={handleKeyDown}
      />

      <button
        className={s.btnSearch + ' ' + (searchQuery ? s.active : '')}
        type={'submit'}
        disabled={(searchQuery?.length ?? 0) < 1}
      >
        Search
      </button>
      {errors.query && <p style={{ color: 'red' }}>{errors.query.message}</p>}
    </form>
  )
}
