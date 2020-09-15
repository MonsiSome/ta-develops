import { MainLayout } from '../../components/MainLayout'
import axios from '../../axios/axios'
import Router from 'next/router'
import { creatPostStructure } from '../../interfaces/creatPostStructure'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import { ADD_POST_DATA, CLEAR_POST_DATA } from '../../store/actions/actionTypes'
import { State } from '../../interfaces/state'

const HeaderH1 = styled.h1`
  width: 60%;
  margin: 0 auto;
  padding: 1.2em;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 0 auto;
  padding: 1.2em;
  > label {
    padding: 0.6em 0;
  }
  > textarea {
    margin-bottom: 1.2em;
  }
`

const Input = styled.input`
  margin-bottom: 1.2em;
`

const Submit = styled.input`
  display: inline-block;
  margin: 3.4em 0;
  padding: 1em 0;
  width: auto;
  border: none;
  border-bottom: 1px grey solid;
  outline: none;
  background-color: #fff;
  font-size: 1em;
  text-align: start;

  &:hover {
    border-bottom: 1px rgb(116, 44, 250) solid;
    cursor: pointer;
  }
`

export default function CreatePost(): JSX.Element {
  const { createPostData } = useSelector<State, State>((createPostData) => createPostData)
  const dispatch = useDispatch()

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target
    const value = target.value
    const name = target.name

    const copyPostData: creatPostStructure = Object.assign({}, createPostData)
    copyPostData[name] = value
    dispatch({ type: ADD_POST_DATA, payload: copyPostData })
  }

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    axios
      .post('', createPostData)
      .then(function () {
        dispatch({ type: CLEAR_POST_DATA })
        Router.push('/')
      })
      .catch(function (error) {
        console.log('Error:', error)
      })
  }

  return (
    <MainLayout title={'Add post'}>
      <HeaderH1>Add new post</HeaderH1>
      <Form onSubmit={onSubmitHandler}>
        <label htmlFor="postTitle">Title</label>
        <Input
          type="text"
          name="title"
          id="postTitle"
          value={createPostData.title}
          onChange={inputChangeHandler}
          required
          autoFocus
        />
        <label htmlFor="postBody">Post</label>
        <textarea
          name="body"
          id="postBody"
          value={createPostData.body}
          cols={45}
          rows={10}
          onChange={inputChangeHandler}
          required
        />
        <Submit type="submit" value="Send" />
      </Form>
    </MainLayout>
  )
}
