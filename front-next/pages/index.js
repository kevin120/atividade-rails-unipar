import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Counter from '../src/components/Counter'
import ROUTES from '../src/config/routes'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <div class="topnav">
        <p>
          <Link
            href={{
              pathname: ROUTES.articles.list,
            }}
          >
            <a>Articles</a>
          </Link>
        </p>

        <p>
          <Link
            href={{
              pathname: ROUTES.categories.list,
            }}
          >
            <a>Categories</a>
          </Link>
        </p>

        <p>
          <Link
            href={{
              pathname: ROUTES.users.list,
            }}
          >
            <a>Users</a>
          </Link>
        </p>
      </div>
      <h1 className={styles['title-red']}>Primeiro Projeto em Next.js</h1>
      <Counter />
    </>
  )
}
