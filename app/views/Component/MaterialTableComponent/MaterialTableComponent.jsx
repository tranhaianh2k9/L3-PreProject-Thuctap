import React from "react";
import MaterialTable from "material-table";
import { useTranslation } from "react-i18next";
const MaterialTableComponent = ({
  columns,
  data,
  height,
  paging,
  pageSize,
}) => {
  const { t } = useTranslation();
  return (
    <MaterialTable
      columns={columns}
      data={data}
      options={{
        search: false,
        toolbar: false,
        draggable: false,
        header: true,
        filtering: false,
        sorting: false,
        headerStyle: {
          backgroundColor: "#7467ef",
          color: "#fff",
          textAlign: "center",
          border: "1px solid #dee2e6",
        },
        paging: paging,
        minBodyHeight: height,
        maxBodyHeight: height,
        pageSize: pageSize,
        rowStyle: (rowData, index) => ({
          backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
          border: "1px solid #99999978",
        }),
        cellStyle: {
          border: "1px solid #dee2e6",
          padding: "0 10px",
          margin: "0",
        },
        padding: "dense",
        tableLayout: "auto",
      }}
      localization={{
        body: {
          emptyDataSourceMessage: `${t("general.emptyDataMessageTable")}`,
        },
        pagination: {
          labelRowsSelect: `Bản ghi`,
          labelDisplayedRows: `{from}-{to} trong {count}`,
          firstTooltip: "Trang đầu",
          previousTooltip: "Trang trước",
          nextTooltip: "Trang tiếp",
          lastTooltip: "Trang cuối",
        },
      }}
    />
  );
};

export default MaterialTableComponent;
