import type React from "react"
import styles from "./EditPostModal.module.css"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import Button from "../../../../components/Button/Button"
import ActionButtons from "../../../../components/ActionButtons/ActionButtons"
import { postsApiSlice, useEditPostMutation } from "../../postsApiSlice"
import { ButtonType } from "../../../../components/Button/Button"
import { closeModal } from "../../postsSlice"
import Input from "../../../../components/Input/Input"
import TextArea from "../../../../components/TextArea/TextArea"
import { useState } from "react"

const EditPostModal: React.FC = () => {
  const postId = useAppSelector(state => state.posts.postId)
  const post = useAppSelector(
    state => postsApiSlice.endpoints.getPosts.select()(state)?.data ?? [],
  ).find(p => p.id === postId)
  const [editPost, { isLoading, reset }] = useEditPostMutation()
  const isOpen = useAppSelector(state => state.posts.isOpen)
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState(post?.title ?? "")
  const [content, setContent] = useState(post?.content ?? "")
  const isFormValid = title.trim() !== "" && content.trim() !== ""

  return (
    <div
      className={`${styles.modalOverlay} ${isOpen ? styles.open : ""}`}
      onClick={e => {
        e.stopPropagation()
      }}
    >
      <form
        className={styles.modalContent}
        onClick={e => {
          e.stopPropagation()
        }}
        onSubmit={async (e: React.FormEvent) => {
          e.preventDefault()
          reset()
          try {
            await editPost({
              id: postId,
              title: title,
              content: content,
            }).unwrap()
            dispatch(closeModal())
          } catch (err) {
            console.error("Failed to edit post:", err)
          }
        }}
      >
        <h1 className="heading">Edit item</h1>
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
          <Button
            semanticType="button"
            type={ButtonType.SECONDARY}
            text="Cancel"
            onClick={() => {
              dispatch(closeModal())
            }}
          />
          <Button
            type={ButtonType.SUCCESS}
            text="Save"
            loadingText="Saving"
            loading={isLoading}
            disabled={!isFormValid}
          />
        </ActionButtons>
      </form>
    </div>
  )
}

export default EditPostModal
