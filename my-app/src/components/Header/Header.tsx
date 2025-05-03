import styles from "./Header.module.css"
import deleteIcon from "../../assets/icons/delete.svg"
import editIcon from "../../assets/icons/edit.svg"
import { useAppDispatch } from "../../app/hooks"
import Button from "../Button/Button"
import { setUsername } from "../../features/user/userSlice"

type HeaderProps = {
  title: string
  type?: HeaderType
  editable?: boolean
}

enum HeaderType {
  SECTION = 0,
  PAGE = 1,
}

const Header: React.FC<HeaderProps> = ({
  title,
  type = HeaderType.SECTION,
  editable = false,
}) => {
  const dispatch = useAppDispatch()

  return (
    <div
      className={`${styles.header} ${type == HeaderType.SECTION ? styles.postHeader : styles.pageHeader}`}
    >
      <div className={styles.titleContainer}>
        <div>{title}</div>
        {type == HeaderType.PAGE ? (
          <Button
            type={1}
            text="Sign out"
            onClick={() => dispatch(setUsername(""))}
          />
        ) : (
          ""
        )}
      </div>
      {type == HeaderType.SECTION && editable ? (
        <div className={styles.actions}>
          <img
            className={styles.actionIcons}
            src={deleteIcon}
            alt="Delete action"
          />
          <img
            className={styles.actionIcons}
            src={editIcon}
            alt="Edit action"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default Header
