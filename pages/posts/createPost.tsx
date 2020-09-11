import { MainLayout } from '../../components/MainLayout'
import { useState } from 'react'
import axios from '../../axios/axios'
import Router from 'next/router'
import { CreatingPost } from '../../interfaces/creatingPost'

const CreatePost: React.FunctionComponent = () => {
  const plainNewPostData: CreatingPost = { title: '', body: '' }
  const [newPostData, setPostData] = useState<CreatingPost>({ title: '', body: '' })

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target
    const value = target.value
    const name = target.name

    const copyPostData: CreatingPost = Object.assign({}, newPostData)
    copyPostData[name] = value
    setPostData(copyPostData)
  }

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    axios
      .post('', newPostData)
      .then(function () {
        const plainPostData: CreatingPost = Object.assign({}, plainNewPostData)
        setPostData(plainPostData)
        Router.push('/')
      })
      .catch(function (error) {
        console.log('Error:', error)
      })
  }

  return (
    <MainLayout title={'Add post'}>
      <h1>Add new post</h1>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="postTitle">Post title</label>
        <input
          type="text"
          name="title"
          id="postTitle"
          value={newPostData.title}
          onChange={inputChangeHandler}
          required
        />
        <label htmlFor="postBody">Post title</label>
        <input type="text" name="body" id="postBody" value={newPostData.body} onChange={inputChangeHandler} required />
        <input type="submit" />
      </form>
    </MainLayout>
  )
}

export default CreatePost
