import type React from "react"
import { useState } from "react"
import styles from "./UserModal.module.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Button from "../../components/Button/Button"
import ActionButtons from "../../components/ActionButtons/ActionButtons"
import { useDeletePostMutation } from "../../postsApiSlice"

type DeletePostModalProps = {
  postId: number
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({ postId }) => {
  const [deletePost, { isLoading, isSuccess, error, reset }] =
    useDeletePostMutation()
  const isOpen = useAppSelector(state => state.posts.isOpen)

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
          } catch (err) {
            console.error("Failed to delete post:", err)
          }
        }}
      >
        <h1 className="heading">Are you sure you want to delete this item?</h1>
        <ActionButtons>
          <Button text="ENTER" disabled={!isFormValid} onClick={handleSubmit} />
        </ActionButtons>
      </form>
    </div>
  )
}

export default DeletePostModal
