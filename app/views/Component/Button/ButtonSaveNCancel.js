import React from "react";
import { Button, Grid } from "@material-ui/core";

const ButtonSaveNCancel = ({ handleReset }) => {
  return (
    <Grid item lg={2} md={2} sm={12} xs={12} className="button-center">
      <Button
        type="submit"
        color="primary"
        variant="contained"
        className="flex-end "
      >
        Lưu
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className="flex-end  ml-8"
        onClick={handleReset}
      >
        Hủy
      </Button>
    </Grid>
  );
};

export default ButtonSaveNCancel;
