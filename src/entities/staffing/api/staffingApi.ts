import { apiUrl } from "@/shared/const/apiUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StaffingRecord, DepartmentRecord } from "../model/types";

export const staffingApi = createApi({
  reducerPath: "staffingApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl.baseUrl }),
  tagTypes: ["Staffing", "Department"],
  endpoints: (builder) => ({
    getStaffing: builder.query<StaffingRecord[], void>({
      query: () => "/get/staffing-table",
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ IdРасписания }) =>
                  ({ type: "Staffing", id: IdРасписания }) as const
              ),
              { type: "Staffing", id: "LIST" },
            ]
          : [{ type: "Staffing", id: "LIST" }],
    }),
    getDepartment: builder.query<DepartmentRecord[], void>({
      query: () => "/get/department",
      providesTags: ["Department"],
    }),
    addStaffing: builder.mutation<
      StaffingRecord,
      Omit<StaffingRecord, "IdРасписания">
    >({
      query: (staffing) => ({
        url: "/add/staffing-table",
        method: "POST",
        body: JSON.stringify(staffing),
      }),
      invalidatesTags: [{ type: "Staffing", id: "LIST" }],
    }),
    updateStaffing: builder.mutation<
      StaffingRecord,
      { staffing: Omit<StaffingRecord, "IdРасписания">; id: string }
    >({
      query: ({ staffing, id }) => ({
        url: `/update/staffing-table/${id}`,
        method: "PUT",
        body: JSON.stringify(staffing),
      }),
      invalidatesTags: [{ type: "Staffing", id: "LIST" }],
    }),
  }),
});

export const {
  useGetStaffingQuery,
  useGetDepartmentQuery,
  useAddStaffingMutation,
  useUpdateStaffingMutation,
} = staffingApi;
