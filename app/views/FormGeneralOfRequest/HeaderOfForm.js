import React from "react";
import { Grid, Typography } from "@material-ui/core";

const HeaderOfForm = () => {
  return (
    <div container className="mb-10 flex-header">
      <Grid item xs={12}>
        <div className="text-center ">
          <Typography variant="h5" className="font-style font-weight">
            CÔNG TY OCEANTECH
          </Typography>
          <Typography variant="h5" className="font-style font-weight">
            Số: 03/02-QĐ-TL
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="text-center header-right">
          <Typography variant="h5" className="font-style font-weight">
            CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </Typography>
          <Typography variant="h6" className="font-style font-weight">
            Độc lập - Tự do - Hạnh phúc
          </Typography>
          <Typography variant="h6" className="font-style font-weight">
            ___________________
          </Typography>
        </div>
      </Grid>
    </div>
  );
};

export default HeaderOfForm;
  