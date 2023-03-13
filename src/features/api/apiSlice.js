import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000",
    }),
    tagTypes: ['videos'],
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => '/videos',
            providesTags: ['videos'],
            keepUnusedDataFor: 600
        }),
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`
        }),
        addVideo: builder.mutation({
            query: (data) => ({
                url: '/videos',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['videos']
        }),
        getRelatedVideos: builder.query({
            query: ({ id, title }) => {
                let queryString = ''
                const titleArray = title.split(' ')
                const string = titleArray.map(word => `title_like=${word}`).join('&')
                queryString = `/videos?${string}&limit_=3`
                return queryString

            }
        })
    }),
});

export const { useAddVideoMutation, useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery } = apiSlice