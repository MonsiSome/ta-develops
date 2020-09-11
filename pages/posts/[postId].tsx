import { useRouter } from 'next/router'
import { MainLayout } from '../../components/MainLayout'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { NextPageContext } from 'next'
import { MyPost } from '../../interfaces/posts'
import axios from '../../axios/axios'

interface PostPageProps {
  post: MyPost
}

export default function Post({ post: serverPost }: PostPageProps) {
  const [post, setPost] = useState(serverPost)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const response = await axios.get(`${router.query.postId}`)
      const dataPost: MyPost = await response.data
      setPost(dataPost)
    }

    if (!serverPost) {
      load()
    }
  }, [])

  if (!post) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    )
  }

  return (
    <MainLayout title={`Post ${post.id}`}>
      <h1>{post.title}</h1>
      <hr />
      <p>{post.body}</p>
      <Link href={'/'}>
        <a>Go back to posts</a>
      </Link>
    </MainLayout>
  )
}

interface PostNextPageContext extends NextPageContext {
  query: {
    postId: string
  }
}

Post.getInitialProps = async ({ query, req }: PostNextPageContext) => {
  if (!req) {
    return { post: null }
  }

  const response = await axios.get(`${query.postId}`)
  const post: MyPost[] = await response.data

  return {
    post,
  }
}
