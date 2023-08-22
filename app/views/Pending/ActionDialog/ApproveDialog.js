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
import { updateEmployees } from "app/redux/actions/EmployeeActions";
import { updateSalaryIncreaseRequest } from "app/redux/actions/SalaryIncreaseAction";
import { updateProcessRequest } from "app/redux/actions/ProcessAction";
import { updateProposalRequest } from "app/redux/actions/ProposalAction";
import { STATUS_EMPLOYEE, STATUS_OF_PENDING } from "app/Constants/ListStatus";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import {
  ACTION_PROCESS,
  ACTION_PROPOSAL,
  ACTION_SALARY_INCREASE,
} from "app/Constants/ListNameTab";

const ApproveDialog = ({
  open,
  onClose,
  employee,
  statusOfForm,
  closeDialogDetail,
}) => {
  const dateNow = moment(new Date()).format("YYYY-MM-DD");
  const dispatch = useDispatch();
  const [dataTemp, setDataTemp] = useState(dateNow);

  const handleChange = (e) => {
    setDataTemp(e.target.value);
  };

  const handleApproveSubmit = () => {
    switch (statusOfForm) {
      case ACTION_SALARY_INCREASE:
        const salaryIncreaseData = {
          ...employee,
          terminationAppointmentDate: dataTemp,
          salaryIncreaseStatus: STATUS_EMPLOYEE.DA_DUYET.CODE,
        };
        dispatch(updateSalaryIncreaseRequest(salaryIncreaseData));
        break;

      case ACTION_PROPOSAL:
        const proposalData = {
          ...employee,
          acceptanceDate: dataTemp,
          proposalStatus: STATUS_EMPLOYEE.DA_DUYET.CODE,
        };
        dispatch(updateProposalRequest(proposalData));
        break;

      case ACTION_PROCESS:
        const processData = {
          ...employee,
          acceptanceDate: dataTemp,
          processStatus: STATUS_EMPLOYEE.DA_DUYET.CODE,
        };
        dispatch(updateProcessRequest(processData));
        break;

      default:
        if (
          Number(employee?.submitProfileStatus) ===
          STATUS_EMPLOYEE.CHO_DUYET_KET_THUC.CODE
        ) {
          const endEmployeeData = {
            ...employee,
            terminationAppointmentDate: dataTemp,
            submitProfileStatus: STATUS_EMPLOYEE.DA_KET_THUC.CODE,
          };
          dispatch(updateEmployees(endEmployeeData, STATUS_OF_PENDING));
        } else if (
          Number(employee?.submitProfileStatus) ===
          STATUS_EMPLOYEE.CHO_DUYET.CODE
        ) {
          const addEmployeeData = {
            ...employee,
            appointmentDate: dataTemp || dateNow,
            submitProfileStatus: STATUS_EMPLOYEE.DA_DUYET.CODE,
          };
          dispatch(updateEmployees(addEmployeeData, STATUS_OF_PENDING));
        }
        break;
    }
    closeDialogDetail();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {" "}
          <span className="styleColor">Phê duyệt</span>
        </DialogTitle>
        <ValidatorForm onSubmit={handleApproveSubmit}>
          <DialogContent>
            <TextValidator
              label="Ngày phê duyệt"
              type="date"
              fullWidth
              size="small"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={dataTemp ? moment(dataTemp).format("YYYY-MM-DD") : dateNow}
              name="appointmentDate"
              className="bold-value-textfield"
              onChange={handleChange}
              validators={["required", "isAfterOrEqualToToday"]}
              errorMessages={[
                "Ngày phê duyệt không được bỏ trống",
                "Ngày phê duyệt phải sau hoặc bằng ngày hôm nay",
              ]}
              placeholder="Chọn ngày phê duyệt"
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

export default ApproveDialog;
