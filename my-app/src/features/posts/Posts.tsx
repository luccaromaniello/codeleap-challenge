import type { JSX } from "react"
import styles from "./Posts.module.css"
import { useGetPostsQuery } from "./postsApiSlice"

export const Quotes = (): JSX.Element | null => {
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
        <div className={styles.header}>CodeLeap Network</div>
        <div className={styles.createPostSection}>
          <h2 className={styles.heading}>What's on your mind?</h2>
        </div>
        <div className={styles.postsSection}>
          {data.posts.map(({ id, title, body }) => (
            <blockquote key={id}>
              {title}
              <footer>
                <cite>{body}</cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    )
  }

  return null
}
