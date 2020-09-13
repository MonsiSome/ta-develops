import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import { ADD_POST_DATA, CLEAR_POST_DATA } from '../actions/actionTypes'

export interface State {
  posts?: Array<{
    id: string | number
    title: string
    body: string
  }>
  openedPost?: {
    id: string | number
    title: string
    body: string
    comments?: Array<{
      id: number
      posdId: number
      body: string
    }>
    createPostData: {
      title: string
      body: string
    }
  }
}

const initialState = { createPostData: { title: '', body: '' } }

export const reducer = (state: State = initialState, action: AnyAction) => {
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
