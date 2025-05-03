// import styles from "./Header.module.css"
import { useAppDispatch } from "../../app/hooks"
import Button from "../Button/Button"
import { setUsername } from "../../features/user/userSlice"

type HeaderProps = {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const dispatch = useAppDispatch()

  return (
    <div className="content-header">
      <div className="header-title-container">
        <div>{title}</div>
        <Button
          type={1}
          text="Sign out"
          onClick={() => dispatch(setUsername(""))}
        />
      </div>
    </div>
  )
}

export default Header
