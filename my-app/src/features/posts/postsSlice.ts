import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

type ModalPostState = {
  isOpen: boolean
  type: ModalType
  postId: number
}

export enum ModalType {
  EDIT = 0,
  DELETE = 1,
}

const initialState: ModalPostState = {
  type: ModalType.EDIT,
  isOpen: false,
  postId: 0,
}

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    openModal(
      state,
      action: PayloadAction<{ type: ModalType; postId: number }>,
    ) {
      state.isOpen = true
      state.type = action.payload.type
      state.postId = action.payload.postId
    },
    closeModal() {
      return initialState
    },
  },
})

export const { openModal, closeModal } = postsSlice.actions
