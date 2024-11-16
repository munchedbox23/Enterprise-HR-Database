import { useGetSalaryQuery } from "@/entities/salary/api/salaryApi";
import { SalaryCard } from "@/entities/salary";
import { Container} from "@mui/material";
import { SkeletonItem } from "@/shared/ui/Skeleton";
import { GroupOfItem } from "@/widgets/GroupOfItem";

export const SalaryDetailsPage = () => {
  const { data: salary = [], isLoading } = useGetSalaryQuery();

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <SkeletonItem key={index} />
        ))
      ) : (
        <GroupOfItem
          direction="column"
          items={salary}
          renderItem={(salary) => <SalaryCard salary={salary} />}
          getKey={(salary) => salary.НомерЗаписи}
          width="60%"
        />
      )}
    </Container>
  );
};
