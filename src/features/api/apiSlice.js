import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000",
    }),
    tagTypes: ['Videos', 'Video', 'RelatedVideo'],
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => '/videos',
            providesTags: ['Videos'],
            keepUnusedDataFor: 600
        }),
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`,
            providesTags: (result, error, arg) => [{ type: 'Video', id: arg }]
        }),
        addVideo: builder.mutation({
            query: (data) => ({
                url: '/videos',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Videos']
        }),
        getRelatedVideos: builder.query({
            query: ({ id, title }) => {
                let queryString = ''
                const titleArray = title.split(' ')
                const string = titleArray.map(word => `title_like=${word}`).join('&')
                queryString = `/videos?${string}&limit_=3`
                return queryString
            },
            providesTags: (result, error, arg) => [{ type: 'RelatedVideos', id: arg.id }]
        }),
        editVideo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: (result, error, arg) => ['Videos', { type: 'Video', id: arg.id }, { type: 'RelatedVideos', id: arg.id }]
        }),
        deleteVideo: builder.mutation({
            query: (videoId) => ({
                url: `/videos/${videoId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Videos']
        }),
    }),
});

export const { useEditVideoMutation, useAddVideoMutation, useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery, useDeleteVideoMutation } = apiSlice