import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Vacation } from "../model/types";
import { apiUrl } from "@/shared/const/apiUrl";

export const vacationApi = createApi({
  reducerPath: "vacationApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl.baseUrl }),
  tagTypes: ["Vacation"],
  endpoints: (builder) => ({
    getVacations: builder.query<Vacation[], void>({
      query: () => "/get/vacation",
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ НомерЗаписи }) =>
                  ({ type: "Vacation", id: НомерЗаписи }) as const
              ),
              { type: "Vacation", id: "LIST" },
            ]
          : [{ type: "Vacation", id: "LIST" }],
    }),
    addVacation: builder.mutation<Vacation, Omit<Vacation, "НомерЗаписи">>({
      query: (vacation) => ({
        url: "/add/vacation",
        method: "POST",
        body: JSON.stringify(vacation),
      }),
      invalidatesTags: [{ type: "Vacation", id: "LIST" }],
    }),
  }),
});

export const { useGetVacationsQuery, useAddVacationMutation } = vacationApi;