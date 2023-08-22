import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import moment from "moment";
import ConfirmDialog from "../Component/Dialog/ConfirmDialog";
import {
  STATUS_EMPLOYEE,STATUS_OF_END_EMPLOYEE
} from "app/Constants/ListStatus";
import { useDispatch } from "react-redux";
import { updateEmployees } from "app/redux/actions/EmployeeActions";

const SubMissionDialog = ({
  open,
  handleCloseSubMissionDialog,
  employee,
  handleCloseRegisterDialog,
}) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [decisionInput, setDecisionInput] = useState({
    numberSaved: "",
    decisionDay: moment(new Date()).format("YYYY-MM-DD"),
  });

  const dispatch = useDispatch();

  const title = "Bạn có chắc muốn nộp lưu";

  ValidatorForm.addValidationRule(`matchDecisionCode`, (value) => {
    const regexPattern = employee?.code
      ? new RegExp(`^NL${moment().format("MMYY")}${employee.code.slice(-3)}`)
      : null;

    if (regexPattern && value) {
      return regexPattern.test(value);
    }
    return true;
  });

  const handleInputChange = (e) => {
    setDecisionInput({
      ...decisionInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleDecisionSubmit = () => {
    const dataTemp = {
      ...employee,
      numberSaved: decisionInput?.numberSaved,
      decisionDay: decisionInput?.decisionDay,
      submitProfileStatus: STATUS_EMPLOYEE.DA_NOP_LUU.CODE,
    };
    dispatch(updateEmployees(dataTemp, STATUS_OF_END_EMPLOYEE));
    closeConfirmDialog();
    handleCloseRegisterDialog();
  };

  const handleConfirmation = () => {
    setOpenConfirmDialog(true);
  };
  const closeConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseSubMissionDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Nộp lưu hồ sơ</DialogTitle>
        <ValidatorForm onSubmit={handleConfirmation}>
          <DialogContent className="no-scroll-dialog">
            <TextValidator
              className="mb-16 bold-value-textfield"
              label="Ngày nộp lưu"
              type="date"
              name="decisionDay"
              value={decisionInput?.decisionDay}
              onChange={handleInputChange}
              fullWidth
              size="small"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              disabled
            />
            <TextValidator
              label="Mã nộp lưu"
              name="numberSaved"
              value={decisionInput?.numberSaved}
              onChange={handleInputChange}
              fullWidth
              size="small"
              variant="outlined"
              validators={["required", "matchDecisionCode"]}
              errorMessages={[
                "Mã nộp lưu không được bỏ trống",
                "Mã nộp lưu không hợp lệ. Gợi ý: NL + Tháng hiện tại + Năm hiện tại + 3 số cuối Mã NV",
              ]}
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
              onClick={handleCloseSubMissionDialog}
              variant="contained"
              className="mr-12"
              color="secondary"
            >
              Hủy
            </Button>
          </DialogActions>
        </ValidatorForm>
        {openConfirmDialog && (
          <ConfirmDialog
            open={openConfirmDialog}
            onClose={closeConfirmDialog}
            handleDialogConfirm={handleDecisionSubmit}
            title={title}
          />
        )}
      </Dialog>
    </div>
  );
};

export default SubMissionDialog;
