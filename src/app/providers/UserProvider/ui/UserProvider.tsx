import React, { createContext, useContext, useEffect } from "react";
import { useAppSelector } from "@/app/providers/StoreProvider";
import { useGetEmployeesQuery } from "@/entities/employee";
import { useGetDepartmentQuery } from "@/entities/staffing";
import { useGetStaffingQuery } from "@/entities/staffing";
import { useGetTimeSheetQuery } from "@/entities/time-sheet";
import { IUserWithRole } from "@/entities/user";
import { useGetVacationsQuery } from "@/entities/vacation";
import { useGetEventQuery } from "@/entities/events";
import { useGetSalaryQuery } from "@/entities/salary";

const UserContext = createContext<IUserWithRole | null>(null);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.user.user);
  const { refetch: refetchEmployees } = useGetEmployeesQuery();
  const { refetch: refetchDepartments } = useGetDepartmentQuery();
  const { refetch: refetchStaffing } = useGetStaffingQuery();
  const { refetch: refetchTimeSheet } = useGetTimeSheetQuery();
  const { refetch: refetchVacations } = useGetVacationsQuery();
  const { refetch: refetchEvent } = useGetEventQuery();
  const { refetch: refetchSalary } = useGetSalaryQuery();

  useEffect(() => {
    refetchEmployees();
    refetchDepartments();
    refetchStaffing();
    refetchTimeSheet();
    refetchVacations();
    refetchEvent();
    refetchSalary();
  }, [user?.role, refetchEmployees, refetchDepartments, refetchEvent]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export const useUser = () => useContext(UserContext);
