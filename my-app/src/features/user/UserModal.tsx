import type React from "react"
import { useState } from "react"
import { closeModal, setUsername } from "./userSlice"
import styles from "./UserModal.module.css"
import Input from "../../components/Input/Input"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Button from "../../components/Button/Button"
import ActionButtons from "../../components/ActionButtons/ActionButtons"

const UserModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(state => state.user.isOpen)
  const [user, setUser] = useState("")
  const isFormValid = user.trim() !== ""

  const handleSubmit = () => {
    dispatch(setUsername(user))
    dispatch(closeModal())
  }

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ""}`}>
      <div
        className={styles.modalContent}
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <h1 className="heading">Welcome to CodeLeap network!</h1>
        <Input
          label="Please enter your username"
          name="user"
          value={user}
          onChange={e => {
            setUser(e.target.value)
          }}
          placeholder="John doe"
        />
        <ActionButtons>
          <Button text="ENTER" disabled={!isFormValid} onClick={handleSubmit} />
        </ActionButtons>
      </div>
    </div>
  )
}

export default UserModal
