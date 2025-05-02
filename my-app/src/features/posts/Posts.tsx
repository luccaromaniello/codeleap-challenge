import type { JSX } from "react"
import styles from "./Posts.module.css"
import { useGetPostsQuery } from "./postsApiSlice"
import CreatePostSection from "./components/CreatePostSection/CreatePostSection"
import Header from "../../components/Header/Header"

export const Posts = (): JSX.Element | null => {
  // Using a query hook automatically fetches data and returns query values
  const { data, isError, isLoading, isSuccess } = useGetPostsQuery()

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className={styles.container}>
        <Header title="CodeLeap Network" type={1} />
        <div className={styles.content}>
          <CreatePostSection />
          <div className={styles.postsSection}>
            {data.posts.map(({ id, title, body }) => (
              <blockquote key={id}>
                <Header title={title} />
                <footer>
                  <cite>{body}</cite>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return null
}
