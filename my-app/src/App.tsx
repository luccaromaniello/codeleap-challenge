import "./App.css"
import { useEffect, type JSX } from "react"
import { Posts } from "./features/posts/Posts"
import { openModal } from "./features/user/userSlice"
import UserModal from "./features/user/UserModal"
import { useAppDispatch, useAppSelector } from "./app/hooks"

export const App = (): JSX.Element | null => {
  const dispatch = useAppDispatch()
  const username = useAppSelector(state => state.user.username)

  useEffect(() => {
    if (!username) {
      dispatch(openModal())
    }
  }, [username, dispatch])

  return (
    <div className="App">
      <header className="App-header">
        <Posts />
        <UserModal />
      </header>
    </div>
  )
}
