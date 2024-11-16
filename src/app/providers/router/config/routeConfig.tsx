import { createBrowserRouter } from "react-router-dom";
import { appRoutes } from "@/shared/const/routes";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { OnlyAuth, OnlyUnAuth } from "../ui/WithProtectedRoute";
import { AuthorizationPage } from "@/pages/AuthorizationPage";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { MainLayout } from "@/app/layouts/Mainlayout";
import { EmployeesPage } from "@/pages/EmployeesPage";

export const router = createBrowserRouter([
  {
    path: appRoutes.home(),
    element: <OnlyAuth component={<MainLayout />} />,
    children: [
      {
        index: true,
        element: <OnlyAuth component={<EmployeesPage />} />,
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
]);
