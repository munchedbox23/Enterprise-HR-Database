export type { Employee, EmployeePosition } from "./model/types";
export { employeesApi } from "./api/employeeApi";
export {
  useGetEmployeesQuery,
  useAddEmployeeMutation,
  useGetEmployeePositionQuery,
} from "./api/employeeApi";
