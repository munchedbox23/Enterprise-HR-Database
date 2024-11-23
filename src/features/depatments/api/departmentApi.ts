import { apiUrl } from "@/shared/const/apiUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DepartmentRecord } from "@/entities/staffing";

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl.baseUrl }),
  tagTypes: ["Department"],
  endpoints: (builder) => ({
    addDepartment: builder.mutation<
      DepartmentRecord,
      Omit<DepartmentRecord, "КодОтдела">
    >({
      query: (department) => ({
        url: "/add/department",
        method: "POST",
        body: JSON.stringify(department),
      }),
      invalidatesTags: [{ type: "Department", id: "LIST" }],
    }),
  }),
});

export const { useAddDepartmentMutation } = departmentApi;
  