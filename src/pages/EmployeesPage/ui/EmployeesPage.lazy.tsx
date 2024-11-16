import { lazy } from "react";

export const EmployeesPageLazy = lazy(() =>
  import("./EmployeesPage").then((module) => ({
    default: module.EmployeesPage,
  }))
);
