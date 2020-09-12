// import { createStore, AnyAction, Middleware } from 'redux'
// import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper'
// import thunk from 'redux-thunk'

// export interface State {
//   server: any
//   client: any
// }

// const reducer = (state: State = { tick: 'init' }, action: AnyAction) => {
//   switch (action.type) {
//     case HYDRATE:
//       return {
//         ...state,
//         server: {
//           ...state.server,
//           ...action.payload.server,
//         },
//       }
//     case 'SERVER_ACTION':
//       return {
//         ...state,
//         server: {
//           ...state.server,
//           tick: action.payload,
//         },
//       }
//     case 'CLIENT_ACTION':
//       return {
//         ...state,
//         client: {
//           ...state.client,
//           tick: action.payload,
//         },
//       }
//     default:
//       return state
//   }
// }

// // create a makeStore function
// const makeStore: MakeStore<State> = (context: Context) => createStore(reducer)

// // export an assembled wrapper
// export const wrapper = createWrapper<State>(makeStore, { debug: true })

import { createStore, AnyAction, applyMiddleware } from 'redux'
import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper'
// import thunk from 'redux-thunk'
// import { createStore, applyMiddleware } from 'redux'
import promise from '../node_modules/redux-promise-middleware/src/index'
// import promise from '/Users/snegaryazantseva/Downloads/GitHubDesktop/ta-develops-today/node_modules/redux-promise-middleware/src/index'
import { createLogger } from 'redux-logger'

// export interface State {
//   tick: string
// }

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
// const getDog = () => ({
//   type: 'GET_DOG',
//   payload: fetch('https://dog.ceo/api/breeds/image/random').then((response) => response.json()),
// })
// payload: axios.get('').then((response) => redponse.data)
// const response = await axios.get('')
// const json = await response.data
// setPosts(json)
const initialState = { createPostData: { title: '', body: '' } }
// create your reducer
const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload }
    // case 'TICK':
    //   return { ...state, tick: action.payload }
    // case 'GET_POSTS':
    //   return { ...state, initialState: action.payload }
    case 'GET_POSTS_PENDING':
      return initialState
    case 'GET_POSTS_FULFILLED':
      return { ...state, posts: action.payload }
    case 'OPEN_POST_PENDING':
      return initialState
    case 'OPEN_POST_FULFILLED':
      return { ...state, openedPost: action.payload }
    case 'CLEAR_OPEN_POST_DATA':
      return { ...state, openedPost: {} }
    case 'ADD_POST_DATA':
      return { ...state, createPostData: action.payload }
    case 'CLEAR_POST_DATA':
      return { ...state, createPostData: { title: '', body: '' } }
    default:
      return state
  }
}
// const logger = createLogger({
//   // ...options
// })
const makeStore: MakeStore<State> = (context: Context) =>
  createStore(reducer, {}, applyMiddleware(promise, createLogger({ collapsed: true })))
// create a makeStore function
// const makeStore: MakeStore<State> = (context: Context) => createStore(reducer, applyMiddleware(thunk))

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore, { debug: true })
