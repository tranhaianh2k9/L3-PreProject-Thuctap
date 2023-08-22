import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Grid,
  IconButton,
  Icon,
  Avatar,
} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/views/_informationForm.scss";
import { useDispatch, useSelector } from "react-redux";
import EmployeeDetailDialog from "../Pending/EmployeeDialog/EmployeeInfoDialog";
import { getAllEmployeeRequest } from "../../redux/actions/EmployeeActions";
import {
  STATUSES,
  STATUS_OF_MANAGE_EMPLOYEE,
} from "../../Constants/ListStatus";
import { TEAM, GENDER } from "../../Constants/ListSelectItem";
import moment from "moment/moment";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import RequestOfEmployeeDialog from "./RequestOfEmployee/RequestOfEmployeeDialog";
import { getNameById } from "utils/handleGeneral";
import { VIEW_ONLY } from "app/Constants/ListNameTab";
import "../../../styles/views/_registerEmployee.scss";
import "../../../styles/views/_style.scss";
import SearchComponent from "../Component/SearchComponent/SearchComponent";
import MaterialTableComponent from "../Component/MaterialTableComponent/MaterialTableComponent";
import PaginationComponent from "../Component/PaginationComponent/PaginationComponent";
import BreadcrumbComponent from "../Component/BreadcrumbComponent/BreadcrumbComponent";

const PendingTable = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const { t } = useTranslation();
  const [openEmployeeDetailDialog, setOpenEmployeeDetailDialog] =
    useState(false);
  const [openRequestEmployeeDialog, setOpenRequestEmployeeDialog] =
    useState(false);
  const [employeeData, setEmployeeData] = useState({});
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);

  const dispatch = useDispatch();
  const listEmployee = useSelector((state) => state?.employees?.employees);
  const totalElements = useSelector((state) => state?.employees?.totalElements);
  useEffect(() => {
    dispatch(
      getAllEmployeeRequest({
        status: STATUS_OF_MANAGE_EMPLOYEE,
        page: page + 1,
        rowPerPage: rowPerPage,
        keyword: searchInputValue,
        
      })
    );
  }, [dispatch, page, rowPerPage, searchInputValue]);

  const columns = [
    {
      title: "Thao Tác",
      field: "custom",
      align: "center",
      width: "3%",
      render: (data) => {
        return (
          <div className="none_wrap">
            <IconButton
              onClick={() => {
                showEmployeeData(data);
              }}
            >
              <FolderSharedIcon color="success"></FolderSharedIcon>
            </IconButton>
              <IconButton
                onClick={() => {
                  showRequestEmployeeDialog(data);
                }}
              >
                <Icon color="primary">edit</Icon>
              </IconButton>
            </div>
        );
      },
    },
    {
      title: "Hình ảnh  ",
      field: "avatar",
      align: "center",
      width: "2%",
      render: (row) => (
        <div className="center-avatar">
        <Avatar alt="#" src={row?.image} className="mt-4 mb-4 "></Avatar>
      </div>
      ),
    },
    {
      title: "Họ và Tên",
      field: "name",
      align: "left",
      width: "12%",
      render: (data) => {
        return <div className="name-table address-column"> {data?.name} </div>
      },
    },
    {
      title: "Giới tính",
      field: "gender",
      align: "center",
      width: "10px",
      render: (data) => {
        return getNameById(data?.gender, GENDER);
      },
    },
    {
      title: "Số Điện Thoại",
      field: "phone",
      align: "center",
      width: "5%",
    },
    {
      title: "Ngày sinh",
      field: "dateOfBirth",
      align: "center",
      width: "5%",
      render: (data) => moment(data?.dateOfBirth).format("DD/MM/YYYY"),
    },
    {
      title: "Nhóm",
      field: "team",
      align: "center",
      width: "5%",
      render: (data) => {
        return getNameById(data?.team, TEAM);
      },
    },
    {
      title: "Địa chỉ",
      field: "address",
      align: "left",
      width: "15%",
      render: (data) => {
        return <span className="address-column">{data?.address}</span>;
      },
    },
    {
      title: "Trạng thái",
      field: "submitProfileStatus",
      align: "left",
      width: "5%",
      render: (data) => {
        return getNameById(data?.submitProfileStatus, STATUSES);
      },
    },
  ];

  const showRequestEmployeeDialog = (data) => {
    setEmployeeData(data);
    setOpenRequestEmployeeDialog(true);
  };
  const showEmployeeData = (data) => {
    setEmployeeData(data);
    setOpenEmployeeDetailDialog(true);
  };

  const handleDialogClose = () => {
    setOpenEmployeeDetailDialog(false);
    setOpenRequestEmployeeDialog(false);
  };

  return (
    <div className="m-sm-30">
      <div>
        <BreadcrumbComponent
          manage={t("Dashboard.manage")}
          title={t("staff.title")}
        />
          <SearchComponent
            keywords={searchInputValue}
            setKeywords={setSearchInputValue}
          />
        
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <MaterialTableComponent
              columns={columns}
              data={listEmployee}
              height={"650px"}
            />
            <PaginationComponent
              totalRecords={totalElements}
              page={page}
              setPage={setPage}
              rowPerPage={rowPerPage}
              setRowPerPage={setRowPerPage}
            />
          </Grid>
        </Grid>
        {openEmployeeDetailDialog && (
          <EmployeeDetailDialog
            open={openEmployeeDetailDialog}
            onClose={() => handleDialogClose()}
            employee={employeeData}
            statusOfForm={VIEW_ONLY}
          />
        )}
        {openRequestEmployeeDialog && (
          <RequestOfEmployeeDialog
            open={openRequestEmployeeDialog}
            onClose={() => handleDialogClose()}
            employee={employeeData}
          />
        )}
      </div>
    </div>
  );
};

export default PendingTable;
