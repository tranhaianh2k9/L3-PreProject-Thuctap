import React, { useState, useEffect, useRef } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addExperience, editExperience } from "app/redux/api/apiExperiences";
import moment from "moment";
import { removeMultipleSpaces } from "../../../../../utils/handleGeneral";
const useStyles = makeStyles((theme) => ({
  customTextField: {
    "& .MuiFormLabel-root": {
      color: "#333 !important", // Màu chữ tùy chỉnh
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#333", // Màu outline khi focus
      },
    },
  },
}));

const ExperiencesForm = ({
  onClose,
  experiences,
  employeeId,
  handleGetExperience,
}) => {
  const classes = useStyles();
  const [experiencesData, setExperiencesData] = useState({
    companyName: "",
    startDate: "",
    endDate: "",
    jobDescription: "",
    companyAddress: "",
  });
  const [endDateError, setEndDateError] = useState("");
  const formRef = useRef();

  useEffect(() => {
    if (experiences?.id) {
      setExperiencesData({
        ...experiences,
        startDate: moment(experiences.startDate).format("YYYY-MM-DD"),
        endDate: moment(experiences.endDate).format("YYYY-MM-DD"),
      });
    }
  }, [experiences]);

  const handleChangeExperience = (e) => {
    setExperiencesData({
      ...experiencesData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "endDate") {
      const endDateValue = e.target.value;
      const isEndDateValid = moment(experiencesData.startDate).isSameOrBefore(
        moment(endDateValue)
      );
      if (!isEndDateValid) {
        setEndDateError("Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.");
      } else {
        setEndDateError("");
      }
    }
    if (e.target.name === "startDate") {
      const startDateValue = e.target.value;
      const isEndDateValid = moment(startDateValue).isSameOrBefore(
        moment(experiencesData.endDate)
      );
      if (!isEndDateValid) {
        setEndDateError("Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.");
      } else {
        setEndDateError("");
      }
    }
    if (e.target.name === "jobDescription") {
      setExperiencesData({
        ...experiencesData,
        [e.target.name]: removeMultipleSpaces(e.target.value),
      });
    }
  };
  const handleAddExperience = async () => {
    const dataTemp = {
      ...experiencesData,
      jobDescription: experiencesData?.jobDescription.trim(),
      leavingReason: "Moi truong khong hop",
    };
    const response = await addExperience(employeeId, [dataTemp]);
    if (response?.code === 200) {
      handleGetExperience();
      toast.success("Thêm kinh nghiệm làm việc thành công!");
    } else {
      toast.error(response?.message);
    }
    onClose();
  };
  const handleEditExperience = async () => {
    const dataTemp = {
      ...experiencesData,
      jobDescription: experiencesData?.jobDescription.trim(),
    };
    const response = await editExperience(dataTemp);
    if (response?.code === 200) {
      handleGetExperience();
      toast.success("Sửa kinh nghiệm làm việc thành công!");
    } else {
      toast.error(response?.message);
    }

    onClose();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (endDateError) {
      return;
    }
    if (experiencesData?.id) {
      handleEditExperience();
    } else {
      handleAddExperience();
    }
  };
  return (
    <div>
      <ValidatorForm ref={formRef} onSubmit={handleSubmit} className="mb-16">
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
              className={classes.customTextField}
              name="startDate"
              type="date"
              label={
                <span>
                  <span className="red-color"> * </span>
                  Ngày bắt đầu
                </span>
              }
              value={experiencesData.startDate || ""}
              onChange={handleChangeExperience}
              fullWidth
              validators={["required"]}
              errorMessages={["Vui lòng chọn ngày bắt đầu"]}
              placeholder="Chọn ngày bắt đầu"
              size="small"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: {
                  max: moment().format("YYYY-MM-DD"),
                },
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
              className={classes.customTextField}
              name="endDate"
              type="date"
              label={
                <span>
                  <span className="red-color"> * </span>
                  Ngày kết thúc
                </span>
              }
              value={experiencesData.endDate || ""}
              onChange={handleChangeExperience}
              fullWidth
              validators={["required"]}
              errorMessages={["Vui lòng chọn ngày kết thúc"]}
              placeholder="Chọn ngày kết thúc"
              size="small"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: {
                  max: moment().format("YYYY-MM-DD"),
                },
              }}
              helperText={endDateError}
              error={!!endDateError}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
              className={classes.customTextField}
              name="companyName"
              label={
                <span>
                  <span className="red-color"> * </span>
                  Tên công ty
                </span>
              }
              value={experiencesData?.companyName || ""}
              onChange={handleChangeExperience}
              fullWidth
              validators={["required", "maxStringLength:50"]}
              errorMessages={[
                "Vui lòng nhập tên công ty",
                "Tên công ty không quá 50 ký tự",
              ]}
              placeholder="Nhập tên công ty"
              size="small"
              variant="outlined"
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
              className={classes.customTextField}
              name="companyAddress"
              label={
                <span>
                  <span className="red-color"> * </span>
                  Địa chỉ
                </span>
              }
              value={experiencesData?.companyAddress || ""}
              onChange={handleChangeExperience}
              fullWidth
              validators={["required", "maxStringLength:60"]}
              errorMessages={[
                "Vui lòng nhập địa chỉ công ty",
                "Địa chỉ không quá 60 ký tự",
              ]}
              placeholder="Nhập địa chỉ công ty"
              size="small"
              variant="outlined"
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextValidator
              className={classes.customTextField}
              name="jobDescription"
              label={
                <span>
                  <span className="red-color"> * </span>
                  Mô tả công việc
                </span>
              }
              value={experiencesData?.jobDescription || ""}
              onChange={handleChangeExperience}
              fullWidth
              validators={["required"]}
              errorMessages={["Vui lòng nhập mô tả công việc"]}
              placeholder="Nhập mô tả công việc"
              size="small"
              variant="outlined"
              multiline
            />
          </Grid>
        </Grid>
        <div className="mt-12 flex flex-end">
          <Button type="submit" color="primary" variant="contained">
            Lưu
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={onClose}
            className="ml-8"
          >
            Hủy
          </Button>
        </div>
      </ValidatorForm>
    </div>
  );
};

export default ExperiencesForm;
