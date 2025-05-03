import { useState } from "react"
import Input from "../../../../components/Input/Input"
import TextArea from "../../../../components/TextArea/TextArea"
import styles from "./CreatePostSection.module.css"
import Button from "../../../../components/Button/Button"
import { useCreatePostMutation } from "../../postsApiSlice"

const CreatePostSection = () => {
  const [userId, setUserId] = useState(3)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [body, setBody] = useState("")
  const isFormValid = title.trim() !== "" && content.trim() !== ""
  const [createPost, { isLoading, isSuccess, error, reset }] =
    useCreatePostMutation()

  return (
    <form
      className={styles.createPostSection}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={async (e: React.FormEvent) => {
        e.preventDefault()
        reset()
        if (title && body) {
          try {
            await createPost({ userId, title, body }).unwrap()
            setTitle("")
            setBody("")
          } catch (err) {
            console.error("Failed to create post:", err)
          }
        }
      }}
    >
      <h2 className={styles.heading}>What's on your mind?</h2>
      <Input
        label="Title"
        name="title"
        value={title}
        onChange={e => {
          reset()
          setTitle(e.target.value)
        }}
        placeholder="Hello world"
      />
      <TextArea
        label="Content"
        name="content"
        value={body}
        onChange={e => {
          reset()
          setBody(e.target.value)
          setContent(e.target.value)
        }}
        placeholder="Content here"
      />
      <div className={styles.actions}>
        <div>
          {isSuccess && (
            <p className={`${styles.feedback} ${styles.feedbackSuccess}`}>
              ✅ Post created!
            </p>
          )}
          {error && (
            <p className={`${styles.feedback} ${styles.feedbackError}`}>
              ❌ Failed to create post.
            </p>
          )}
        </div>
        <Button text="Create" disabled={!isFormValid} loading={isLoading} />
      </div>
    </form>
  )
}

export default CreatePostSection
