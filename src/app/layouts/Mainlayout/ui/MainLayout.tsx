import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import BadgeIcon from '@mui/icons-material/Badge';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import dataBaseImage from "@/shared/assets/images/dataBase.png";

const NAVIGATION: Navigation = [
  {
    segment: "employees",
    title: "Сотрудники",
    icon: <BadgeIcon />,
  },
  {
    segment: "orders",
    title: "Штатное расписание",
    icon: <ShoppingCartIcon />,
  },
];

export const MainLayout = () => {
  const routerLayout = useDemoRouter("/");
  return (
    <AppProvider
      router={routerLayout}
      navigation={NAVIGATION}
      branding={{
        logo: (
          <img src={dataBaseImage} alt="MUI logo" />
        ),
        title: "База данных",
      }}
    >
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
};
