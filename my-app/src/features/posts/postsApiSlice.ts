import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

type Posts = Post[]

export type Post = {
  id: number
  username: string
  title: string
  content: string
  createdAt: string
}

type ApiPost = {
  id: number
  username: string
  title: string
  content: string
  created_datetime: string
}

type UpdatePost = {
  id: string
  title: string
  content: string
}

type NewPost = {
  username: string
  title: string
  content: string
}

// This is not being used in this example since we're only worried about the posts list. Ideally, the response might contain other information that could be mapped.
// type PostsApiResponse = {
//   results: ApiPost[]
//   total: number
//   skip: number
//   limit: number
// }

export const postsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://dev.codeleap.co.uk/careers/" }),
  reducerPath: "postsApi",
  tagTypes: ["Posts"],
  endpoints: build => ({
    getPosts: build.query<Posts, void>({
      query: () => "",
      transformResponse: (response: { results: ApiPost[] }): Posts => {
        return response.results.map(responsePost => ({
          id: responsePost.id,
          username: responsePost.username,
          title: responsePost.title,
          content: responsePost.content,
          createdAt: responsePost.created_datetime, // Map "created_datetime" to "createdAt"
        }))
      },
      providesTags: () => [{ type: "Posts", id: "LIST" }],
    }),
    createPost: build.mutation<Post, NewPost>({
      query: newPost => ({
        url: "/",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    deletePost: build.mutation<undefined, number>({
      query: postId => ({
        url: "/" + postId.toString() + "/",
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    editPost: build.mutation<undefined, UpdatePost>({
      query: post => ({
        url: "/" + post.id.toString() + "/",
        method: "PATCH",
        body: {
          title: post.title,
          content: post.content,
        },
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useEditPostMutation,
} = postsApiSlice
