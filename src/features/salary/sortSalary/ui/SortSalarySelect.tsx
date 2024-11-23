import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useState } from "react";
import { SalaryRecord } from "@/entities/salary/model/types";

interface SortSalarySelectProps {
  filteredSalaries: SalaryRecord[];
  setFilteredSalaries: (salaries: SalaryRecord[]) => void;
}

export const SortSalarySelect = ({
  filteredSalaries,
  setFilteredSalaries,
}: SortSalarySelectProps) => {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (value: string) => {
    setSortOption(value);
    const sortedSalaries = [...filteredSalaries].sort((a, b) => {
      const dateA = new Date(a.ДатаВыплаты);
      const dateB = new Date(b.ДатаВыплаты);
      const amountA = a.Сумма !== undefined ? Number(a.Сумма) : 0;
      const amountB = b.Сумма !== undefined ? Number(b.Сумма) : 0;

      if (value === "paymentDateAsc") return dateA.getTime() - dateB.getTime();
      if (value === "paymentDateDesc") return dateB.getTime() - dateA.getTime();
      if (value === "salaryAsc") return amountA - amountB;
      if (value === "salaryDesc") return amountB - amountA;
      return 0;
    });
    setFilteredSalaries(sortedSalaries);
  };

  return (
    <CustomSelect
      label="Сортировка"
      name="sort"
      options={[
        {
          value: "paymentDateAsc",
          label: "Дата выплаты (по возрастанию)",
          key: "paymentDateAsc",
        },
        {
          value: "paymentDateDesc",
          label: "Дата выплаты (по убыванию)",
          key: "paymentDateDesc",
        },
        {
          value: "salaryAsc",
          label: "Сумма (по возрастанию)",
          key: "salaryAsc",
        },
        {
          value: "salaryDesc",
          label: "Сумма (по убыванию)",
          key: "salaryDesc",
        },
      ]}
      value={sortOption}
      onChange={(event) => handleSortChange(event.target.value)}
      width="200px"
    />
  );
};
