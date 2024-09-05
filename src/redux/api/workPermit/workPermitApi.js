import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const workPermit = createApi({
  reducerPath: "workPermitAPI",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
  tagTypes: ["workPermit"],
  endpoints: (builder) => ({
    createWorkPermit: builder.mutation({
      query: (payload) => {
        return {
          url: `/work-permit`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["workPermit"],
    }),

    getAllWorkPermit: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();

        filters.forEach((filter) => {
          params.append(filter?.name, filter?.value);
        });

        return {
          url: `/work-permit`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["workPermit"],
    }),

    getSingleWorkPermit: builder.query({
      query: (id) => `/work-permit/${id}`,
    }),

    updateWorkPermit: builder.mutation({
      query: (payload) => {
        return {
          url: `/work-permit/${payload._id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["workPermit"],
    }),

    deleteWorkPermit: builder.mutation({
      query: (id) => {
        return {
          url: `/work-permit/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["workPermit"],
    }),
  }),
});

export const {
  useCreateWorkPermitMutation,
  useGetAllWorkPermitQuery,
  useGetSingleWorkPermitQuery,
  useLazyGetSingleWorkPermitQuery,
  useUpdateWorkPermitMutation,
  useDeleteWorkPermitMutation,
} = workPermit;
