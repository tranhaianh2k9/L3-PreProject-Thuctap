import React, { useEffect } from "react";
import { Paper, Grid, Typography, TextField } from "@material-ui/core";
import "../../../styles/views/_formReneral.scss";
import HeaderOfForm from "./HeaderOfForm";
import Footer  from "./Footer";
import InfoEmployee from "./InfoEmployee";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeByIdRequest } from "app/redux/actions/EmployeeActions";
import { getAllLeadersRequest } from "app/redux/actions/LeaderAction";
import { getNameById } from "../../../utils/handleGeneral";

const ProposalForm = ({ proposalDetail }) => {
  const dispatch = useDispatch();
  const employeeDetail = useSelector((state) => state?.employees?.employee);
  const leaderData = useSelector((state) => state.leaders.leadersItem);

  useEffect(() => {
      dispatch(getEmployeeByIdRequest(proposalDetail?.employeeId));
      dispatch(getAllLeadersRequest());
  }, [proposalDetail?.id]);


  return (
    <Paper className="paper">
      <Grid container spacing={2} className="mb-10 mt-16 background">
        <HeaderOfForm></HeaderOfForm>
        <Grid container className="mb-10">
          <Grid item xs={12}>
            <div className="text-center mb-10 mt-14">
              <Typography align="center" variant="h5" className="font-style font-weight">
                ĐƠN ĐỀ NGHỊ
              </Typography>
            </div>
          </Grid>
        </Grid>
     <InfoEmployee data={proposalDetail} />
        <Grid container className="mb-10 ">
          <Grid item xs={12}>
            <div className=" mb-10 mt-14 ">
              <Typography className="font-style ">Mô tả chi tiết: </Typography>
              <span>
                  <TextField
                  type="text"
                  name="detailedDescription"
                  value={proposalDetail?.detailedDescription}
                  fullWidth
                  readOnly
                  size="small"
                  multiline
                  className="current-dotted "
                />
              </span>
            </div>
          </Grid>
        </Grid>
        <Grid container className="mb-10 ">
          <Grid item xs={12}>
            <div className=" mb-10 mt-14 ">
              <Typography className="font-style ">Nội dung:</Typography>
              <span>
                  <TextField
                  type="text"
                  name="content"
                  value={proposalDetail?.content}
                  fullWidth
                  readOnly
                  size="small"
                  multiline
                  className="current-dotted "
                />
              </span>
            </div>
          </Grid>
        </Grid>
        <Grid container className="mb-10 ">
          <Grid item xs={12}>
            <div className=" mb-10 mt-14 ">
              <Typography className="font-style ">Ghi chú:</Typography>
              <span>
                  <TextField
                  type="text"
                  name="note"
                  value={proposalDetail?.note}
                  fullWidth
                  readOnly
                  size="small"
                  multiline
                  className="current-dotted "
                />
              </span>
            </div>
          </Grid>
        </Grid>
        <Footer employeeName={employeeDetail?.name} leaderName={getNameById(Number(proposalDetail?.leaderId  ), leaderData)} />
      </Grid>
    </Paper>
  );
};

export default ProposalForm;
