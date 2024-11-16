import { lazy } from "react";

export const TimeSheetPageLazy = lazy(() =>
  import("./TimeSheetPage").then((module) => ({
    default: module.TimeSheetPage,
  }))
);
