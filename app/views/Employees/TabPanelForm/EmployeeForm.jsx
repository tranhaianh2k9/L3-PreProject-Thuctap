import React, { useState } from "react";
import "../../../../styles/views/_style.scss";
import { MenuItem, Grid, FormControl, Avatar, Button } from "@material-ui/core";
import {
  SelectValidator,
  TextValidator,
} from "react-material-ui-form-validator";
import { GENDER, TEAM } from "app/Constants/ListSelectItem";
import { isBase64Image } from "utils";
import { getImage, uploadImage } from "app/redux/api/apiEmployees";
import moment from "moment/moment";
import "../../../Validate/Validate";
const EmployeeForm = ({
  handleInputChange,
  employee,
  setEmployee,
  isViewMode,
}) => {
  const [imagePreview, setImagePreview] = useState(employee?.image || "");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      uploadImage(formData).then((response) =>
        getImage(response.data.name).then((res) => {
          const updatedEmployee = { ...employee, image: res.config.url };
          setEmployee(updatedEmployee);
        })
      );
    }
    e.target.value = "";
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid
          container
          item
          lg={4}
          md={4}
          sm={12}
          xs={12}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Avatar
            alt="Remy Sharp"
            src={isBase64Image(imagePreview) ? imagePreview : employee?.image}
            className="avatar-class mb-12"
          />

          <Button
            variant="contained"
            className="upload-image"
            color="primary"
            component="label"
            disabled={isViewMode}
          >
            Chọn ảnh
            <input
              type="file"
              name="image"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </Button>
        </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                id="outlined-basic"
                name="code"
                label={
                  <span>
                    <span className="red-color"> * </span>
                    Mã nhân viên
                  </span>
                }
                value={employee?.code || ""}
                onChange={handleInputChange}
                fullWidth
                validators={["required", `matchRegexp:^NV${moment().format('YY')}\\d{3}$`]}
                errorMessages={[
                  "Vui lòng nhập mã code",
                  "Mã nhân viên không hợp lệ. Gợi ý: NV + Năm hiện tại + 3 số",
                ]}
                placeholder="Gợi ý: NV23000"
                size="small"
                variant="outlined"
                InputProps={{
                  readOnly: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                name="name"
                label={
                  <span>
                    <span className="red-color"> * </span>
                    Họ và tên nhân viên
                  </span>
                }
                value={employee?.name || ""}
                onChange={handleInputChange}
                fullWidth
                validators={[
                  "required",
                  'matchRegexp:^[^0-9!@#$%^&*(),.?":{}|<>]+$',
                  'maxStringLength:30'
                ]}
                errorMessages={[
                  "Vui lòng nhập tên",
                  "Tên không chứa số và kí tự đặc biệt",
                  "Tên không quá 30 ký tự"
                ]}
                placeholder="Nhập Họ và tên"
                size="small"
                variant="outlined"
                InputProps={{
                  readOnly: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <FormControl fullWidth>
                <SelectValidator
                  name="gender"
                  value={
                    GENDER.find(
                      (item) => item.id === employee?.gender?.toString()
                    )?.id || ""
                  }
                  label={
                    <span>
                      <span className="red-color"> * </span>
                      Giới tính
                    </span>
                  }
                  onChange={handleInputChange}
                  validators={["required"]}
                  errorMessages={["Vui lòng chọn giới tính"]}
                  size="small"
                  variant="outlined"
                  fullWidth
                  disabled={isViewMode}
                >
                  {GENDER &&
                    GENDER.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                </SelectValidator>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                label={
                  <span>
                    <span className="red-color"> * </span>
                    {"Ngày sinh"}
                  </span>
                }
                onChange={handleInputChange}
                type="date"
                name="dateOfBirth"
                value={
                  employee?.dateOfBirth
                    ? moment(employee?.dateOfBirth).format("YYYY-MM-DD")
                    : ""
                }
                fullWidth
                validators={["required", "equalEighteenYearsAgo"]}
                errorMessages={["Vui lòng nhập ngày sinh", "Phải trên 18 tuổi"]}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: isViewMode,
                  inputProps: {
                    max: moment().format("YYYY-MM-DD"),
                  },
                }}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                name="address"
                label={
                  <span>
                    <span className="red-color"> * </span>
                    Địa chỉ
                  </span>
                }
                value={employee?.address || ""}
                onChange={handleInputChange}
                fullWidth
                validators={["required", 'maxStringLength:60']}
                errorMessages={["Vui lòng nhập địa chỉ", "Địa chỉ không quá 60 ký tự"]}
                placeholder="Nhập địa chỉ"
                size="small"
                variant="outlined"
                InputProps={{
                  readOnly: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <FormControl fullWidth>
                <SelectValidator
                  name="team"
                  value={employee?.team || ""}
                  label={
                    <span>
                      <span className="red-color"> * </span>
                      Nhóm
                    </span>
                  }
                  onChange={handleInputChange}
                  validators={["required"]}
                  errorMessages={["Vui lòng chọn nhóm"]}
                  size="small"
                  variant="outlined"
                  fullWidth
                  disabled={isViewMode}
                >
                  {TEAM &&
                    TEAM.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                </SelectValidator>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                label={
                  <span>
                    <span className="red-color"> * </span>
                    {"Căn cước công dân"}
                  </span>
                }
                onChange={handleInputChange}
                name="citizenIdentificationNumber"
                value={employee?.citizenIdentificationNumber}
                fullWidth
                validators={["required", "isNumber", "matchRegexp:^\\d{12}$"]}
                errorMessages={[
                  "Vui lòng nhập căn cước công dân",
                  "Căn cước công dân phải là số",
                  "Căn cước công dân phải 12 số",
                ]}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                label={
                  <span>
                    <span className="red-color"> * </span>
                    {"Số điện thoại"}
                  </span>
                }
                onChange={handleInputChange}
                name="phone"
                value={employee?.phone}
                fullWidth
                validators={[
                  "required",
                  "isNumber",
                  "matchRegexp:^([0]{1}[0-9]{9})?$",
                ]}
                errorMessages={[
                  "Vui lòng nhập số điện thoại",
                  "Số điện thoại phải là số",
                  "Số điện thoại không hợp lệ",
                ]}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                label={
                  <span>
                    <span className="red-color"> * </span>
                    {"Email"}
                  </span>
                }
                onChange={handleInputChange}
                type="email"
                name="email"
                value={employee?.email}
                fullWidth
                validators={["required", "isEmail"]}
                errorMessages={[
                  "Vui lòng nhập email",
                  "Email không đúng định dạng",
                ]}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                label={
                  <span>
                    <span className="red-color"> * </span>
                    {"Dân tộc"}
                  </span>
                }
                onChange={handleInputChange}
                name="ethnic"
                value={employee?.ethnic}
                fullWidth
                validators={[
                  "required",
                  'matchRegexp:^[^0-9!@#$%^&*(),.?":{}|<>]+$',
                ]}
                errorMessages={[
                  "Vui lòng nhập dân tộc",
                  "Dân tộc không chứa kí tự đặc biệt",
                ]}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                label={
                  <span>
                    <span className="red-color"> * </span>
                    {"Tôn giáo"}
                  </span>
                }
                onChange={handleInputChange}
                name="religion"
                value={employee?.religion}
                fullWidth
                validators={[
                  "required",
                  'matchRegexp:^[^0-9!@#$%^&*(),.?":{}|<>]+$',
                ]}
                errorMessages={[
                  "Vui lòng nhập tôn giáo",
                  "Tôn giáo không chứa kí tự đặc biệt",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                label={
                  <span>
                    <span className="red-color"> * </span>
                    {"Ngày cấp"}
                  </span>
                }
                onChange={handleInputChange}
                type="date"
                name="dateOfIssuanceCard"
                value={
                  employee?.dateOfIssuanceCard
                    ? moment(employee?.dateOfIssuanceCard).format("YYYY-MM-DD")
                    : ""
                }
                fullWidth
                validators={["required"]}
                errorMessages={["Vui lòng nhập ngày cấp"]}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: isViewMode,
                  inputProps: {
                    max: moment().format("YYYY-MM-DD"),
                  },
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                label={
                  <span>
                    <span className="red-color"> * </span>
                    {"Nơi cấp"}
                  </span>
                }
                onChange={handleInputChange}
                name="placeOfIssueCard"
                value={employee?.placeOfIssueCard || ""}
                fullWidth
                validators={["required", 'maxStringLength:60']}
                errorMessages={["Vui lòng nhập nơi cấp", "Nơi cấp không quá 60 ký tự"]}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: isViewMode,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmployeeForm;
