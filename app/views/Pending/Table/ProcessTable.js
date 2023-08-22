import React, { useState, useEffect } from "react";
import {
  Grid,
  IconButton,
  Icon,
  makeStyles,
} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import "../../../../styles/views/_pending.scss";
import { getListPendingProcessRequest } from "../../../redux/actions/ProcessAction"
import { STATUSES } from "../../../Constants/ListStatus"
import moment from "moment/moment";
import { getNameById } from "utils/handleGeneral";
import GeneralOfRequestForm from "../../FormGeneralOfRequest/GeneralOfRequestForm"
import { ACTION_PROCESS } from "app/Constants/ListNameTab";
import MaterialTableComponent from "app/views/Component/MaterialTableComponent/MaterialTableComponent";
import { LIST_POSITION } from "app/Constants/ListSelectItem";

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



const ProcessTable = ({ title }) => {
  const styleClass = useStyles();


  const [openGeneralOfRequestForm, setOpenGeneralOfRequestForm] = useState(false)
  const [processDetail, setProcessDetail] = useState({})

  const dispatch = useDispatch();

  const listProcess = useSelector((state) => state?.process?.listProcess);

  useEffect(() => {
    dispatch(getListPendingProcessRequest());
  }, [dispatch]);

  const columns = [
    {
      title: "Thao tác",
      field: "custom",
      align: "center",
      width: "5%",
      render: (data) => {
        return (
          <IconButton
            onClick={() => {
              handleOpenFormDetail(data);
            }}
          >
            <Icon color="primary">visibility</Icon>
          </IconButton>
        );
      },
    },
    {
      title: "Lần",
      field: "times",
      align: "center",
      width: "5%",

    },
    {
      title: "Vị trí hiện tại",
      field: "currentPosition",
      align: "left",
      width: "5%",
      render: (data)=>{
        return (getNameById(Number(data?.currentPosition), LIST_POSITION))
      }
    },
    {
      title: "Vị trí mới",
      field: "newPosition",
      align: "left",
      width: "5%",
      render: (data)=>{
        return (getNameById(Number(data?.newPosition), LIST_POSITION))
      }
    },
    {
      title: "Ngày bắt đầu",
      field: "startDate",
      align: "center",
      width: "5%",
      render: (row) => moment(row.dateOfBirth).format("DD/MM/YYYY"),
    },
    {
      title: "Trạng thái",
      field: "ProcessStatus",
      align: "left",
      width: "5%",
      render: (data) => {
        return (getNameById(Number(data?.processStatus), STATUSES))
      }
    },
  ];


  const handleCloseFormDetail = () => {
    setOpenGeneralOfRequestForm(false);
  };

  const handleOpenFormDetail = (data) => {
    setOpenGeneralOfRequestForm(true);
    setProcessDetail(data)
  }

  return (
    <div>
      <Grid className={styleClass?.inputSearch}>
        <h4 className="mt-16 mb-16"> {"Danh sách " + title} </h4>

      </Grid>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
        <MaterialTableComponent
            columns={columns}
            data={listProcess}
            paging={true}
            pageSize={10}
            height={"540px"}
          ></MaterialTableComponent>
        </Grid>
      </Grid>
      {openGeneralOfRequestForm && (
        <GeneralOfRequestForm
          statusOfForm={ACTION_PROCESS}
          open={openGeneralOfRequestForm}
          onClose={handleCloseFormDetail}
          requestOfEmployeeData={processDetail}
        />
      )}
    </div>
  );
};

export default ProcessTable;
