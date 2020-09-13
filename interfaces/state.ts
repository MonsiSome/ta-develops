import { postsStructure } from './postsStructure'
import { openPostStructure } from './openPostStructure'
import { creatPostStructure } from './creatPostStructure'

export interface State {
  posts?: postsStructure[]
  openedPost?: openPostStructure
  createPostData?: creatPostStructure
}
