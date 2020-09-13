import Link from 'next/link'
import { MainLayout } from '../components/MainLayout'
import styled from 'styled-components/macro'
import { wrapper } from '../store/store'
import { useSelector } from 'react-redux'
import React from 'react'
import { getPostsAction } from '../store/actions/actions'
import { State } from '../interfaces/state'

const Loading = styled.p`
  width: 60%;
  margin: 0 auto;
  padding: 1.2em;
`

const HeaderPosts = styled.header`
  width: 60%;
  margin: 0 auto;
  padding: 1.2em;
`

const Ul = styled.ul`
  width: 60%;
  margin: 0 auto;
  padding: 1.2em;
  list-style: none;
  > li {
    padding: 0.2em;
    text-align: start;
    text-transform: uppercase;
  }
`

const Anchor = styled.a`
  text-decoration: none;
  color: #000;
  &:hover {
    border-bottom: 1px rgb(116, 44, 250) solid;
    cursor: pointer;
  }
  &:visited {
    text-decoration: none;
    color: #000;
  }
`

export default function Page(): JSX.Element {
  const { posts } = useSelector<State, State>((posts) => posts)

  if (!posts) {
    return (
      <MainLayout>
        <Loading>Loading...</Loading>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <HeaderPosts>
        <h1>Posts page</h1>
        <p>Real stories & opinions about running an independent membership business.</p>
      </HeaderPosts>
      <Ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/[postId]`} as={`/posts/${post.id}`}>
              <Anchor>{post.title}</Anchor>
            </Link>
          </li>
        ))}
      </Ul>
    </MainLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  await store.dispatch(getPostsAction())
})
