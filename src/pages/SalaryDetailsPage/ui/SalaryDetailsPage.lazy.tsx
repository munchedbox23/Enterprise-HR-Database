import { lazy } from "react";

export const SalaryDetailsPageLazy = lazy(() =>
  import("./SalaryDetailsPage").then((module) => ({
    default: module.SalaryDetailsPage,
  }))
);
