import { createBrowserRouter } from "react-router-dom";
import { appRoutes } from "@/shared/const/routes";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { OnlyAuth, OnlyUnAuth } from "../ui/WithProtectedRoute";
import { AuthorizationPage } from "@/pages/AuthorizationPage";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { MainLayout } from "@/app/layouts/Mainlayout";

export const router = createBrowserRouter([
  {
    path: appRoutes.home(),
    element: <MainLayout />,
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
