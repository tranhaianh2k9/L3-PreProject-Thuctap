import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import "../../Validate/Validate";
import {
  STATUS_EMPLOYEE,
} from "../../Constants/ListStatus";
import moment from "moment";
import { Close as CloseIcon } from "@material-ui/icons";
import "../../../styles/views/_style.scss";

const useStyles = makeStyles({
  redColor: {
    color: "red",
  },
  iconClose: { position: "absolute", right: 8, top: 8 },
});

const EndEmployeeDialog = ({ open, onClose, employeeDetail }) => {
  const styleClass = useStyles();

  const isAdditionalEndEmployee =
  Number(employeeDetail?.submitProfileStatus) === STATUS_EMPLOYEE.YEU_CAU_BO_SUNG_KET_THUC.CODE ||
  [
    employeeDetail?.salaryIncreaseStatus,
    employeeDetail?.processStatus,
    employeeDetail?.proposalStatus,
  ].includes(Number(STATUS_EMPLOYEE.YEU_CAU_BO_SUNG.CODE));

const isRefuseEndEmployee =
Number(employeeDetail?.submitProfileStatus) ===STATUS_EMPLOYEE.TU_CHOI_KET_THUC.CODE ||
  [
    employeeDetail?.salaryIncreaseStatus,
    employeeDetail?.processStatus,
    employeeDetail?.proposalStatus,
  ].includes(Number(STATUS_EMPLOYEE.DA_TU_CHOI.CODE));

return (
  <div>
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle id="draggable-dialog-title">
        <span className="styleColor">Quyết định của lãnh đạo</span>
        <IconButton aria-label="close" className={styleClass.iconClose}>
          <CloseIcon color="error" onClick={onClose} />
        </IconButton>
      </DialogTitle>
      <DialogContent className="no-scroll-dialog" dividers>
        {isAdditionalEndEmployee && (
          <Grid container className="mb-10">
            <Grid item xs={12}>
              <div className="mb-10 mt-14">
                <Typography className="text-of-form-manage">
                  Yêu cầu bổ sung:{" "}
                  {employeeDetail?.additionalRequestTermination ||
                    employeeDetail?.additionalRequest}
                </Typography>
              </div>
            </Grid>
          </Grid>
        )}
        {isRefuseEndEmployee && (
          <Grid container className="mb-10">
            <Grid item xs={12}>
              <div className="mb-10 mt-14">
                <Typography className="text-of-form-manage">
                  Ngày từ chối:{" "}
                  {moment(
                    employeeDetail?.refuseEndProfileDay ||
                      employeeDetail?.rejectionDate
                  ).format("YYYY-MM-DD")}
                </Typography>
              </div>
              <div className="mb-10 mt-14">
                <Typography className="text-of-form-manage">
                  Lý do từ chối:{" "}
                  {employeeDetail?.reasonForRefuseEndProfile ||
                    employeeDetail?.reasonForRefusal}
                </Typography>
              </div>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions className="mt-12">
        <Button
          onClick={onClose}
          variant="contained"
          className="mr-12"
          color="secondary"
        >
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
};

export default EndEmployeeDialog;