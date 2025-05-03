import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

type ModalPostState = {
  isOpen: boolean
  type: PostType
  postId: number
}

enum PostType {
  EDIT = 0,
  DELETE = 1,
}

const initialState: ModalPostState = {
  type: PostType.EDIT,
  isOpen: false,
  postId: 0,
}

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true
    },
    closeModal(state) {
      state.isOpen = false
    },
    setPostId(state, action: PayloadAction<number>) {
      state.postId = action.payload
    },
  },
})

export const { openModal, closeModal, setPostId } = postsSlice.actions
