import React from "react";
import { Grid, Typography } from "@material-ui/core";
import "../../../styles/views/_formReneral.scss";

const Footer = ({ employeeName, leaderName }) => {
  return (
    <Grid container className="mb-10">
      <Grid container className="mb-10">
        <Grid item xs={12}>
          <div className="mb-10 mt-14">
            <Typography className="font-style">
              Tôi xin chân trọng cảm ơn.
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div className="text-center mb-10 mt-14 bottom ">
          <div>
            <Typography className="font-style font-weight " variant="h6">
              Người làm đơn
            </Typography>
            <p className="font-style font-italic">
                  {" "}
                  (Ký, ghi rõ họ tên)
                </p>
            <Typography  className="font-style span-footer" variant="h6">
              {employeeName}
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
              {leaderName}
            </Typography>
          </div>
        </div>
       
      </Grid>
    </Grid>
  );
};

export default Footer;
