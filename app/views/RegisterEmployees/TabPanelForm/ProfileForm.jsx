import React from "react";
import { Typography, Paper, Grid, Avatar, Button } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LocalPhoneOutlinedIcon from "@material-ui/icons/LocalPhoneOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import "../../../../styles/views/_profileForm.scss";
import ExperiencesComponent from "./ExperiencesForm/ExperiencesComponent";
import { GENDER, TEAM } from "app/Constants/ListSelectItem";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { updateEmployees } from "app/redux/actions/EmployeeActions";
import { STATUS_OF_EMPLOYEE } from "app/Constants/ListStatus";
import { removeMultipleSpaces } from "../../../../utils/handleGeneral";
const ProfileForm = ({ employee, setEmployee, submitRef, isViewMode }) => {
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: removeMultipleSpaces(e.target.value),
    });
  };

  const handleSubmit = () => {
    const dataTemp = {
      ...employee,
      knowledge: employee?.knowledge?.trim(),
      skill: employee?.skill?.trim(),
      activity: employee?.activity?.trim(),
    };
    dispatch(updateEmployees(dataTemp, STATUS_OF_EMPLOYEE));
  };
  return (
    <Paper className="root-profile">
      <Grid container className="background-profile">
        <Grid item container xs={4} direction="column" spacing={3}>
          <Avatar className="avatar" alt="Your Name" src={employee?.image} />
          <Grid item className="mt-32 mb-8">
            <div className="contact-item">
              <MailOutlineIcon />
              <span>{employee?.email}</span>
            </div>
            <div className="contact-item">
              <LocalPhoneOutlinedIcon />
              <span>{employee?.phone}</span>
            </div>
            <div className="contact-item">
              <HomeOutlinedIcon />
              <span>{employee?.address}</span>
            </div>
            <div className="contact-item">
              <PersonOutlineOutlinedIcon />
              <span>
                {
                  GENDER?.find(
                    (item) => item?.id === employee?.gender?.toString()
                  )?.name
                }
              </span>
            </div>
            <div className="contact-item">
              <CalendarTodayOutlinedIcon />
              <span>{moment(employee?.dateOfBirth).format("DD/MM/YYYY")}</span>
            </div>
          </Grid>
          <Grid item className="mt-32">
            <ValidatorForm onSubmit={handleSubmit}>
              <Grid item>
                <h3 className="font-weight-bold custom-font mt-c">KỸ NĂNG</h3>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextValidator
                    onChange={handleInputChange}
                    name="skill"
                    value={employee?.skill || ""}
                    fullWidth
                    validators={["required"]}
                    errorMessages={["Vui lòng nhập kỹ năng"]}
                    size="small"
                    multiline
                    InputProps={{
                      readOnly: isViewMode,
                    }}
                    className="textarea-dotted"
                  />
                </Grid>
              </Grid>
              <Grid item>
                <h3 className="font-weight-bold  custom-font">HOẠT ĐỘNG</h3>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextValidator
                    onChange={handleInputChange}
                    name="activity"
                    value={employee?.activity || ""}
                    fullWidth
                    validators={["required"]}
                    errorMessages={["Vui lòng nhập hoạt động"]}
                    size="small"
                    multiline
                    InputProps={{
                      readOnly: isViewMode,
                    }}
                    className="textarea-dotted"
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                className="primary"
                type="submit"
                ref={submitRef}
                style={{ display: "none" }}
              >
                Lưu
              </Button>
            </ValidatorForm>
          </Grid>
        </Grid>
        <Grid item container xs={8} direction="column" spacing={3}>
          <Grid item className="leftColumn ml-32">
            <div>
              <Typography variant="h4" className="name">
                {employee?.name}
              </Typography>
              <Typography variant="subtitle1" className="position">
                {TEAM.find((item) => item.id === employee?.team)?.name}
              </Typography>
            </div>
          </Grid>
          <Grid item className="leftColumn ml-32 mt-16 mb-16">
            <h3 className="font-weight-bold my-auto custom-font">MỤC TIÊU</h3>
            <div className="jobObjective">
              <TextValidator
                id="standard-basic"
                fullWidth
                value={employee?.knowledge || ""}
                type="text"
                name="knowledge"
                multiline
                className="knowledge-input"
                onChange={handleInputChange}
                placeholder={isViewMode ? "Không có mục tiêu!" : "Nhập mục tiêu của bạn..."}
                InputProps={{
                  readOnly: isViewMode,
                }}
              />
            </div>
          </Grid>
          <Grid item className="leftColumn ml-32">
            <ExperiencesComponent employee={employee} isViewMode={isViewMode} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileForm;
