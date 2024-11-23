export type { Employee, EmployeePosition, EmployeeValueTypes } from "./model/types";
export { employeesApi } from "./api/employeeApi";
export {
  useGetEmployeesQuery,
  useAddEmployeeMutation,
  useGetEmployeePositionQuery,
  useUpdateEmployeeMutation,
} from "./api/employeeApi";
