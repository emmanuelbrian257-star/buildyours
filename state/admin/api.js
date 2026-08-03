import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Blogs"],
  endpoints: (build) => ({
    getBlogs: build.query({
      query: () => "",
      provideTags: ["Blogs"],
    }),
  }),
});

export const { useGetBlogsQuery } = api;
