import Link from 'next/link'
import { MainLayout } from '../components/MainLayout'
import { useState, useEffect } from 'react'
import { MyPost } from '../interfaces/posts'
import { NextPageContext } from 'next'
import axios from '../axios/axios'

interface PostsPageProps {
  posts: MyPost[]
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
  }, [])

  if (!posts) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <h1>Posts page</h1>
      <p>Real stories & opinions about running an independent membership business.</p>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/[postId]`} as={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </MainLayout>
  )
}

Index.getInitialProps = async ({ req }: NextPageContext) => {
  if (!req) {
    return { post: null }
  }

  const response = await axios.get('')
  const posts: MyPost[] = await response.data

  return {
    posts,
  }
}
