import React, { useState } from "react";
import {
  Grid,
  Dialog,
  DialogTitle,
  IconButton,
  makeStyles,
  DialogActions,
  Button,
  DialogContent,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import ApproveDialog from "../Pending/ActionDialog/ApproveDialog";
import AdditionalDialog from "../Pending/ActionDialog/AdditionalDialog";
import RefuseDialog from "../Pending/ActionDialog/RefuseDialog";
import EmployeeDetailDialog from "../Pending/EmployeeDialog/EmployeeInfoDialog";
import {
  VIEW_ONLY,
  EDIT_END_EMPLOYEE,
  EDIT_SALARY_INCREASE,
  EDIT_PROCESS,
  EDIT_PROPOSAL,
  statusesForSubmitLeader,
  statusesForLeaderAction,
  statusOpenFormSalary,
  statusOpenFormProcess,
  statusOpenFormProposal,
  statusOpenFormEnd,
} from "app/Constants/ListNameTab";
import SalaryIncreaseForm from "./SalaryIncreaseForm";
import ProcessForm from "./ProcessForm";
import EndForm from "./EndForm";
import "../../../styles/views/_formReneral.scss";
import { STATUS_EMPLOYEE } from "../../Constants/ListStatus";

import { toast } from "react-toastify";
import { isAfterOrEqualToToday } from "app/Validate/Validate";
import ProposalForm from "./ProposalForm";
import SubmitLeaderDialog from "../RegisterEmployees/SubmitLeaderDialog";

const useStyles = makeStyles({
  redColor: {
    color: "red",
  },
  iconClose: { position: "absolute", right: 8, top: 8 },
});

const GeneralOfRequestLetter = ({
  open,
  onClose,
  requestOfEmployeeData,
  statusOfForm,
  closeFormRequest,
  employeeData,
}) => {
  const styleClass = useStyles();
  const [dataTemp, setDataTemp] = useState(requestOfEmployeeData);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [openAdditionalDialog, setOpenAdditionalDialog] = useState(false);
  const [openRefuseDialog, setOpenRefuseDialog] = useState(false);
  const [openSubmitLeaderDialog, setOpenSubmitLeaderDialog] = useState(false);
  const [openEmployeeDetailDialog, setOpenEmployeeDetailDialog] =
    useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleApproveDialogOpen = () => {
    setOpenApproveDialog(true);
  };
  const handleApproveDialogClose = () => {
    setOpenApproveDialog(false);
  };
  const handleAdditionalDialogOpen = () => {
    setOpenAdditionalDialog(true);
  };
  const handleAdditionalDialogClose = () => {
    setOpenAdditionalDialog(false);
  };

  const handleRefuseDialogOpen = () => {
    setOpenRefuseDialog(true);
  };
  const handleRefuseDialogClose = () => {
    setOpenRefuseDialog(false);
  };
  const handleEmployeeDetailDialogOpen = () => {
    setOpenEmployeeDetailDialog(true);
  };
  const handleEmployeeDetailDialogClose = () => {
    setOpenEmployeeDetailDialog(false);
  };
  const handleSubmitLeaderDialogClose = () => {
    setOpenSubmitLeaderDialog(false);
  };

  const validateFormSubmitLeader = () => {
    const isEndDayEmpty = !dataTemp?.endDay;
    const isEndDayInPast = !isAfterOrEqualToToday(dataTemp?.endDay);
    const isReasonForEndingEmpty = !dataTemp?.reasonForEnding;
    if (isEndDayEmpty) {
      toast.error("Ngày kết thúc không được để trống");
      return false;
    } else if (isEndDayInPast) {
      toast.error("Ngày kết thúc không được là quá khứ");
      return false;
    } else if (isReasonForEndingEmpty) {
      toast.error("Lý do kết thúc không được để trống");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmission = () => {
    if (statusOfForm === EDIT_END_EMPLOYEE) {
      if (validateFormSubmitLeader()) setOpenSubmitLeaderDialog(true);
    } else if (statusOfForm === EDIT_SALARY_INCREASE) {
      const isStartDayInPast = !isAfterOrEqualToToday(dataTemp?.startDate);
      if (isStartDayInPast) {
        toast.error("Ngày Đề xuất không được là quá khứ");
      } else {
        setOpenSubmitLeaderDialog(true);
      }
    } else if (statusOfForm === EDIT_PROCESS) {
      const isPromotionDayInPast = !isAfterOrEqualToToday(
        dataTemp?.promotionDay
      );
      if (isPromotionDayInPast) {
        toast.error("Ngày Đề xuất không được là quá khứ");
      } else {
        setOpenSubmitLeaderDialog(true);
      }
    } else if (statusOfForm === EDIT_PROPOSAL) {
      const isProposalDateInPast = !isAfterOrEqualToToday(
        dataTemp?.proposalDate
      );
      if (isProposalDateInPast) {
        toast.error("Ngày Đề xuất không được là quá khứ");
      } else {
        setOpenSubmitLeaderDialog(true);
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
      <DialogTitle id="draggable-dialog-title">
        <span className="styleColor">Yêu cầu của nhân viên </span>
        <IconButton aria-label="close" className={styleClass?.iconClose}>
          <CloseIcon color="error" onClick={handleClose} />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {statusOpenFormSalary.includes(statusOfForm) && (
          <SalaryIncreaseForm
            statusOfForm={statusOfForm}
            salaryIncreaseData={dataTemp}
            setSalaryIncreaseData={setDataTemp}
          />
        )}

        {statusOpenFormProcess.includes(statusOfForm) && (
          <ProcessForm
            processDetail={requestOfEmployeeData}
            setSalaryIncreaseData={setDataTemp}
          />
        )}
        {statusOpenFormProposal.includes(statusOfForm) && (
          <ProposalForm
            proposalDetail={requestOfEmployeeData}
            setSalaryIncreaseData={setDataTemp}
          />
        )}
        {statusOpenFormEnd.includes(statusOfForm) && (
          <EndForm
            endData={dataTemp}
            setEndData={setDataTemp}
            statusOfForm={statusOfForm}
          />
        )}
      </DialogContent>
      <DialogActions className="mt-12">
        <Grid container className="button-center">
          {statusesForLeaderAction.includes(statusOfForm) && (
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={handleEmployeeDetailDialogOpen}
                className="mr-12"
              >
                Hồ sơ
              </Button>
              <Button
                className="mr-12"
                color="primary"
                variant="contained"
                onClick={handleApproveDialogOpen}
              >
                Phê duyệt
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAdditionalDialogOpen}
                className="mr-12"
              >
                Yêu cầu bổ sung
              </Button>
              <Button
                className="mr-12 buttonColorRed"
                color="error"
                variant="contained"
                onClick={handleRefuseDialogOpen}
              >
                Từ chối
              </Button>
            </Grid>
          )}
          {!statusesForSubmitLeader.includes(statusOfForm) ||
          Number(employeeData?.submitProfileStatus) ===
            STATUS_EMPLOYEE.CHO_DUYET_KET_THUC.CODE ? null : (
            <Button
              onClick={handleSubmission}
              variant="contained"
              className="mr-12"
              color="primary"
            >
              {Number(dataTemp?.submitProfileStatus) ===
                STATUS_EMPLOYEE.YEU_CAU_BO_SUNG_KET_THUC.CODE ||
              Number(dataTemp?.submitProfileStatus) ===
                STATUS_EMPLOYEE.TU_CHOI_KET_THUC.CODE
                ? "Gửi lại"
                : "Trình lãnh đạo"}
            </Button>
          )}
          <Button
            onClick={handleClose}
            variant="contained"
            className="mr-12"
            color="secondary"
          >
            Hủy
          </Button>
        </Grid>
      </DialogActions>

      {openApproveDialog && (
        <ApproveDialog
          open={openApproveDialog}
          onClose={() => handleApproveDialogClose()}
          employee={requestOfEmployeeData}
          closeDialogDetail={handleClose}
          statusOfForm={statusOfForm}
        />
      )}
      {openAdditionalDialog && (
        <AdditionalDialog
          open={openAdditionalDialog}
          onClose={() => handleAdditionalDialogClose()}
          employee={requestOfEmployeeData}
          closeDialogDetail={handleClose}
          statusOfForm={statusOfForm}
        />
      )}
      {openRefuseDialog && (
        <RefuseDialog
          open={openRefuseDialog}
          onClose={() => handleRefuseDialogClose()}
          employee={requestOfEmployeeData}
          statusOfForm={statusOfForm}
          closeDialogDetail={handleClose}
        />
      )}
      {openEmployeeDetailDialog && (
        <EmployeeDetailDialog
          open={openEmployeeDetailDialog}
          onClose={() => handleEmployeeDetailDialogClose()}
          employee={requestOfEmployeeData}
          statusOfForm={VIEW_ONLY}
          closeDialogDetail={handleClose}
        />
      )}
      {openSubmitLeaderDialog && (
        <SubmitLeaderDialog
          open={openSubmitLeaderDialog}
          handleCloseSubmitLeaderDialog={handleSubmitLeaderDialogClose}
          employee={dataTemp}
          statusOfForm={statusOfForm}
          handleCloseRegisterDialog={closeFormRequest}
          closeFormRequest={handleClose}
          setEmployee={setDataTemp}
        />
      )}
    </Dialog>
  );
};

export default GeneralOfRequestLetter;
