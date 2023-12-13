import type { PaginationResult } from '~/shared/interface/paginator.interface'

export function transformDataToPaginate<T = any>(
  data: T[],
  total: number,
  page: number,
  size: number,
): PaginationResult<T> {
  const totalPage = Math.ceil(total / size)
  const hasNextPage = page < totalPage
  const hasPrevPage = page > 1
  return {
    data,
    pagination: {
      total,
      currentPage: page,
      totalPage,
      size,
      hasNextPage,
      hasPrevPage,
    },
  }
}
