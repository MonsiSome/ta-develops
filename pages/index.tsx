import Link from 'next/link'
import { MainLayout } from '../components/MainLayout'
import { useState, useEffect } from 'react'
import { PostStructure } from '../interfaces/posts'
import { NextPageContext } from 'next'
import axios from '../axios/axios'
import styled from 'styled-components/macro'

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

interface PostsPageProps {
  posts: PostStructure[]
}

export default function Index({ posts: serverPosts }: PostsPageProps) {
  const [posts, setPosts] = useState(serverPosts)

  useEffect(() => {
    async function load() {
      const response = await axios.get('')
      const json = await response.data
      setPosts(json)
    }

    if (!serverPosts) {
      load()
    }
  })

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

Index.getInitialProps = async ({ req }: NextPageContext) => {
  if (!req) {
    return { post: null }
  }

  const response = await axios.get('')
  const posts: PostStructure[] = await response.data

  return {
    posts,
  }
}
