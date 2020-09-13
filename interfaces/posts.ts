export interface PostsStructure {
  posts?: Array<{
    id: string | number
    title: string
    body: string
    comments?: Array<{
      id: number
      posdId: number
      body: string
    }>
  }>
}
