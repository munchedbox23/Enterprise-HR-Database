import { createBrowserRouter } from "react-router-dom";
import { appRoutes } from "@/shared/const/routes";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { OnlyAuth, OnlyUnAuth } from "../ui/WithProtectedRoute";
import { AuthorizationPage } from "@/pages/AuthorizationPage";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { MainLayout } from "@/app/layouts/Mainlayout";
import { EmployeesPage } from "@/pages/EmployeesPage";
import { StaffingPage } from "@/pages/StaffingPage";
import { DepartmentPage } from "@/pages/DepartamentPage";
import { TimeSheetPage } from "@/pages/TimeSheetPage";
import { Navigate } from "react-router-dom";
import { VacationPage } from "@/pages/VacationPage";
import { PesonalEventPage } from "@/pages/PesonalEventPage";
import { SalaryDetailsPage } from "@/pages/SalaryDetailsPage";

export const router = createBrowserRouter(
  [
    {
      path: appRoutes.home(),
      element: <OnlyAuth component={<MainLayout />} />,
      children: [
        {
          index: true,
          element: (
            <OnlyAuth component={<Navigate to={appRoutes.employees()} />} />
          ),
        },
        {
          path: appRoutes.employees(),
          element: <OnlyAuth component={<EmployeesPage />} />,
        },
        {
          path: appRoutes.staffing(),
          element: <OnlyAuth component={<StaffingPage />} />,
        },
        {
          path: appRoutes.department(),
          element: <OnlyAuth component={<DepartmentPage />} />,
        },
        {
          path: appRoutes.attendance(),
          element: <OnlyAuth component={<TimeSheetPage />} />,
        },
        {
          path: appRoutes.vacations(),
          element: <OnlyAuth component={<VacationPage />} />,
        },
        {
          path: appRoutes.events(),
          element: <OnlyAuth component={<PesonalEventPage />} />,
        },
        {
          path: appRoutes.payroll(),
          element: <OnlyAuth component={<SalaryDetailsPage />} />,
        },
      ],
    },
    {
      path: appRoutes.auth(),
      element: <OnlyUnAuth component={<AuthLayout />} />,
      children: [
        {
          index: true,
          element: <OnlyUnAuth component={<AuthorizationPage />} />,
        },
      ],
    },
    {
      path: appRoutes.notFound(),
      element: <NotFoundPage />,
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
