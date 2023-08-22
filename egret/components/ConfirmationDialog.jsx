import React from "react";
import { Dialog, Button, DialogActions } from "@material-ui/core";

const ConfirmationDialog = ({
  open,
  onConfirmDialogClose,
  text,
  title,
  onYesClick,
  Yes,
  No,
}) => {
  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      open={open}
      onClose={onConfirmDialogClose}
    >
      <div className="pt-24 px-20 pb-8">
        <h4 className="capitalize">
          <span className="styleColor">{title}</span>
        </h4>
        <p>{text}</p>
        <DialogActions>
          <div className="flex flex-space-between flex-middle">
            <Button
              onClick={onYesClick}
              className={"mr-16"}
              variant="contained"
              color="primary"
            >
              {Yes}
            </Button>
            {No && (
              <Button
                onClick={onConfirmDialogClose}
                variant="contained"
                color="secondary"
              >
                {No}
              </Button>
            )}
          </div>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
