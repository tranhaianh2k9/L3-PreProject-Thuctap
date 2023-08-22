import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import moment from "moment";
import { useDispatch } from "react-redux";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { updateEmployees } from "app/redux/actions/EmployeeActions";
import { STATUS_EMPLOYEE, STATUS_OF_PENDING } from "app/Constants/ListStatus";
import { ACTION_PROCESS, ACTION_PROPOSAL, ACTION_SALARY_INCREASE } from 'app/Constants/ListNameTab';
import {updateSalaryIncreaseRequest} from 'app/redux/actions/SalaryIncreaseAction';
import {updateProcessRequest} from "app/redux/actions/ProcessAction"; 
import {updateProposalRequest} from "app/redux/actions/ProposalAction";
import { removeMultipleSpaces } from "utils/handleGeneral";

const RefuseDialog = ({
  open,
  onClose,
  employee,
  statusOfForm,
  closeDialogDetail,
}) => {
  const [refuseInput, setRefuseInput] = useState({
    rejectionDate: moment(new Date()).format("YYYY-MM-DD"),
    reasonForRejection: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setRefuseInput({
      ...refuseInput,
      [e.target.name]: removeMultipleSpaces(e.target.value) ,
    });
  };

  const handleRefuseSubmit = () => {
    switch (statusOfForm) {
      case ACTION_SALARY_INCREASE:
        const salaryIncreaseData = {
          ...employee,
          reasonForRefusal: refuseInput?.reasonForRejection,
          rejectionDate: refuseInput?.rejectionDate,
          salaryIncreaseStatus: STATUS_EMPLOYEE.DA_TU_CHOI.CODE,
        };
        dispatch(updateSalaryIncreaseRequest(salaryIncreaseData));
        break;
  
      case ACTION_PROPOSAL:
        const proposalData = {
          ...employee,
          reasonForRefusal: refuseInput?.reasonForRejection,
          rejectionDate:refuseInput?.rejectionDate,
          proposalStatus: STATUS_EMPLOYEE.DA_TU_CHOI.CODE,
        };
        dispatch(updateProposalRequest(proposalData));
        break;
        
      case ACTION_PROCESS:
        const processData = {
          ...employee,
          reasonForRefusal: refuseInput?.reasonForRejection,
          rejectionDate:refuseInput?.rejectionDate,
          processStatus: STATUS_EMPLOYEE.DA_TU_CHOI.CODE,
        };
        dispatch(updateProcessRequest(processData));
        break;

        default:
    if (Number(employee?.submitProfileStatus) === STATUS_EMPLOYEE.CHO_DUYET.CODE) {
      const dataTemp = {
        ...employee,
        rejectionDate: refuseInput?.rejectionDate,
        reasonForRejection: refuseInput?.reasonForRejection,
        submitProfileStatus: STATUS_EMPLOYEE.DA_TU_CHOI.CODE
      };
      dispatch(updateEmployees(dataTemp, STATUS_OF_PENDING));
    }else if (Number(employee?.submitProfileStatus) ===  STATUS_EMPLOYEE.CHO_DUYET_KET_THUC.CODE){
      const dataTemp = {
        ...employee,
        refuseEndProfileDay: refuseInput?.rejectionDate,
        reasonForRefuseEndProfile: refuseInput?.reasonForRejection,
        submitProfileStatus: STATUS_EMPLOYEE.TU_CHOI_KET_THUC.CODE
      };
      dispatch(updateEmployees(dataTemp, STATUS_OF_PENDING));
    }
    break;
}
    closeDialogDetail();
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle><span className="styleColor">Từ chối</span></DialogTitle>
        <ValidatorForm onSubmit={handleRefuseSubmit}>
          <DialogContent className="no-scroll-dialog">
            <TextValidator
              className="mb-16 bold-value-textfield"
              label="Ngày từ chối"
              type="date"
              name="rejectionDate"
              value={refuseInput?.rejectionDate}
              onChange={handleInputChange}
              fullWidth
              size="small"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              validators={["required", "isAfterOrEqualToToday"]}
              errorMessages={[
                "Ngày từ chối không được bỏ trống",
                "Ngày từ chối phải sau hoặc bằng ngày hôm nay",
              ]}
              placeholder="Chọn ngày từ chối"
            />
            <TextValidator
              label="Lý do từ chối"
              name="reasonForRejection"
              value={refuseInput?.reasonForRejection}
              onChange={handleInputChange}
              fullWidth
              size="small"
              variant="outlined"
              validators={["required"]}
              errorMessages={["Lý do Kết thúc không được bỏ trống"]}
            />
          </DialogContent>
          <DialogActions className="mt-12">
            <Button
              className="mr-12 "
              color="primary"
              variant="contained"
              type="submit"
            >
              Xác Nhận
            </Button>
            <Button
              onClick={onClose}
              variant="contained"
              className="mr-12"
              color="secondary"
            >
              Hủy
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};

export default RefuseDialog;
