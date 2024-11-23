import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "@/shared/const/apiUrl";
import { TimeSheetRecord } from "../model/types";

export const timeSheetApi = createApi({
  reducerPath: "timeSheetApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl.baseUrl }),
  tagTypes: ["TimeSheet"],
  endpoints: (builder) => ({
    getTimeSheet: builder.query<TimeSheetRecord[], void>({
      query: () => "/get/time-sheet",
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ НомерЗаписи }) =>
                  ({ type: "TimeSheet", id: НомерЗаписи }) as const
              ),
              { type: "TimeSheet", id: "LIST" },
            ]
          : [{ type: "TimeSheet", id: "LIST" }],
    }),
    addTimeSheet: builder.mutation<
      TimeSheetRecord,
      Omit<TimeSheetRecord, "НомерЗаписи">
    >({
      query: (timeSheet) => ({
        url: "/add/time-sheet",
        method: "POST",
        body: JSON.stringify(timeSheet),
      }),
      invalidatesTags: [{ type: "TimeSheet", id: "LIST" }],
    }),
    updateTimeSheet: builder.mutation<
      TimeSheetRecord,
      { timeSheet: Omit<TimeSheetRecord, "НомерЗаписи">; id: string }
    >({
      query: ({ timeSheet, id }) => ({
        url: `/update/time-sheet/${id}`,
        method: "PUT",
        body: JSON.stringify(timeSheet),
      }),
      invalidatesTags: [{ type: "TimeSheet", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTimeSheetQuery,
  useAddTimeSheetMutation,
  useUpdateTimeSheetMutation,
} = timeSheetApi;
