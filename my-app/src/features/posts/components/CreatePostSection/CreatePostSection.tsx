import { useState } from "react"
import Input from "../../../../components/Input/Input"
import TextArea from "../../../../components/TextArea/TextArea"
import styles from "./CreatePostSection.module.css"
import Button from "../../../../components/Button/Button"
import { useCreatePostMutation } from "../../postsApiSlice"
import ActionButtons from "../../../../components/ActionButtons/ActionButtons"
import { useAppSelector } from "../../../../app/hooks"

const CreatePostSection = () => {
  const username = useAppSelector(state => state.user.username)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const isFormValid = title.trim() !== "" && content.trim() !== ""
  const [createPost, { isLoading, isSuccess, error, reset }] =
    useCreatePostMutation()

  return (
    <form
      className={styles.createPostSection}
      onSubmit={async (e: React.FormEvent) => {
        e.preventDefault()
        reset()
        if (title && content) {
          try {
            await createPost({ username, title, content }).unwrap()
            setTitle("")
            setContent("")
          } catch (err) {
            console.error("Failed to create post:", err)
          }
        }
      }}
    >
      <h2 className="heading">What's on your mind?</h2>
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
        value={content}
        onChange={e => {
          reset()
          setContent(e.target.value)
        }}
        placeholder="Content here"
      />
      <ActionButtons>
        <Button text="Create" disabled={!isFormValid} loading={isLoading} />
      </ActionButtons>
      <div
        className={`${styles.feedbackContainer} ${isSuccess || error ? styles.showFeedbackContainer : styles.hideFeedbackContainer}`}
      >
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
    </form>
  )
}

export default CreatePostSection
