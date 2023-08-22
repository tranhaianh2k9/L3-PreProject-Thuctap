import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";
import { updateEmployees } from "app/redux/actions/EmployeeActions";
import {
  STATUS_EMPLOYEE,
  STATUS_OF_PENDING
} from "app/Constants/ListStatus";
import {updateSalaryIncreaseRequest} from 'app/redux/actions/SalaryIncreaseAction';
import {updateProcessRequest} from "app/redux/actions/ProcessAction"; 
import {updateProposalRequest} from "app/redux/actions/ProposalAction";
import { ACTION_PROCESS, ACTION_PROPOSAL, ACTION_SALARY_INCREASE } from 'app/Constants/ListNameTab';

const AdditionalDialog = ({ open, onClose, employee, statusOfForm, closeDialogDetail }) => {
  const [additionalInput, setAdditionalInput] = useState("");
  const dispatch = useDispatch();

  const handleAdditionalSubmit = () => {
    switch (statusOfForm) {
      case ACTION_SALARY_INCREASE:
        const salaryIncreaseData = {
          ...employee,
          additionalRequest: additionalInput,
          salaryIncreaseStatus: STATUS_EMPLOYEE.YEU_CAU_BO_SUNG.CODE,
        };
        dispatch(updateSalaryIncreaseRequest(salaryIncreaseData));
        break;
  
      case ACTION_PROPOSAL:
        const proposalData = {
          ...employee,
          additionalRequest: additionalInput,
          proposalStatus: STATUS_EMPLOYEE.YEU_CAU_BO_SUNG.CODE,
        };
        dispatch(updateProposalRequest(proposalData));
        break;
  
      case ACTION_PROCESS:
        const processData = {
          ...employee,
          additionalRequest: additionalInput,
          processStatus: STATUS_EMPLOYEE.YEU_CAU_BO_SUNG.CODE,
        };
        dispatch(updateProcessRequest(processData));
        break;
        default:
    if (Number(employee?.submitProfileStatus) === STATUS_EMPLOYEE.CHO_DUYET.CODE) {
      const dataTemp = {
        ...employee,
        additionalRequest: additionalInput,
        submitProfileStatus: STATUS_EMPLOYEE.YEU_CAU_BO_SUNG.CODE,
      };
      dispatch(updateEmployees(dataTemp, STATUS_OF_PENDING));
    } else if (Number(employee?.submitProfileStatus)=== STATUS_EMPLOYEE.CHO_DUYET_KET_THUC.CODE) {
      const dataTemp = {
        ...employee,
        additionalRequestTermination: additionalInput,
        submitProfileStatus: STATUS_EMPLOYEE.YEU_CAU_BO_SUNG_KET_THUC.CODE,
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
        <DialogTitle> <span className="styleColor">Yêu cầu bổ sung</span></DialogTitle>
        <ValidatorForm onSubmit={handleAdditionalSubmit}>
          <DialogContent className="no-scroll-dialog">
            <TextValidator
              label="Nội dung yêu cầu bổ sung"
              type="additional"
              value={additionalInput}
              onChange={(e) => setAdditionalInput(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
              validators={["required"]}
              errorMessages={["Nội dung yêu cầu không được bỏ trống"]}
            />
          </DialogContent>
          <DialogActions className="mt-12">
            <Button
              className="mr-12 "
              color="primary"
              variant="contained"
              type="submit"
            >
              Xác nhận
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

export default AdditionalDialog;
