import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "@/shared/const/apiUrl";
import { SalaryRecord } from "../model/types";

export const salaryApi = createApi({
  reducerPath: "salaryApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl.baseUrl }),
  tagTypes: ["Salary"],
  endpoints: (builder) => ({
    getSalary: builder.query<SalaryRecord[], void>({
      query: () => "/get/payroll-sheet",
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ НомерЗаписи }) =>
                  ({ type: "Salary", id: НомерЗаписи }) as const
              ),
              { type: "Salary", id: "LIST" },
            ]
          : [{ type: "Salary", id: "LIST" }],
    }),
    addSalary: builder.mutation<
      SalaryRecord,
      Omit<SalaryRecord, "НомерЗаписи">
    >({
      query: (salary) => ({
        url: "/add/payroll-sheet",
        method: "POST",
        body: JSON.stringify(salary),
      }),
      invalidatesTags: ["Salary"],
    }),
  }),
});

export const { useGetSalaryQuery, useAddSalaryMutation } = salaryApi;
