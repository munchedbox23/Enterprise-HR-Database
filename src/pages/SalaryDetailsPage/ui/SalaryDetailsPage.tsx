import { useGetSalaryQuery } from "@/entities/salary/api/salaryApi";
import { SalaryCard } from "@/entities/salary";
import { Container} from "@mui/material";
import { SkeletonItem } from "@/shared/ui/Skeleton";
import { GroupOfItem } from "@/widgets/GroupOfItem";
import { CreateAnEntity } from "@/features/common/CreateAnEntity";
import { CreateSalaryForm } from "@/features/salary/createSalary";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar.tsx";

export const SalaryDetailsPage = () => {
  const { data: salary = [], isLoading } = useGetSalaryQuery();
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
          <CreateAnEntity title="Добавить выплату">
            <CreateSalaryForm onSalaryAdded={handleOpenSnackbar} />
          </CreateAnEntity>
          <GroupOfItem
            direction="column"
            items={salary}
            renderItem={(salary) => <SalaryCard salary={salary} />}
            getKey={(salary) => salary.НомерЗаписи}
            width="60%"
          />
          <NotificationSnackbar
            open={openSnackbar}
            onClose={handleCloseSnackbar}
            severity="success"
            message="Выплата успешно добавлена!"
          />
        </>
      )}
    </Container>
  );
};
