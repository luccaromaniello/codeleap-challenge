import styles from "./PostContent.module.css"
import { timeAgo } from "../../../../utils/math"

type PostContentProps = {
  content: string
  author?: string
  date?: string
}

const PostContent: React.FC<PostContentProps> = ({ content, author, date }) => {
  return (
    <div className={styles.postContent}>
      <div className={styles.contentHeader}>
        <span className={styles.author}>@{author}</span>
        <span className={styles.date}>{timeAgo(date ?? "")}</span>
      </div>
      <p className={styles.bodyContent}> {content}</p>
    </div>
  )
}

export default PostContent
