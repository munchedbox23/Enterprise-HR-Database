import { lazy } from "react";

export const PesonalEventPageLazy = lazy(() =>
  import("./PesonalEventPage").then((module) => ({
    default: module.PesonalEventPage,
  }))
);
