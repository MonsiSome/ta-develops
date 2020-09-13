import { MainLayout } from '../../components/MainLayout'
import Link from 'next/link'
import styled from 'styled-components/macro'
import { wrapper } from '../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import { getOnePostAction } from '../../store/actions/actions'
import { State } from '../../store/reducers/reducer'

const Loading = styled.p`
  width: 60%;
  margin: 0 auto;
  padding: 1.2em;
`

const Article = styled.article`
  width: 60%;
  margin: 0 auto;
  padding: 1.2em;
  > h1 {
    font-size: 2em;
    text-align: start;
  }
  > p {
    margin-top: 1.6em;
  }
`

const Section = styled.section`
  padding: 1.2em 0;
  display: flex;
  flex-direction: column;
  > h3 {
    font-weight: normal;
    font-size: 1.4em;
  }
  > ul {
    list-style: none;
    padding: 0;
  }
`
const Li = styled.li`
  padding: 1.2em 0;
  text-align: start;
`

const NoComments = styled.p`
  font-size: 0.8em;
  color: rgba(0, 0, 0, 0.7);
`

const GoBack = styled.a`
  display: inline-block;
  margin: 3.4em 0;
  padding: 1em 0;
  width: 200px;
  border: none;
  border-bottom: 1px grey solid;
  outline: none;

  &:hover {
    border-bottom: 1px rgb(116, 44, 250) solid;
    cursor: pointer;
  }
`

export default function Post() {
  const { openedPost } = useSelector<State, State>((openedPost) => openedPost)
  const dispatch = useDispatch()

  if (!openedPost) {
    return (
      <MainLayout>
        <Loading>Loading...</Loading>
      </MainLayout>
    )
  }

  return (
    <MainLayout title={`Post ${openedPost.id}`}>
      <Article>
        <h1>{openedPost.title}</h1>
        <hr />
        <p>{openedPost.body}</p>
        <Section>
          <h3>Comments</h3>
          {!!openedPost.comments.length ? (
            <ul>
              {openedPost.comments.map((comment) => (
                <Li key={comment.id}>{comment.body}</Li>
              ))}
            </ul>
          ) : (
            <NoComments>No comments...</NoComments>
          )}
          <Link href={'/'}>
            <GoBack>Go back to posts</GoBack>
          </Link>
        </Section>
      </Article>
    </MainLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, params }) => {
  await store.dispatch(getOnePostAction(params.postId))
})
