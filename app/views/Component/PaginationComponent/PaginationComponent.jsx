import React from "react";
import { makeStyles } from "@material-ui/core";
import TablePagination from "@mui/material/TablePagination";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles({
  customPagination: {
    "& p": {
      margin: 0,
    },
  },
});
const PaginationComponent = ({
  totalRecords,
  page,
  setPage,
  rowPerPage,
  setRowPerPage,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const handleChangePage = (event, page) => {
    setPage(page);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(event.target.value);
    setPage(0);
  };
  return (
    <TablePagination
      align="left"
      className={`px-16 ${classes.customPagination}`}
      rowsPerPageOptions={[1, 2, 3, 5, 10, 25, 50, 100]}
      component="div"
      labelRowsPerPage={t("general.rows_per_page")}
      labelDisplayedRows={({ from, to, count }) =>
        `${from}-${to} ${t("general.of")} ${
          count !== -1 ? count : `more than ${to}`
        }`
      }
      count={totalRecords}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      backIconButtonProps={{
        "aria-label": "Previous Page",
      }}
      nextIconButtonProps={{
        "aria-label": "Next Page",
      }}
    />
  );
};

export default PaginationComponent;
