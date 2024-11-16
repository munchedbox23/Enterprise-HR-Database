import MUIDataTable from "mui-datatables";

type Column = {
  name: string;
  label?: string;
  options?: object;
};

export const Table = <T extends object>({
  data = [],
  columns = [],
  title,
}: {
  data: T[];
  columns: Column[];
  title?: string;
}) => {
  return (
    <MUIDataTable
      options={{
        filter: true,
        filterType: "dropdown",
        responsive: "standard",
      }}
      columns={columns}
      data={data}
      title={title}
    />
  );
};
