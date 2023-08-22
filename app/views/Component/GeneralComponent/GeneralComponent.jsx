import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Icon, IconButton, Avatar } from "@material-ui/core";
import moment from "moment/moment";
import { getAllEmployeeRequest } from "app/redux/actions/EmployeeActions";
import { STATUSES } from "app/Constants/ListStatus";
import { GENDER, TEAM } from "app/Constants/ListSelectItem";
import "../../../../styles/views/_pending.scss";
import RegisterEmployee from "app/views/RegisterEmployees/RegisterEmployee";
import MaterialTableComponent from "../MaterialTableComponent/MaterialTableComponent";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import SearchComponent from "../SearchComponent/SearchComponent";

const GeneralComponent = ({ status, decision }) => {
  const { t } = useTranslation();
  const [keywords, setKeywords] = useState("");
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [employee, setEmployee] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch();
  const employeesData = useSelector((state) => state.employees.employees);
  const totalRecords = useSelector((state) => state.employees.totalElements);
  useEffect(() => {
    dispatch(
      getAllEmployeeRequest({
        status: status,
        page: page + 1,
        rowPerPage: rowPerPage,
        keyword: keywords,
      })
    );
  }, [dispatch, page, rowPerPage, keywords, status]);
  const columns = [
    {
      title: "Thao tác",
      field: "custom",
      width: "5%",
      align: "center",
      render: (row) => {
        return (
          <IconButton
            size="small"
            onClick={() => {
              handleViewEmployee(row);
            }}
          >
            <Icon color="primary">visibility</Icon>
          </IconButton>
        );
      },
    },
    {
      title: "Mã nhân viên",
      field: "code",
      width: "5%",
      align: "left",
    },
    {
      field: "image",
      title: "Hình ảnh",
      width: "10%",
      align: "center",
      render: (row) => (
        <div className="center-avatar">
          <Avatar alt="#" src={row.image} className="mt-4 mb-4"></Avatar>
        </div>
      ),
    },
    {
      field: "name",
      title: "Họ tên",
      width: "30%",
      render: (data) => <span className="address-column">{data.name}</span>,
    },
    {
      field: "dateOfBirth",
      title: "Ngày sinh",
      width: "5%",
      render: (row) => moment(row.dateOfBirth).format("DD/MM/YYYY"),
    },
    {
      field: "gender",
      title: "Giới tính",
      width: "5%",
      align: "center",
      render: (data) =>
        GENDER.find((item) => item.id === data.gender.toString())?.name,
    },
    {
      field: "phone",
      title: "Số điện thoại",
      align: "center",
      width: "5%",
    },
    {
      field: "team",
      title: "Nhóm",
      align: "center",
      width: "5%",
      render: (data) => TEAM.find((item) => item.id === data.team)?.name,
    },
    {
      field: "address",
      title: "Địa chỉ",
      width: "10%",
      render: (data) => <span className="address-column">{data.address}</span>,
    },
    {
      field: "submitProfileStatus",
      title: "Trạng thái",
      width: "5%",
      render: (data) =>
        STATUSES.find((item) => item.id === Number(data.submitProfileStatus))
          ?.name,
    },
  ];
  //Show dialog
  const handleOpenDialog = () => {
    setShowDialog(true);
  };
  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleViewEmployee = (rowData) => {
    handleOpenDialog();
    setEmployee(rowData);
  };
  return (
    <div className="m-sm-30">
      <BreadcrumbComponent
        manage={t("Dashboard.manage")}
        title={t("staff.title")}
      />
      <SearchComponent keywords={keywords} setKeywords={setKeywords} />
      <MaterialTableComponent
        columns={columns}
        data={employeesData}
        height={"569px"}
      />
      <PaginationComponent
        totalRecords={totalRecords}
        page={page}
        setPage={setPage}
        rowPerPage={rowPerPage}
        setRowPerPage={setRowPerPage}
      />
      {showDialog && (
        <RegisterEmployee
          open={showDialog}
          handleCloseRegisterDialog={handleCloseDialog}
          employee={employee}
          isViewMode={true}
          decision={decision}
        />
      )}
    </div>
  );
};

export default GeneralComponent;
