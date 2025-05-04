import type React from "react"
import styles from "./EditPostModal.module.css"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import Button from "../../../../components/Button/Button"
import ActionButtons from "../../../../components/ActionButtons/ActionButtons"
import { useEditPostMutation } from "../../postsApiSlice"
import { ButtonType } from "../../../../components/Button/Button"
import { closeModal } from "../../postsSlice"
import { useState } from "react"

const EditPostModal: React.FC = () => {
  const postId = useAppSelector(state => state.posts.postId)
  const [editPost, { isLoading, reset }] = useEditPostMutation()
  const isOpen = useAppSelector(state => state.posts.isOpen)
  const modalType = useAppSelector(state => state.posts.type)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const dispatch = useAppDispatch()

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
          />
        </ActionButtons>
      </form>
    </div>
  )
}

export default EditPostModal
