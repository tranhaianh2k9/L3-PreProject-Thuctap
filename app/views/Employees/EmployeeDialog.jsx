import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import "../../../styles/views/_pending.scss";
import { Close as CloseIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { Tab, Tabs } from "@mui/material";
import { ValidatorForm } from "react-material-ui-form-validator";
import EmployeeForm from "./TabPanelForm/EmployeeForm";
import AddCertificateForm from "./TabPanelForm/AddCertificateForm";
import FamilyRelationshipForm from "./TabPanelForm/FamilyRelationshipForm";
import { useDispatch } from "react-redux";
import {
  addEmployees,
  updateEmployees,
} from "app/redux/actions/EmployeeActions";
import RegisterEmployee from "../RegisterEmployees/RegisterEmployee";
import { STATUS_OF_EMPLOYEE } from "app/Constants/ListStatus";
import { toast } from "react-toastify";
import { countObjectKeys } from "utils";
import { TAB_EMPLOYEE } from "app/Constants/ListTab";
import { TOTAL_OBJECTS_KEY_EMPLOYEE } from "app/Constants/ListSelectItem";
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
const EmployeeDialog = ({
  open,
  onClose,
  employee,
  setEmployee,
  certificate,
  setCertificate,
  family,
  setFamily,
  isViewMode,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    if (!checkEmployees() && newValue !== 0) {
      toast.warning("Nhập đầy đủ thông tin nhân viên");
      return;
    }
    setValue(newValue);
  };

  const handleClose = () => {
    setCertificate([]);
    onClose();
  };
  // Employee logic
  const handleInputChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataTemp = {
      ...employee,
      id: employee?.id || null,
      certificatesDto: certificate,
      employeeFamilyDtos: family,
    };
    if (employee?.id) {
      dispatch(updateEmployees(dataTemp, STATUS_OF_EMPLOYEE));
    } else {
      dispatch(addEmployees(dataTemp));
    }
  };
  const checkEmployees = () => {
    const excludedKeys = [
      "id",
      "image",
      "certificatesDto",
      "employeeFamilyDtos",
    ];
    return (
      countObjectKeys(employee, excludedKeys) >=
        TOTAL_OBJECTS_KEY_EMPLOYEE.KEY &&
      (value !== 0 || value === 0)
    );
  };

  const handleOpenRegisterDialog = async () => {
    const dataTemp = {
      ...employee,
    };
    try {
      await dispatch(updateEmployees(dataTemp, STATUS_OF_EMPLOYEE));
      setOpenRegisterDialog(true);
    } catch (error) {
      toast.error("Cập nhật không thành công!");
    }
  };
  const handleCloseRegisterDialog = () => {
    setOpenRegisterDialog(false);
  };
  const title = (employee?.id ? t("general.update") : t("Add")) + " nhân viên";
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth={"lg"}
        fullWidth={true}
        className="no-scroll-dialog"
      >
        <DialogTitle id="form-dialog-title">
          <span className="mb-20 styleColor">
            {isViewMode ? "Xem thông tin nhân viên" : title}
          </span>
          <IconButton aria-label="close" className={classes.iconClose}>
            <CloseIcon color="error" onClick={handleClose} />
          </IconButton>
        </DialogTitle>

        <Tabs
          value={value}
          onChange={handleChange}
          centered
          variant="fullWidth"
          textColor="inherit"
        >
          <Tab label={TAB_EMPLOYEE.NHAN_VIEN.LABEL} />
          <Tab label={TAB_EMPLOYEE.CHUNG_CHI.LABEL} />
          <Tab label={TAB_EMPLOYEE.GIA_DINH.LABEL} />
        </Tabs>

        {value === TAB_EMPLOYEE.CHUNG_CHI.KEY && (
          <DialogContent dividers>
            <AddCertificateForm
              employee={employee}
              certificate={certificate}
              setCertificate={setCertificate}
              isViewMode={isViewMode}
            />
          </DialogContent>
        )}

        {value === TAB_EMPLOYEE.GIA_DINH.KEY && (
          <DialogContent dividers>
            <FamilyRelationshipForm
              employee={employee}
              family={family}
              setFamily={setFamily}
              isViewMode={isViewMode}
            />
          </DialogContent>
        )}

        <ValidatorForm onSubmit={handleSubmit}>
          {value === TAB_EMPLOYEE.NHAN_VIEN.KEY && (
            <DialogContent dividers>
              <EmployeeForm
                handleInputChange={handleInputChange}
                employee={employee}
                setEmployee={setEmployee}
                isViewMode={isViewMode}
              />
            </DialogContent>
          )}

          <DialogActions
            spacing={4}
            className="flex flex-end flex-middle button-center"
          >
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isViewMode}
            >
              Lưu
            </Button>
            {employee?.id && (
              <Button
                variant="contained"
                onClick={handleOpenRegisterDialog}
                disabled={isViewMode}
                color="primary"
              >
                Đăng ký
              </Button>
            )}
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Hủy
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
      {openRegisterDialog && (
        <RegisterEmployee
          open={openRegisterDialog}
          employee={employee}
          setEmployee={setEmployee}
          handleCloseRegisterDialog={handleCloseRegisterDialog}
          handleCloseEmployeeDialog={onClose}
        />
      )}
    </div>
  );
};

export default EmployeeDialog;
