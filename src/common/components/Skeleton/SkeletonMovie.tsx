import { Box } from './Box.tsx'
import Skeleton from 'react-loading-skeleton'
import type { OptionsType } from '@/features/movies/ui/MoviesCategory.tsx'

type Props = {
  options?: OptionsType
}

const FULL_MOVIES_SIZE_ON_PAGE = 20
const BRIEF_MOVIES_SIZE_ON_PAGE = 6

export const SkeletonMovie = ({ options }: Props) => {
  const style = options?.style
  const skeleton = options?.skeleton && true
  return (
    <>
      {skeleton ? (
        <Box>
          {Array(
            options?.skeletonSize
              ? options.skeletonSize
              : options?.full
                ? FULL_MOVIES_SIZE_ON_PAGE
                : BRIEF_MOVIES_SIZE_ON_PAGE,
          )
            .fill(null)
            .map((_, id) => (
              <div key={id}>
                <Skeleton
                  count={1}
                  width={style?.width ? style.width : 175}
                  height={style?.height ? style.height : 265}
                  borderRadius={style?.borderRadius || 16}
                  style={{ marginBottom: '10px' }}
                />
                {!options?.round} <Skeleton count={1} width={110} height={24} borderRadius={6} />
              </div>
            ))}
        </Box>
      ) : null}
    </>
  )
}
