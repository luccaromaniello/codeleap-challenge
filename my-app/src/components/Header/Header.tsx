import styles from "./Header.module.css"
import deleteIcon from "../../assets/icons/delete.svg"
import editIcon from "../../assets/icons/edit.svg"

type HeaderProps = {
  title: string
  type?: HeaderType
}

enum HeaderType {
  SECTION = 0,
  PAGE = 1,
}

const Header: React.FC<HeaderProps> = ({
  title,
  type = HeaderType.SECTION,
}) => {
  return (
    <div
      className={`${styles.header} ${type == HeaderType.SECTION ? styles.postHeader : styles.pageHeader}`}
    >
      {title}
      {type == HeaderType.SECTION ? (
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
