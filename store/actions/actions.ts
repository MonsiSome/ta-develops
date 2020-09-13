import axios from '../../axios/axios'

export function getPostsAction() {
  return {
    type: 'GET_POSTS',
    payload: new Promise((resolve) => {
      axios.get('').then((response) => {
        resolve(response.data)
      })
    }),
  }
}

export interface Id {
  id: string | number
}
export function getOnePostAction(id: Id) {
  return {
    type: 'OPEN_POST',
    payload: new Promise((resolve) => {
      axios.get(`${id}?_embed=comments`).then((response) => {
        resolve(response.data)
      })
    }),
  }
}
