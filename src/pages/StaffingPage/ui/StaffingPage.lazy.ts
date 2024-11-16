import { lazy } from "react";

export const StaffingPageLazy = lazy(() =>
  import("./StaffingPage").then((module) => ({
    default: module.StaffingPage,
  }))
);
