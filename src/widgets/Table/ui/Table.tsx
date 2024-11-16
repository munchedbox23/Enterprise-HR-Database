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
        pagination: true,
        rowsPerPageOptions: [10, 20, 50, 100],
        jumpToPage: true,
        textLabels: {
          pagination: {
            next: "Следующая страница",
            previous: "Предыдущая страница",
            rowsPerPage: "Строк на странице:",
            displayRows: "из",
            jumpToPage: "Перейти на страницу:",
          },
          toolbar: {
            search: "Поиск",
            downloadCsv: "Скачать CSV",
            print: "Печать",
            viewColumns: "Показать столбцы",
            filterTable: "Фильтр таблицы",
          },
          filter: {
            all: "Все",
            title: "Фильтры",
            reset: "Сбросить",
          },
          viewColumns: {
            title: "Показать столбцы",
            titleAria: "Показать/Скрыть столбцы",
          },
          selectedRows: {
            text: "строк выбрано",
            delete: "Удалить",
            deleteAria: "Удалить выбранные строки",
          },
        },
      }}
      columns={columns}
      data={data}
      title={title}
    />
  );
};
