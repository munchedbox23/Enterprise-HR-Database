import { useGetVacationsQuery } from "@/entities/vacation/api/vacationApi";
import { Container } from "@mui/material";
import { SkeletonItem } from "@/shared/ui/Skeleton";
import { GroupOfItem } from "@/widgets/GroupOfItem";
import { VacationItem } from "@/entities/vacation";

export const VacationPage = () => {
  const { data: vacations = [], isLoading } = useGetVacationsQuery();

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <SkeletonItem key={index} />
        ))
      ) : (
        <GroupOfItem
          items={vacations}
          renderItem={(vacation) => <VacationItem vacation={vacation} />}
          getKey={(vacation) => vacation.НомерЗаписи}
        />
      )}
    </Container>
  );
};
