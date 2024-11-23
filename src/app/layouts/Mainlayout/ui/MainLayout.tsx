import { Outlet } from "react-router-dom";
import { AppProvider, Session } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import dataBaseImage from "@/shared/assets/images/dataBase.png";
import { SidebarFooterAccount } from "@/features/common/SidebarFooterAccount";
import { useMemo, useState, Suspense } from "react";
import { NAVIGATION } from "@/shared/const/navigation";
import { useAppSelector } from "@/app/providers/StoreProvider";
import { Loader } from "@/shared/ui/Loader";
import { ModalProvider } from "@/app/providers/ModalProvider/ui/ModalProvider";

export const MainLayout = () => {
  const userDate = useAppSelector((store) => store.user.user);
  const demoSession = {
    user: {
      name: userDate?.name,
      email: userDate?.email,
      image: "",
    },
  };

  const [session, setSession] = useState<Session>(demoSession);
  const authentication = useMemo(() => {
    return {
      signIn: () => {
        setSession(demoSession);
      },
      signOut: () => {
        setSession({
          user: {
            name: "",
            email: "",
            image: "",
          },
        });
      },
    };
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src={dataBaseImage} alt="DataBase logo" />,
        title: "Отдел кадров",
      }}
      authentication={authentication}
      session={session}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: () => null,
          sidebarFooter: SidebarFooterAccount,
        }}
        sx={{ padding: 3 }}
      >
        <ModalProvider>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </ModalProvider>
      </DashboardLayout>
    </AppProvider>
  );
};
