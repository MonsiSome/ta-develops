import {useRouter} from 'next/router'
import { MainLayout } from '../../components/MainLayout'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { NextPageContext } from 'next'
import { MyPost } from '../../interfaces/posts'

interface PostPageProps {
  post: MyPost
}

export default function Post( {post: serverPost}: PostPageProps ) {
  const [post, setPost] = useState(serverPost)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const response = await fetch(`https://simple-blog-api.crew.red/posts/${router.query.postId}`)
      const data = await response.json()
      setPost(data)
    }
    
    if(!serverPost) {
      load()
    }
  }, [])
  
  if(!post){
    return <MainLayout>
      <p>Loading...</p>
    </MainLayout>
  }

  return (
    <MainLayout title={`Post ${post.id}`}>
      <h1>{post.title}</h1>
      <hr/>
      <p>{post.body}</p>
      <Link href={'/'}><a>Go back to posts</a></Link>
    </MainLayout>
  )
}

interface PostNextPageContext extends NextPageContext {
  query: {
    id: string
  }
}

Post.getInitialProps = async({ query, req }: PostNextPageContext) => {
  if(!req) {
    return { post : null };
  } 
 
  const response = await fetch(`https://simple-blog-api.crew.red/posts/${query.postId}`)
  const post: MyPost[] = await response.json()

  return {
    post
  }
}