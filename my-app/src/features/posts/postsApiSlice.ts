import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

type Post = {
  id: number
  title: string
  body: string
}

type NewPost = {
  userId: string
  title: string
  body: string
}

type PostsApiResponse = {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

// Define a service using a base URL and expected endpoints
export const postsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/posts" }),
  reducerPath: "postsApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Posts"],
  endpoints: build => ({
    getPosts: build.query<PostsApiResponse, void>({
      query: () => "",
      providesTags: (_result, _error, id) => [{ type: "Posts", id }],
    }),
    createPost: build.mutation<Post, NewPost>({
      query: newPost => ({
        url: "/add",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
  }),
})

export const { useGetPostsQuery, useCreatePostMutation } = postsApiSlice
