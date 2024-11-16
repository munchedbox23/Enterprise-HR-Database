import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Employee, EmployeePosition } from "../model/types";
import { apiUrl } from "@/shared/const/apiUrl";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl.baseUrl,
  }),
  tagTypes: ["Employee"],
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => "/get/employee",
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ IdСотрудника }) =>
                  ({ type: "Employee", id: IdСотрудника }) as const
              ),
              { type: "Employee", id: "LIST" },
            ]
          : [{ type: "Employee", id: "LIST" }],
    }),
    getEmployeePosition: builder.query<EmployeePosition[], void>({
      query: () => "/get/job-title",
    }),
    addEmployee: builder.mutation<Employee, Omit<Employee, "IdСотрудника">>({
      query: (employee) => ({
        url: "/add/employee",
        method: "POST",
        body: JSON.stringify(employee),
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useAddEmployeeMutation,
  useGetEmployeePositionQuery,
} = employeesApi;
