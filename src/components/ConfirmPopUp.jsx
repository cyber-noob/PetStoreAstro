import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {pay} from '../lib/razorpay.js';

export default function AlertDialog({delivery_address}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    const str = event.target.innerHTML;
    if (str.toLowerCase().includes("payment")) {
      pay(200);
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} size="medium">
        PLACE ORDER
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Proceed To Payment?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please make sure you have added the right items to the cart and
            right delivery address has been selected!
            <div style={{
                fontWeight: "bolder",
                marginTop: "3%"
            }}>Address Selected</div>
            <div style={{
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: "small"
            }}>{delivery_address}</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Proceed To Payment
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}