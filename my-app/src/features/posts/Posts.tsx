import type { JSX } from "react"
import styles from "./Posts.module.css"
import { useGetPostsQuery } from "./postsApiSlice"
import CreatePostSection from "./components/CreatePostSection/CreatePostSection"
import Header from "../../components/Header/Header"
import Post from "./components/Post/Post"

export const Posts = (): JSX.Element | null => {
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
        <Header title="CodeLeap Network" />
        <div className={styles.content}>
          <CreatePostSection />
          <div className={styles.postsSection}>
            {data.length != 0 ? (
              data.map(({ id, username, title, content, createdAt }) => (
                <Post
                  key={id}
                  post={{
                    id: id,
                    username: username,
                    title: title,
                    content: content,
                    createdAt: createdAt,
                  }}
                />
              ))
            ) : (
              <p>No posts to show.</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return null
}
