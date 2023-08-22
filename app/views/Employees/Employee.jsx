import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Icon,
  IconButton,
  Grid,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import EmployeeDialog from "./EmployeeDialog";
import moment from "moment/moment";
import {
  deleteEmployees,
  getAllEmployeeRequest,
} from "app/redux/actions/EmployeeActions";
import {
  STATUSES,
  STATUS_EMPLOYEE,
  STATUS_OF_EMPLOYEE,
} from "app/Constants/ListStatus";
import { GENDER, TEAM } from "app/Constants/ListSelectItem";
import ConfirmationDialog from "egret/components/ConfirmationDialog";
import "../../../styles/views/_pending.scss";
import "../../../styles/views/_style.scss";
import MaterialTableComponent from "../Component/MaterialTableComponent/MaterialTableComponent";
import PaginationComponent from "../Component/PaginationComponent/PaginationComponent";
import SearchComponent from "../Component/SearchComponent/SearchComponent";
import BreadcrumbComponent from "../Component/BreadcrumbComponent/BreadcrumbComponent";
import RegisterEmployee from "../RegisterEmployees/RegisterEmployee";

const useStyles = makeStyles({
  customStyle: {
    display: "flex",
    justifyContent: "space-between",
  },
});
const Employee = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [showDialogEmployee, setShowDialogEmployee] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [employee, setEmployee] = useState({});
  const [keywords, setKeywords] = useState("");
  const [certificate, setCertificate] = useState([]);
  const [family, setFamily] = useState([]);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [isViewMode, setIsViewMode] = useState(true);
  const dispatch = useDispatch();
  const employeesData = useSelector((state) => state.employees.employees);
  const totalRecords = useSelector((state) => state.employees.totalElements);
  const employeeReducer = useSelector((state) => state.employees.employee);
  useEffect(() => {
    dispatch(
      getAllEmployeeRequest({
        status: STATUS_OF_EMPLOYEE,
        page: page + 1,
        rowPerPage: rowPerPage,
        keyword: keywords,
      })
    );
  }, [dispatch, page, rowPerPage, keywords]);

  useEffect(() => {
    setEmployee(employeeReducer);
  }, [employeeReducer]);

  const columns = [
    {
      title: "Thao tác",
      field: "custom",
      width: "3%",
      align: "center",
      render: (row) => {
        return (
          <div className="flex-icon">
            {+row?.submitProfileStatus === STATUS_EMPLOYEE.CHO_DUYET.CODE && (
              <IconButton
                size="small"
                onClick={() => {
                  handleViewEmployee(row);
                }}
              >
                <Icon color="primary">visibility</Icon>
              </IconButton>
            )}
            {(+row?.submitProfileStatus === STATUS_EMPLOYEE.LUU_MOI.CODE ||
              +row?.submitProfileStatus ===
                STATUS_EMPLOYEE.YEU_CAU_BO_SUNG.CODE ||
              +row?.submitProfileStatus ===
                STATUS_EMPLOYEE.DA_TU_CHOI.CODE) && (
              <IconButton size="small" onClick={() => handleEdit(row)}>
                <Icon color="primary">edit</Icon>
              </IconButton>
            )}

            {+row?.submitProfileStatus === STATUS_EMPLOYEE.LUU_MOI.CODE && (
              <IconButton size="small" onClick={() => handleDelete(row.id)}>
                <Icon color="error">delete</Icon>
              </IconButton>
            )}
          </div>
        );
      },
    },
    {
      field: "image",
      title: "Hình ảnh",
      width: "2%",
      render: (row) => (
        <div className="center-avatar">
          <Avatar alt="#" src={row?.image} className="mt-4 mb-4 "></Avatar>
        </div>
      ),
    },
    {
      field: "name",
      title: "Họ tên",
      width: "12%",
      render: (data) => <span className="address-column">{data.name}</span>,
    },
    {
      field: "dateOfBirth",
      title: "Ngày sinh",
      width: "5%",
      align: "center",
      render: (row) => moment(row.dateOfBirth).format("DD/MM/YYYY"),
    },
    {
      field: "gender",
      title: "Giới tính",
      align: "center",
      width: "10px",
      render: (data) =>
        GENDER.find((item) => item.id === data.gender.toString())?.name,
    },
    {
      field: "phone",
      title: "Số điện thoại",
      width: "5%",
      align: "center",
    },
    {
      field: "team",
      title: "Nhóm",
      width: "5%",
      align: "center",
      render: (data) => TEAM.find((item) => item.id === data.team)?.name,
    },
    {
      field: "address",
      title: "Địa chỉ",
      width: "15%",
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
  const handleOpenDialogEmloyee = () => {
    setShowDialogEmployee(true);
  };
  const handleCloseDialogEmployee = () => {
    setShowDialogEmployee(false);
  };
  // Thêm nhân viên
  const handleAdd = () => {
    setIsViewMode(false);
    setEmployee({});
    setCertificate([]);
    setFamily([]);
    handleOpenDialogEmloyee();
  };
  // Xóa nhân viên
  const handleOpenDeleteDialog = () => {
    setShowDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
  };
  const handleDelete = (id) => {
    setEmployeeId(id);
    handleOpenDeleteDialog();
  };
  const handleDialogDelete = () => {
    dispatch(deleteEmployees(employeeId));
    handleCloseDeleteDialog();
  };
  // Sửa nhân viên
  const handleEdit = (item) => {
    handleOpenDialogEmloyee();
    setEmployee(item);
    setIsViewMode(false);
  };
  // Xem nhân viên
  const handleShowViewEmployee = () => {
    setShowViewDetails(true);
  };
  const handleCloseViewEmployee = () => {
    setShowViewDetails(false);
  };
  const handleViewEmployee = (rowData) => {
    handleShowViewEmployee();
    setEmployee(rowData);
    setIsViewMode(true);
  };
  return (
    <div className="m-sm-30">
      <BreadcrumbComponent
        manage={t("Dashboard.manage")}
        title={t("staff.title")}
      />
      <div className={classes.customStyle}>
        <div>
          <Button
            className="mt-20 align-bottom"
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              handleAdd();
            }}
          >
            {t("Add")}
          </Button>
        </div>
        <div>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchComponent keywords={keywords} setKeywords={setKeywords} />
            </Grid>
          </Grid>
        </div>
      </div>
      <MaterialTableComponent
        columns={columns}
        data={employeesData}
        height={"558px"}
      />
      <PaginationComponent
        totalRecords={totalRecords}
        page={page}
        setPage={setPage}
        rowPerPage={rowPerPage}
        setRowPerPage={setRowPerPage}
      />
      {showDialogEmployee && (
        <EmployeeDialog
          open={showDialogEmployee}
          onClose={handleCloseDialogEmployee}
          employee={employee}
          setEmployee={setEmployee}
          certificate={certificate}
          setCertificate={setCertificate}
          family={family}
          setFamily={setFamily}
          isViewMode={isViewMode}
        />
      )}
      {showViewDetails && (
        <RegisterEmployee
          open={showViewDetails}
          handleCloseRegisterDialog={handleCloseViewEmployee}
          employee={employee}
          isViewMode={isViewMode}
        />
      )}
      {showDeleteDialog && (
        <ConfirmationDialog
          open={showDeleteDialog}
          onConfirmDialogClose={handleCloseDeleteDialog}
          onYesClick={handleDialogDelete}
          title={"Xóa nhân viên"}
          text={`Bạn có muốn xóa ${t("staff.title")} không?`}
          Yes={t("general.delete")}
          No={t("general.cancel")}
        ></ConfirmationDialog>
      )}
    </div>
  );
};

export default Employee;
