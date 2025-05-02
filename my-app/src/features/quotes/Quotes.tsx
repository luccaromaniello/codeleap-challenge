import type { JSX } from "react"
import { useState } from "react"
import styles from "./Quotes.module.css"
import { useGetQuotesQuery } from "./quotesApiSlice"

export const Quotes = (): JSX.Element | null => {
  const [numberOfQuotes, setNumberOfQuotes] = useState(10)
  // Using a query hook automatically fetches data and returns query values
  const { data, isError, isLoading, isSuccess } =
    useGetQuotesQuery(numberOfQuotes)

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
        {data.posts.map(({ id, title, body }) => (
          <blockquote key={id}>
            {title}
            <footer>
              <cite>{body}</cite>
            </footer>
          </blockquote>
        ))}
      </div>
    )
  }

  return null
}
