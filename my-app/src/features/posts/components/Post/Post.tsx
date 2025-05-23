import { ModalType, openModal } from "../../postsSlice"
import { type Post as PostInfo } from "../../postsApiSlice"
import PostContent from "../PostContent/PostContent"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import styles from "./Post.module.css"
import deleteIcon from "../../../../assets/icons/delete.svg"
import editIcon from "../../../../assets/icons/edit.svg"
import DeletePostModal from "../DeletePostModal/DeletePostModal"
import EditPostModal from "../EditPostModal/EditPostModal"

type PostProps = {
  post: PostInfo
}

const Post: React.FC<PostProps> = ({ post }) => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(state => state.user.username)
  const modal = useAppSelector(state => state.posts)

  return (
    <div>
      <div className={`content-header ${styles.postHeader}`}>
        <div>{post.title}</div>
        {post.username === currentUser ? (
          <div className={styles.actions}>
            <button
              className={styles.actionButton}
              onClick={() => {
                dispatch(openModal({ type: ModalType.DELETE, postId: post.id }))
              }}
            >
              <img
                className={styles.actionIcons}
                src={deleteIcon}
                alt="Delete action"
              />
            </button>
            <button
              className={styles.actionButton}
              onClick={() => {
                dispatch(openModal({ type: ModalType.EDIT, postId: post.id }))
              }}
            >
              <img
                className={styles.actionIcons}
                src={editIcon}
                alt="Edit action"
              />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <PostContent
        author={post.username}
        content={post.content}
        date={post.createdAt}
      />
      {modal.isOpen && modal.type === ModalType.DELETE && <DeletePostModal />}
      {modal.isOpen && modal.type === ModalType.EDIT && <EditPostModal />}
    </div>
  )
}

export default Post
