type PageQueryParams = {
  page: string
  pageSize: string
  [key: string]: any
}

export function transformRequestToPageQuery(query: PageQueryParams) {
  const page = Number.isNaN(Number.parseInt(query.page))
    ? 1
    : Number.parseInt(query.page)
  const size = Number.isNaN(Number.parseInt(query.pageSize))
    ? 20
    : Number.parseInt(query.pageSize)
  query._skip = (page - 1) * size
  query._take = size

  return {
    page,
    size,
  }
}
