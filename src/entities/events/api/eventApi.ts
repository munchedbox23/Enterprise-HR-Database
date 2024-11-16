import { apiUrl } from "@/shared/const/apiUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Event } from "../model/types";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl.baseUrl }),
  tagTypes: ["Event"],
  endpoints: (builder) => ({
    getEvent: builder.query<Event[], void>({
      query: () => "/get/personnel-event",
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ НомерСобытия }) =>
                  ({ type: "Event", id: НомерСобытия }) as const
              ),
              { type: "Event", id: "LIST" },
            ]
          : [{ type: "Event", id: "LIST" }],
    }),
    addEvent: builder.mutation<Event, Omit<Event, "НомерСобытия">>({
      query: (event) => ({
        url: "/add/personnel-event",
        method: "POST",
        body: JSON.stringify(event),
      }),
      invalidatesTags: [{ type: "Event", id: "LIST" }],
    }),
  }),
});

export const {
  useGetEventQuery,
  useAddEventMutation,
} = eventApi;
