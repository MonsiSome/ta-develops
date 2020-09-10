import Link from "next/link";
import Head from "next/head";

export function MainLayout({ children, title='Blog MVP' }) {
  return (
    <>
      <Head>
        <title>{title} | TA</title>
        <meta name="keywords" content="blog, mvp, comments" />
        <meta name="description" content="This is Blog App MVP" />
        <meta charSet="utf-8" />
      </Head>
      <nav>
        <Link href={'/'}><a>Home</a></Link>
        <Link href={'/posts/newPost'}><a>New Post</a></Link>
      </nav>
      <main>
        {children}
      </main>
      <style jsx>{`
        nav {
          position: fixed;
          height: 60px;
          left: 0;
          top: 0;
          right: 0;
          background: darkblue;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        nav a {
          color: #fff;
          text-decoration: none;
        }

        main {
          margin-top: 60px;
          padding: 1rem;
        }
      `}</style>
    </>
  )
}