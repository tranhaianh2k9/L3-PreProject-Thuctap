import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  makeStyles,
  Paper,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import { Close as CloseIcon } from "@material-ui/icons";
import { Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ProfileForm from "./TabPanelForm/ProfileForm";
import "../../../styles/views/_registerEmployee.scss";
import { ValidatorForm } from "react-material-ui-form-validator";
import InformationForm from "./TabPanelForm/InformationForm";
import CertificateForm from "./TabPanelForm/CertificateForm";
import {
  getEmployeeByIdRequest, updateEmployees,
} from "app/redux/actions/EmployeeActions";
import SubmitLeaderDialog from "./SubmitLeaderDialog";
import {
  STATUS_EMPLOYEE, STATUS_OF_EMPLOYEE,
} from "app/Constants/ListStatus";
import SubMissionDialog from "./SubMissionDialog";
import moment from "moment/moment";
import { TAB_REGISTER } from "app/Constants/ListTab";

const useStyles = makeStyles({
  colorStyle: {
    color: "red",
  },
  iconClose: {
    position: "absolute",
    right: 8,
    top: 9,
  },
});
const RegisterEmployee = ({
  open,
  employee,
  setEmployee,
  handleCloseRegisterDialog,
  handleCloseEmployeeDialog,
  isViewMode,
  decision,
}) => {
  const submitRef = useRef();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [openSubmitLeaderDialog, setOpenSubmitLeaderDialog] = useState(false);
  const [openSubMissionDialog, setOpenSubMissionDialog] = useState(false);
  const dispatch = useDispatch();
  const employeeDetail = useSelector((state) => state.employees.employee);
  useEffect(() => {
    if (employee?.id) {
      dispatch(getEmployeeByIdRequest(employee?.id));
    }
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpenSubmitLeaderDialog = () => {
    const dataTemp = {
      ...employee,
      knowledge: employee?.knowledge?.trim(),
      skill: employee?.skill?.trim(),
      activity: employee?.activity?.trim(),
    };
    dispatch(updateEmployees(dataTemp, STATUS_OF_EMPLOYEE));
    setOpenSubmitLeaderDialog(true);
  };
  const handleCloseSubmitLeaderDialog = () => {
    setOpenSubmitLeaderDialog(false);
  };

  const handleOpenSubMissionDialog = () => {
    setOpenSubMissionDialog(true);
  };
  const handleCloseSubMissionDialog = () => {
    setOpenSubMissionDialog(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseRegisterDialog}
        aria-labelledby="form-dialog-title"
        maxWidth={"lg"}
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title" className="custom-dialog-title">
          <div className="title-custom-tab">
            <span className="styleColor">Thông tin hồ sơ nhân viên</span>
            {employee?.numberSaved ? (
              <span className="mr-40 decision-text">
                Số lưu: {employee?.numberSaved} - Ngày lưu:{" "}
                {moment(employee?.decisionDay).format("DD/MM/YYYY")}{" "}
              </span>
            ) : (
              ""
            )}
          </div>
          <IconButton aria-label="close" className={classes.iconClose}>
            <CloseIcon color="error" onClick={handleCloseRegisterDialog} />
          </IconButton>
        </DialogTitle>
        <Paper className="dialog-content-custom">
          <Box sx={{ flexGrow: 1, display: "flex", height: 700 }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
              className="custom-tab"
            >
              <Tab label={TAB_REGISTER.HO_SO.LABEL} className="tab-label" />
              <Tab label={TAB_REGISTER.SO_YEU_LY_LICH.LABEL} className="tab-label" />
              <Tab label={TAB_REGISTER.VAN_BANG.LABEL} className="tab-label" />
            </Tabs>
            {value === TAB_REGISTER.HO_SO.KEY && (
              <DialogContent dividers className="tab-content">
                <ValidatorForm>
                  <ProfileForm
                    employee={employee}
                    setEmployee={setEmployee}
                    submitRef={submitRef}
                    isViewMode={isViewMode}
                  />
                </ValidatorForm>
              </DialogContent>
            )}
            {value === TAB_REGISTER.SO_YEU_LY_LICH.KEY && (
              <DialogContent dividers className="tab-content">
                <InformationForm employeeDetail={employeeDetail} />
              </DialogContent>
            )}
            {value === TAB_REGISTER.VAN_BANG.KEY && (
              <DialogContent dividers className="tab-content">
                <CertificateForm employeeDetail={employeeDetail} />
              </DialogContent>
            )}
          </Box>
        </Paper>
        <DialogActions
          spacing={4}
          className="flex flex-end flex-middle button-center-register"
        >
          {Number(employee?.submitProfileStatus) === STATUS_EMPLOYEE.DA_KET_THUC.CODE &&
            decision && (
              <Button
                color="primary"
                variant="contained"
                onClick={handleOpenSubMissionDialog}
              >
                Nộp lưu
              </Button>
            )}
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={() => submitRef?.current?.click()}
            className={isViewMode ? "hidden" : ""}
          >
            Lưu
          </Button>
          {(employee?.skill && employee?.activity) && (
            <Button
              color="primary"
              variant="contained"
              onClick={handleOpenSubmitLeaderDialog}
              className={isViewMode ? "hidden" : ""}
            >
              Trình lãnh đạo
            </Button>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseRegisterDialog}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
      {openSubmitLeaderDialog && (
        <SubmitLeaderDialog
          open={openSubmitLeaderDialog}
          handleCloseSubmitLeaderDialog={handleCloseSubmitLeaderDialog}
          employee={employee}
          setEmployee={setEmployee}
          handleCloseRegisterDialog={handleCloseRegisterDialog}
          handleCloseEmployeeDialog={handleCloseEmployeeDialog}
        />
      )}
      {openSubMissionDialog && (
        <SubMissionDialog
          open={openSubMissionDialog}
          handleCloseSubMissionDialog={handleCloseSubMissionDialog}
          employee={employee}
          setEmployee={setEmployee}
          handleCloseRegisterDialog={handleCloseRegisterDialog}
        />
      )}
    </div>
  );
};

export default RegisterEmployee;
