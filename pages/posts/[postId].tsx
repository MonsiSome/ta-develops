import { useRouter } from 'next/router'
import { MainLayout } from '../../components/MainLayout'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { NextPageContext } from 'next'
import { PostStructure } from '../../interfaces/posts'
import axios from '../../axios/axios'
import styled from 'styled-components/macro'

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

interface PostPageProps {
  post: PostStructure
}

export default function Post({ post: serverPost }: PostPageProps) {
  const [post, setPost] = useState(serverPost)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const response = await axios.get(`${router.query.postId}?_embed=comments`)
      const dataPost: PostStructure = await response.data
      setPost(dataPost)
    }

    if (!serverPost) {
      load()
    }
  })

  if (!post) {
    return (
      <MainLayout>
        <Loading>Loading...</Loading>
      </MainLayout>
    )
  }

  return (
    <MainLayout title={`Post ${post.id}`}>
      <Article>
        <h1>{post.title}</h1>
        <hr />
        <p>{post.body}</p>
        <Section>
          <h3>Comments</h3>
          {!!post.comments.length ? (
            <ul>
              {post.comments.map((comment) => (
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
  const post: PostStructure[] = await response.data

  return {
    post,
  }
}
