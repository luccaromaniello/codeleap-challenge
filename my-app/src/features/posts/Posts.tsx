import type { JSX } from "react"
import styles from "./Posts.module.css"
import { useGetPostsQuery } from "./postsApiSlice"
import CreatePostSection from "./components/CreatePostSection/CreatePostSection"
import Header from "../../components/Header/Header"
import PostContent from "./components/PostContent/PostContent"

export const Posts = (): JSX.Element | null => {
  const currentUser = "test98"
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
            {data.length != 0 ? (
              data.map(({ id, username, title, content, createdAt }) => (
                <div key={id}>
                  <Header title={title} editable={username === currentUser} />
                  <PostContent
                    author={username}
                    content={content}
                    date={createdAt}
                  />
                </div>
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
