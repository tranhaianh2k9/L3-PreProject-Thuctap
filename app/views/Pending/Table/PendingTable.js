import React, { useState, useEffect } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import {
  Grid,
  IconButton,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import EmployeeDetailDialog from ".././EmployeeDialog/EmployeeInfoDialog";
import "../../../../styles/views/_pending.scss";
import { getAllEmployeeRequest } from "../../../redux/actions/EmployeeActions";
import { STATUSES, STATUS_OF_PENDING } from "../../../Constants/ListStatus";
import { ACTION_END_EMPLOYEE } from "../../../Constants/ListNameTab";
import { TEAM, GENDER } from "../../../Constants/ListSelectItem";
import moment from "moment/moment";
import { getNameById } from "utils/handleGeneral";
import "../../../../styles/views/_registerEmployee.scss";
import "../../../../styles/views/_style.scss";
import GeneralOfRequestForm from "app/views/FormGeneralOfRequest/GeneralOfRequestForm";
import MaterialTableComponent from "app/views/Component/MaterialTableComponent/MaterialTableComponent";
import PaginationComponent from "app/views/Component/PaginationComponent/PaginationComponent";
import SearchComponent from "app/views/Component/SearchComponent/SearchComponent";

const useStyles = makeStyles({
  redColor: {
    color: "red",
  },

  inputSearch: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  TextFieldSearch: {
    width: "450px",
    marginLeft: "auto",
  },
});

const PendingTable = ({ title }) => {
  const styleClass = useStyles();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [openEmployeeDetailDialog, setOpenEmployeeDetailDialog] =
    useState(false);
  const [openGeneralOfRequestForm, setOpenGeneralOfRequestForm] =
    useState(false);
  const [endData, setEndData] = useState({});
  const [employee, setEmployee] = useState({});
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [statusOfForm, setStatusOfForm] = useState();
  const dispatch = useDispatch();
  const listEmployee = useSelector((state) => state?.employees?.employees);
  const totalElements = useSelector((state) => state?.employees?.totalElements);
  useEffect(() => {
    dispatch(
      getAllEmployeeRequest({
        status: STATUS_OF_PENDING,
        page: page + 1,
        rowPerPage: rowPerPage,
        keyword: searchInputValue,
      })
    );
  }, [dispatch, page, rowPerPage, searchInputValue]);

  const columns = [
    {
      title: "Thao tác",
      field: "custom",
      align: "center",
      width: "5%",
      render: (data) => {
        return Number(data?.submitProfileStatus) === 2 ? (
          <IconButton
            onClick={() => {
              showEmployeeData(data, data?.submitProfileStatus);
            }}
          >
            <PersonAddIcon color="primary"></PersonAddIcon>
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              showGeneralForm(data);
            }}
          >
            <PersonOffIcon color="error"></PersonOffIcon>
          </IconButton>
        );
      },
    },
    {
      title: "Hình ảnh  ",
      field: "image",
      align: "left",
      width: "5%",
      render: (row) => (
        <div className="center-avatar">
        <Avatar alt="#" src={row?.image} className="mt-4 mb-4 "></Avatar>
      </div>
      ),
    },
    {
      title: "Họ và tên",
      field: "name",
      align: "left",
      width: "5%",
      render: (data) => {
        return <span className="address-column">{data?.name}</span>;
      },
    },
    {
      title: "Giới tính",
      field: "gender",
      align: "center",
      width: "5%",
      render: (data) => {
        return getNameById(data?.gender, GENDER);
      },
    },
    {
      title: "Số điện thoại",
      field: "phone",
      align: "left",
      width: "5%",
    },
    {
      title: "Ngày sinh",
      field: "dateOfBirth",
      align: "center",
      width: "5%",
      render: (row) => moment(row?.dateOfBirth).format("DD/MM/YYYY"),
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
      width: "5%",
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
        return getNameById(Number(data?.submitProfileStatus), STATUSES);
      },
    },
  ];

  const showGeneralForm = (data) => {
    setOpenGeneralOfRequestForm(true);
    setEndData(data);
  };
  const closeGeneralForm = () => {
    setOpenGeneralOfRequestForm(false);
  };

  const showEmployeeData = (data, status) => {
    setEmployee(data);
    setStatusOfForm(status);
    setOpenEmployeeDetailDialog(!openEmployeeDetailDialog);
  };

  const handleDialogClose = () => {
    setOpenEmployeeDetailDialog(!openEmployeeDetailDialog);
  };

  return (
    <div>
      <Grid className={styleClass?.inputSearch}>
        <h4 className="mt-16 mb-16"> {"Danh sách " + title} </h4>
        <SearchComponent
          keywords={searchInputValue}
          setKeywords={setSearchInputValue}
        />
      </Grid>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <MaterialTableComponent
            columns={columns}
            data={listEmployee}
            height={"648px"}
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
          employee={employee}
          setEmployee={setEmployee}
          statusOfForm={statusOfForm}
        />
      )}
      {openGeneralOfRequestForm && (
        <GeneralOfRequestForm
          statusOfForm={ACTION_END_EMPLOYEE}
          open={openGeneralOfRequestForm}
          onClose={closeGeneralForm}
          requestOfEmployeeData={endData}
        />
      )}
    </div>
  );
};

export default PendingTable;
