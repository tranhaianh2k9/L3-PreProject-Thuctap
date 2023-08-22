import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  makeStyles,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import {
  TextValidator,
  ValidatorForm,
  SelectValidator,
} from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAllLeadersRequest } from "app/redux/actions/LeaderAction";
import { LEADER_POSITION } from "app/Constants/ListSelectItem";
import {
  STATUS_EMPLOYEE,
  STATUS_OF_EMPLOYEE,
  STATUS_OF_MANAGE_EMPLOYEE,
} from "app/Constants/ListStatus";
import { updateEmployees } from "app/redux/actions/EmployeeActions";
import {
  EDIT_END_EMPLOYEE,
  EDIT_PROCESS,
  EDIT_PROPOSAL,
  EDIT_SALARY_INCREASE,
} from "app/Constants/ListNameTab";
import { updateSalaryIncreaseRequest } from "app/redux/actions/SalaryIncreaseAction";
import { updateProposalRequest } from "app/redux/actions/ProposalAction";
import { updateProcessRequest } from "app/redux/actions/ProcessAction";
const useStyles = makeStyles({
  colorStyle: {
    color: "red",
  },
  iconClose: {
    position: "absolute",
    right: 8,
    top: 8,
  },
});
const SubmitLeaderDialog = ({
  open,
  handleCloseSubmitLeaderDialog,
  closeFormRequest,
  employee,
  setEmployee,
  handleCloseRegisterDialog,
  handleCloseEmployeeDialog,
  statusOfForm,
}) => {
  const classes = useStyles();
  const [submitDataForm, setSubmitDataForm] = useState({
    submitDay: moment(new Date()).format("YYYY-MM-DD"),
    leaderId: "",
    leaderName: "",
    leaderPosition: "",
    submitContent: "",
  });
  const dispatch = useDispatch();
  const leaderReducer = useSelector((state) => state.leaders.leadersItem);

  useEffect(() => {
    dispatch(getAllLeadersRequest());
  }, [dispatch]);

  const handleInputChange = (e) => {
    if (e.target.name === "leaderId") {
      setSubmitDataForm({
        ...submitDataForm,
        [e.target.name]: e.target.value,
        leaderName: leaderReducer.find((item) => item.id === e.target.value)
          ?.leaderName,
        leaderPosition: leaderReducer.find((item) => item.id === e.target.value)
          ?.leaderPosition,
      });
    } else {
      setSubmitDataForm({
        ...submitDataForm,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = () => {
    const commonData = {
      ...employee,
      submitDay: submitDataForm?.submitDay,
      leaderId: submitDataForm?.leaderId,
      leaderName: submitDataForm?.leaderName,
      submitContent: submitDataForm?.submitContent,
    };

    let specificData = {};
    let updateAction = null;

    switch (statusOfForm) {
      case EDIT_END_EMPLOYEE:
        specificData = {
          ...commonData,
          leaderPosition: submitDataForm?.leaderPosition,
          submitProfileStatus: STATUS_EMPLOYEE.CHO_DUYET_KET_THUC.CODE,
        };
        updateAction = updateEmployees;
        break;
      case EDIT_SALARY_INCREASE:
        specificData = {
          ...commonData,
          salaryIncreaseStatus: STATUS_EMPLOYEE.CHO_DUYET.CODE,
        };
        updateAction = updateSalaryIncreaseRequest;
        break;
      case EDIT_PROCESS:
        specificData = {
          ...commonData,
          processStatus: STATUS_EMPLOYEE.CHO_DUYET.CODE,
        };
        updateAction = updateProcessRequest;
        break;
      case EDIT_PROPOSAL:
        specificData = {
          ...commonData,
          proposalStatus: STATUS_EMPLOYEE.CHO_DUYET.CODE,
        };
        updateAction = updateProposalRequest;
        break;
      default:
        specificData = {
          ...commonData,
          leaderPosition: submitDataForm?.leaderPosition,
          submitProfileStatus: STATUS_EMPLOYEE.CHO_DUYET.CODE,
        };
        updateAction = updateEmployees;
        handleCloseEmployeeDialog();
        break;
    }
    if (!statusOfForm) {
      dispatch(updateAction(specificData, STATUS_OF_EMPLOYEE));
    } else if (statusOfForm === EDIT_END_EMPLOYEE) {
      dispatch(updateAction(specificData, STATUS_OF_MANAGE_EMPLOYEE));
      handleCloseRegisterDialog()
    } else {
      dispatch(updateAction(specificData, specificData?.employeeId));
      handleCloseSubmitLeaderDialog();
    }

    if (
      statusOfForm === EDIT_SALARY_INCREASE ||
      statusOfForm === EDIT_PROCESS ||
      statusOfForm === EDIT_PROPOSAL
    ) {
      closeFormRequest();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseSubmitLeaderDialog}
        aria-labelledby="form-dialog-title"
        maxWidth={"md"}
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">
          <span className="mb-20 styleColor">Trình lãnh đạo</span>
          <IconButton aria-label="close" className={classes.iconClose}>
            <CloseIcon color="error" onClick={handleCloseSubmitLeaderDialog} />
          </IconButton>
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextValidator
                  name="submitDay"
                  type="date"
                  label={
                    <span>
                      <span className="red-color"> * </span>
                      Ngày trình lãnh đạo
                    </span>
                  }
                  value={submitDataForm?.submitDay}
                  onChange={handleInputChange}
                  fullWidth
                  validators={["required"]}
                  errorMessages={["Vui lòng chọn ngày trình"]}
                  placeholder="Chọn ngày trình"
                  size="small"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputProps: {
                      min: moment().format("YYYY-MM-DD"),
                    },
                  }}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <FormControl fullWidth>
                  <SelectValidator
                    name="leaderId"
                    value={submitDataForm?.leaderId || ""}
                    label={
                      <span>
                        <span className="red-color"> * </span>
                        Tên lãnh đạo
                      </span>
                    }
                    onChange={handleInputChange}
                    validators={["required"]}
                    errorMessages={["Vui lòng chọn lãnh đạo"]}
                    size="small"
                    variant="outlined"
                    fullWidth
                  >
                    {leaderReducer &&
                      leaderReducer.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item.leaderName}
                          </MenuItem>
                        );
                      })}
                  </SelectValidator>
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextValidator
                  name="leaderPosition"
                  label={
                    <span>
                      <span className="red-color"> * </span>
                      Chức vụ
                    </span>
                  }
                  value={
                    LEADER_POSITION.find(
                      (item) => item.id === submitDataForm?.leaderPosition
                    )?.name || ""
                  }
                  onChange={handleInputChange}
                  fullWidth
                  validators={["required"]}
                  errorMessages={["Vui lòng nhập chức vụ"]}
                  placeholder="Nhập chức vụ"
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextValidator
                  name="submitContent"
                  label={
                    <span>
                      <span className="red-color"> * </span>
                      Nội dung
                    </span>
                  }
                  value={submitDataForm?.submitContent || ""}
                  onChange={handleInputChange}
                  fullWidth
                  validators={["required"]}
                  errorMessages={["Vui lòng nhập nội dung"]}
                  placeholder="Nhập nội dung"
                  size="small"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            spacing={4}
            className="flex flex-end flex-middle button-center"
          >
            <Button type="submit" color="primary" variant="contained">
              Gửi
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseSubmitLeaderDialog}
            >
              Hủy
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};

export default SubmitLeaderDialog;
