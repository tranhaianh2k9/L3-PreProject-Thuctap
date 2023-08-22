import * as React from "react";
import { Button, Dialog, DialogActions,Grid } from "@material-ui/core";

import { useTranslation } from "react-i18next";

const ConfirmDialog = ({ open, onClose, handleDialogConfirm, title }) => {
  const { t } = useTranslation();
  return (
    <Dialog maxWidth="xs" fullWidth={true} open={open} onClose={onClose}>
      <div className="pt-24 px-20 pb-8">
        <h4 className="capitalize">{t("general.confirm")}</h4>
        <p>{title + " ?"}</p>
        <DialogActions>
        <Grid container className="button-center">
            <Button
              onClick={handleDialogConfirm}
              className={"mr-16"}
              variant="contained"
              color="primary"
            >
              {t("general.confirm")}
            </Button>
            <Button onClick={onClose} variant="contained" color="secondary">
              {t("general.cancel")}
            </Button>
          </Grid>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
