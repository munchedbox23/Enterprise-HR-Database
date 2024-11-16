import { Fragment, useState } from "react";
import { List, Pagination, Box } from "@mui/material";

interface GroupOfItemProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getKey: (item: T) => React.Key;
  direction?: "row" | "column";
  width?: string;
}

export const GroupOfItem = <T,>({
  items,
  renderItem,
  getKey,
  direction = "row",
  width = "100%",
}: GroupOfItemProps<T>) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <List
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: direction,
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
          width,
        }}
      >
        {currentItems.map((item) => (
          <Fragment key={getKey(item)}>{renderItem(item)}</Fragment>
        ))}
      </List>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        showFirstButton
        showLastButton
        sx={{
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#f5ba1a",
            color: "white",
          },
          "& .MuiPaginationItem-root.Mui-selected:hover": {
            backgroundColor: "#d49e1a",
          },
        }}
      />
    </Box>
  );
};
