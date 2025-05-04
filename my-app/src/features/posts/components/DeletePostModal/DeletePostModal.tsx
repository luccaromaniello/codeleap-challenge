import type React from "react"
import styles from "./DeletePostModal.module.css"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import Button from "../../../../components/Button/Button"
import ActionButtons from "../../../../components/ActionButtons/ActionButtons"
import { useDeletePostMutation } from "../../postsApiSlice"
import { ButtonType } from "../../../../components/Button/Button"
import { closeModal } from "../../postsSlice"

const DeletePostModal: React.FC = () => {
  const postId = useAppSelector(state => state.posts.postId)
  const [deletePost, { isLoading, reset }] = useDeletePostMutation()
  const isOpen = useAppSelector(state => state.posts.isOpen)
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
            await deletePost(postId).unwrap()
            dispatch(closeModal())
          } catch (err) {
            console.error("Failed to delete post:", err)
          }
        }}
      >
        <h1 className="heading">Are you sure you want to delete this item?</h1>
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
            type={ButtonType.DESTRUCTIVE}
            text="Delete"
            loadingText="Deleting"
            loading={isLoading}
          />
        </ActionButtons>
      </form>
    </div>
  )
}

export default DeletePostModal
