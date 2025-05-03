import { useState } from "react"
import Input from "../../../../components/Input/Input"
import TextArea from "../../../../components/TextArea/TextArea"
import styles from "./CreatePostSection.module.css"
import Button from "../../../../components/Button/Button"

const CreatePostSection = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const isFormValid = title.trim() !== "" && content.trim() !== ""

  return (
    <div className={styles.createPostSection}>
      <h2 className={styles.heading}>What's on your mind?</h2>
      <Input
        label="Title"
        name="title"
        value={title}
        onChange={e => {
          setTitle(e.target.value)
        }}
        placeholder="Hello world"
      />
      <TextArea
        label="Content"
        name="content"
        value={content}
        onChange={e => {
          setContent(e.target.value)
        }}
        placeholder="Content here"
      />
      <div className={styles.actions}>
        <Button text="Create" disabled={!isFormValid} />
      </div>
    </div>
  )
}

export default CreatePostSection
