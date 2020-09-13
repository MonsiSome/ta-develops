export interface openPostStructure {
  id: string | number
  title: string
  body: string
  comments?: Array<{
    id: number | string
    posdId: number | string
    body: string
  }>
}
