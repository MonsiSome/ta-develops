import { createStore, applyMiddleware } from 'redux'
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper'
import promise from '../node_modules/redux-promise-middleware/src/index'
import { createLogger } from 'redux-logger'
import { reducer, initialState } from './reducers/reducer'
import { State } from '../interfaces/state'

const makeStore: MakeStore<State> = (context: Context) =>
  createStore(reducer, initialState, applyMiddleware(promise, createLogger({ collapsed: true })))

export const wrapper = createWrapper<State>(makeStore, { debug: true })
