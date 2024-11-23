import { useGetVacationsQuery } from "@/entities/vacation/api/vacationApi";
import { Container } from "@mui/material";
import { SkeletonItem } from "@/shared/ui/Skeleton";
import { GroupOfItem } from "@/widgets/GroupOfItem";
import { VacationItem } from "@/entities/vacation";
import { CreateVacationForm } from "@/features/vacation/createVacataion";
import { CreateAnEntity } from "@/features/common/CreateAnEntity";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar.tsx";

export const VacationPage = () => {
  const { data: vacations = [], isLoading } = useGetVacationsQuery();
  const { openSnackbar, handleCloseSnackbar, handleOpenSnackbar } =
    useSnackbar();

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <SkeletonItem key={index} />
        ))
      ) : (
        <>
          <CreateAnEntity title="Создать отпуск">
            <CreateVacationForm onSuccess={handleOpenSnackbar} />
          </CreateAnEntity>
          <GroupOfItem
            items={vacations}
            renderItem={(vacation) => <VacationItem vacation={vacation} />}
            getKey={(vacation) => vacation.НомерЗаписи}
          />
          <NotificationSnackbar
            open={openSnackbar}
            onClose={handleCloseSnackbar}
            message="Отпуск успешно создан"
            severity="success"
          />
        </>
      )}
    </Container>
  );
};
