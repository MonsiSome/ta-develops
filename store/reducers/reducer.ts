import { HYDRATE } from 'next-redux-wrapper'
import { ADD_POST_DATA, CLEAR_POST_DATA } from '../actions/actionTypes'
import { postsStructure } from '../../interfaces/postsStructure'
import { openPostStructure } from '../../interfaces/openPostStructure'
import { State } from '../../interfaces/state'
import { creatPostStructure } from '../../interfaces/creatPostStructure'

export interface Action<T = any> {
  type:
    | T
    | { type: typeof HYDRATE; payload: State }
    | { type: 'GET_POSTS_PENDING'; payload: State }
    | { type: 'GET_POSTS_FULFILLED'; payload: postsStructure[] }
    | { type: 'OPEN_POST_PENDING'; payload: State }
    | { type: 'OPEN_POST_FULFILLED'; payload: openPostStructure }
    | { type: typeof ADD_POST_DATA; payload: creatPostStructure }
    | { type: typeof CLEAR_POST_DATA; payload: creatPostStructure }
}

export interface AnyAction extends Action {
  [extraProps: string]: any
}

export const initialState = { createPostData: { title: '', body: '' } }

export const reducer = (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload }
    case 'GET_POSTS_PENDING':
      return initialState
    case 'GET_POSTS_FULFILLED':
      return { ...state, posts: action.payload, openedPost: null }
    case 'OPEN_POST_PENDING':
      return initialState
    case 'OPEN_POST_FULFILLED':
      return { ...state, openedPost: action.payload }
    case ADD_POST_DATA:
      return { ...state, createPostData: action.payload }
    case CLEAR_POST_DATA:
      return { ...state, createPostData: { title: '', body: '' } }
    default:
      return state
  }
}
