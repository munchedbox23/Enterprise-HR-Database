import { Table } from "@/widgets/Table";
import React from "react";

export const EmployeesPage = () => {

  const [data, setData] = React.useState([
    { name: 'John', age: 25, country: 'USA' },
    { name: 'Anna', age: 22, country: 'Sweden' },
    { name: 'Mike', age: 30, country: 'Canada' },
    // Добавьте больше данных по необходимости
  ]);

  const columns = [
    { name: "name", label: "Имя" },
    { name: "age", label: "Возраст" },
    { name: "country", label: "Страна" },
  ];
  return <Table data={data} columns={columns} />;
};
