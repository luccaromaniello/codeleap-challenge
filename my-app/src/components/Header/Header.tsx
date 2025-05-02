import styles from "./Header.module.css"

type HeaderProps = {
  title: string
  type?: HeaderType
}

enum HeaderType {
  SECTION = 0,
  PAGE = 1,
}

const Header: React.FC<HeaderProps> = ({ title, type = 0 }) => {
  return (
    <div
      className={`${styles.header} ${type == HeaderType.SECTION ? styles.postHeader : styles.pageHeader}`}
    >
      {title}
    </div>
  )
}

export default Header
