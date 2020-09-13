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

export function getOnePostAction(id) {
  return {
    type: 'OPEN_POST',
    payload: new Promise((resolve) => {
      axios.get(`${id}?_embed=comments`).then((response) => {
        resolve(response.data)
      })
    }),
  }
}
