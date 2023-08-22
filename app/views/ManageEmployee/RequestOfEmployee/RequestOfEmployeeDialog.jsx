import React, { useState} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Avatar,
  Paper,
  Typography,
  Tabs,
  Tab,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { GENDER } from "../../../Constants/ListSelectItem";
import moment from "moment/moment";
import SalaryIncrease from "./SalaryIncrease.js";
import { getNameById } from "utils/handleGeneral";
import Process from "./Process";
import Proposal from "./Proposal";
import GeneralOfRequestForm from "app/views/FormGeneralOfRequest/GeneralOfRequestForm";
import { EDIT_END_EMPLOYEE, VIEW_ONLY } from "app/Constants/ListNameTab";
import "../../../../styles/views/_style.scss";
import { STATUS_EMPLOYEE } from "app/Constants/ListStatus";
import { TAB_REQUEST } from "app/Constants/ListTab";

const useStyles = makeStyles({
  redColor: {
    color: "red",
  },
  iconClose: { position: "absolute", right: 8, top: 8 },
});

toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
});

const RequestOfEmployeeDialog = ({ open, onClose, employee }) => {
  const [openEndEmployeeDialog, setOpenEndEmployeeDialog] = useState(false);
  const [statusOfForm, setStatusOfForm] = useState();
  
  const styleClass = useStyles();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleClose = () => {
    onClose();
  };
  const handleEndEmployeeDialogOpen = () => {
    setOpenEndEmployeeDialog(true);
    setStatusOfForm(EDIT_END_EMPLOYEE);
  };
  const handleEndEmployeeDialogClose = () => {
    setOpenEndEmployeeDialog(false);
   
  };
  const viewEndEmployeeDialogOpen = () =>{
    setOpenEndEmployeeDialog(true)
    setStatusOfForm(VIEW_ONLY);
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
      <DialogTitle id="draggable-dialog-title">
        <span className="styleColor">Yêu cầu của nhân viên </span>
        <IconButton aria-label="close" className={styleClass?.iconClose}>
          <CloseIcon color="error" onClick={handleClose} />
        </IconButton>
      </DialogTitle>
      <Paper>
        <Grid
          container
          spacing={2}
          className="mb-12 employee-detail no-scroll-dialog "
        >
          <Grid>
            <Avatar
              src={employee?.image}
              alt="Employee"
              className="avatar-detail mr-32"
            />
          </Grid>
          <Grid className="ml-32">
            <Typography className="mb-16" variant="h4">
              {employee?.name}
            </Typography>
            <Typography className="mb-8" variant="body1">
              Ngày sinh: {moment(employee?.dateOfBirth).format("DD/MM/YYYY")}
            </Typography>
            <Typography className="mb-8" variant="body1">
              Giới tính: {getNameById(employee?.gender, GENDER)}
            </Typography>
            <Typography className="mb-8" variant="body1">
              Địa chỉ: {employee?.address}
            </Typography>
            <Typography className="mb-8" variant="body1">
              Số điện thoại: {employee?.phone}
            </Typography>
            <Typography className="mb-8" variant="body1">
              Email: {employee?.email}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        className="mt-12 center-tab"
        centered
      >
        <Tab label={TAB_REQUEST.YEU_CAU_TANG_LUONG.LABEL} />
        <Tab label={TAB_REQUEST.YEU_CAU_TANG_CHUC.LABEL} />
        <Tab label={TAB_REQUEST.DE_XUAT_THAM_MUU.LABEL} />
      </Tabs>

      {activeTab === TAB_REQUEST.YEU_CAU_TANG_LUONG.KEY && (
        <DialogContent dividers>
          <SalaryIncrease employee={employee} />
        </DialogContent>
      )}
      {activeTab === TAB_REQUEST.YEU_CAU_TANG_CHUC.KEY && (
        <DialogContent dividers>
          <Process employee={employee} />
        </DialogContent>
      )}
      {activeTab === TAB_REQUEST.DE_XUAT_THAM_MUU.KEY && (
        <DialogContent dividers>
          <Proposal employee={employee} />
        </DialogContent>
      )}

      <DialogActions className="mt-12 ">
        <Grid container className="button-center">
          {Number(employee?.submitProfileStatus) !== STATUS_EMPLOYEE.CHO_DUYET_KET_THUC.CODE ? (
            <Button
              className=" mr-12 buttonColorRed"
              color="error"
              variant="contained"
              onClick={handleEndEmployeeDialogOpen}
            >
              Kết thúc
            </Button>
          ) : (
            <Button
              className=" mr-12"
              color="primary"
              variant="contained"
              onClick={viewEndEmployeeDialogOpen}
            >
              Xem biểu mẫu kết thúc
            </Button>
          )}
          <Button
            onClick={handleClose}
            variant="contained"
            className="mr-12"
            color="secondary"
          >
            {t("general.cancel")}
          </Button>
        </Grid>
      </DialogActions>
      {openEndEmployeeDialog && (
        <GeneralOfRequestForm
          statusOfForm={statusOfForm}
          open={openEndEmployeeDialog}
          onClose={() => handleEndEmployeeDialogClose()}
          requestOfEmployeeData={employee}
          closeFormRequest={onClose}
        />
      )}
    </Dialog>
  );
};
export default RequestOfEmployeeDialog;
