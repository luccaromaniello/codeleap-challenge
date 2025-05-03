import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

type UserState = {
  isOpen: boolean
  username: string
}

const initialState: UserState = {
  isOpen: false,
  username: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true
    },
    closeModal(state) {
      state.isOpen = false
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload
    },
  },
})

export const { openModal, closeModal, setUsername } = userSlice.actions
