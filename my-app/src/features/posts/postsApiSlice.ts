import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

type Post = {
  id: number
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
    // Supply generics for the return type (in this case `QuotesApiResponse`)
    // and the expected query argument. If there is no argument, use `void`
    // for the argument type instead.
    getPosts: build.query<PostsApiResponse, void>({
      query: () => "",
      providesTags: (_result, _error, id) => [{ type: "Posts", id }],
    }),
  }),
})

export const { useGetPostsQuery } = postsApiSlice
