import React, { useEffect} from "react";
import {
  Paper,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core";
import moment from "moment/moment";
import "../../../styles/views/_formReneral.scss";
import "../../../styles/views/_informationForm.scss";
import { useDispatch, useSelector } from "react-redux";
import { getNameById, removeMultipleSpaces } from "../../../utils/handleGeneral";
import HeaderOfForm from "./HeaderOfForm";
import { getAllLeadersRequest } from "../../redux/actions/LeaderAction";
import { ACTION_END_EMPLOYEE, VIEW_ONLY } from "app/Constants/ListNameTab";

import AddressNCurrent from "./AddressNCurrent";

const EndForm = ({ endData, setEndData, statusOfForm }) => {
 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLeadersRequest());
  }, [endData, dispatch]);

  const leaderData = useSelector((state) => state.leaders.leadersItem);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEndData({
      ...endData,
      [name]: removeMultipleSpaces(value),
    });
  };

  return (
    <Paper className="paper">
      <Grid container spacing={2} className="mb-10 mt-16 background">
        <HeaderOfForm></HeaderOfForm>
        <Grid container className="mb-10">
          <Grid item xs={12}>
            <div className="text-center mb-10 mt-14">
              <Typography
                align="center"
                variant="h5"
                className="font-style font-weight"
              >
                ĐƠN XIN NGHỈ VIỆC
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container className="mb-10 ">
          <Grid item xs={12}>
            <div className=" mb-10 mt-14">
                <Typography className="font-style ">
                  Kính gửi: Ban giám đốc công ty OCEANTECH
                </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container className="mb-10 ">
          <Grid item xs={12}>
            <div className=" mb-10 mt-14 ">
              <Typography className="font-style ">
                Tôi tên là:{" "}
                <span className=" input-name-dotted">
                  <input readOnly type="text" value={endData?.name || ""} />
                </span>
                Ngày sinh:{" "}
                <span className=" input-date-dotted">
                  <input
                    readOnly
                    type="text"
                    value={
                      moment(endData?.dateOfBirth).format("DD/MM/YYYY") || ""
                    }
                  />
                </span>
              </Typography>
            </div>
          </Grid>
        </Grid>
        <AddressNCurrent infoData={endData} />
        <Grid container className="mb-10">
          <Grid item xs={12}>
            <div className="mb-10 mt-14">
              <Typography className="font-style ">
                Tôi làm đơn này, kính xin Ban giám đốc cho tôi được thôi việc từ
                ngày{" "}
                <span className="input-endDay-dotted">
                  <input
                    className="mb-16 ml-8 "
                    type="date"
                    name="endDay"
                    onChange={handleChange}
                    value={moment(endData?.endDay).format("YYYY-MM-DD") || ""}
                    readOnly={Boolean(statusOfForm === ACTION_END_EMPLOYEE || statusOfForm === VIEW_ONLY)}
                  />
                </span>
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container className="mb-10 ">
          <Grid item xs={12}>
            <div className=" mb-10 mt-14 ">
              <Typography className="font-style">Lý Do:</Typography>
              <span>
                <TextField
                  onChange={handleChange}
                  type="text"
                  name="reasonForEnding"
                  value={endData?.reasonForEnding || ""}
                  disabled={Boolean(statusOfForm === ACTION_END_EMPLOYEE || statusOfForm === VIEW_ONLY)}
                  fullWidth
                  validators={["required"]}
                  size="small"
                  multiline
                  className="current-dotted font-style"
                />
              </span>
            </div>
          </Grid>
        </Grid>
        <Grid container className="mb-10">
          <Grid item xs={12}>
            <div className="mb-10 mt-14">
              <Typography className="font-style">
                Rất mong Ban giám đốc xem xét và chấp nhận cho tôi được phép
                thôi việc. Tôi xin chân thành cảm ơn.
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container className="mb-10">
          <Grid item xs={12}>
            <div className="text-center mb-10 mt-14 bottom ">
              <div>
                <Typography className="font-style font-weight " variant="h6">
                  Người làm đơn
                </Typography>
                <p className="font-style  font-italic">
                  {" "}
                  (Ký, ghi rõ họ tên)
                </p>
                <Typography className="font-style  span-footer " variant="h6">
                  {endData?.name}
                </Typography>
              </div>
              <div>
                <Typography className="font-style font-weight " variant="h6">
                  Người tiếp nhận
                </Typography>
                <p className="font-style font-italic">
                  {" "}
                  (Ký, ghi rõ họ tên)
                </p>
                <Typography className="font-style span-footer " variant="h6">
                  {getNameById(Number(endData?.leaderId), leaderData) || ""}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EndForm;
