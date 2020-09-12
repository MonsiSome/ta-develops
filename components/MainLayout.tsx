import Link from 'next/link'
import Head from 'next/head'
import styled from 'styled-components/macro'

const Nav = styled.nav`
  position: fixed;
  height: 60px;
  left: 0;
  top: 0;
  right: 0;
  background: rgba(126, 88, 246, 1);
`

const Ul = styled.ul`
  display: flex;
  width: 72%;
  padding: 0 1em;
  margin: 0 auto;
  list-style: none;
  > li {
    width: 100px;
    padding: 0 0.2em;
    text-align: start;
    text-transform: uppercase;
  }
`

const Anchor = styled.a`
  display: inline-block;
  padding: 1.3em 0;
  width: 100%;
  text-decoration: none;
  color: #fff;
  &:hover {
    border-bottom: 1px rgb(116, 44, 250) solid;
    cursor: pointer;
  }
  &:visited {
    text-decoration: none;
    color: #fff;
  }
`

const Main = styled.main`
  margin-top: 60px;
  padding: 3em 1.5em;
  width: 60%;
`

export function MainLayout({ children, title = 'Blog MVP' }) {
  return (
    <>
      <Head>
        <title>{title} | TA</title>
        <meta name="keywords" content="blog, mvp, comments" />
        <meta name="description" content="This is Blog App MVP" />
        <meta charSet="utf-8" />
      </Head>
      <Nav>
        <Ul>
          <li>
            <Link href={'/'}>
              <Anchor>Home</Anchor>
            </Link>
          </li>
          <li>
            <Link href={'/posts/createPost'}>
              <Anchor>New Post</Anchor>
            </Link>
          </li>
        </Ul>
      </Nav>
      <Main>{children}</Main>
    </>
  )
}
