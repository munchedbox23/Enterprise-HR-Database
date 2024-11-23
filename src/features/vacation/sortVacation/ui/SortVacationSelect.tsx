import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useState } from "react";
import { Vacation } from "@/entities/vacation";

interface SortVacationSelectProps {
  filteredVacations: Vacation[];
  setFilteredVacations: (vacations: Vacation[]) => void;
}

export const SortVacationSelect = ({
  filteredVacations,
  setFilteredVacations,
}: SortVacationSelectProps) => {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (value: string) => {
    setSortOption(value);
    const sortedVacations = [...filteredVacations].sort((a, b) => {
      const dateA = new Date(a.ДатаНачала);
      const dateB = new Date(b.ДатаНачала);
      if (value === "startDateAsc") return dateA.getTime() - dateB.getTime();
      if (value === "startDateDesc") return dateB.getTime() - dateA.getTime();
      if (value === "endDateAsc")
        return (
          new Date(a.ДатаОкончания).getTime() -
          new Date(b.ДатаОкончания).getTime()
        );
      if (value === "endDateDesc")
        return (
          new Date(b.ДатаОкончания).getTime() -
          new Date(a.ДатаОкончания).getTime()
        );
      return 0;
    });
    setFilteredVacations(sortedVacations);
  };

  return (
    <CustomSelect
      label="Сортировка"
      name="sort"
      options={[
        {
          value: "startDateAsc",
          label: "Дата начала (по возрастанию)",
          key: "startDateAsc",
        },
        {
          value: "startDateDesc",
          label: "Дата начала (по убыванию)",
          key: "startDateDesc",
        },
        {
          value: "endDateAsc",
          label: "Дата окончания (по возрастанию)",
          key: "endDateAsc",
        },
        {
          value: "endDateDesc",
          label: "Дата окончания (по убыванию)",
          key: "endDateDesc",
        },
      ]}
      value={sortOption}
      onChange={(event) => handleSortChange(event.target.value)}
      width="200px"
    />
  );
};
