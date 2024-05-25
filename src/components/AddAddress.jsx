import * as React from "react";

import { Button, Divider, TextField, Snackbar, Alert } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme } from "@mui/material";
import axios from "axios";

export default function AddAddress({ session }) {
  const [open, setOpen] = React.useState(false);
  const [houseNo, setHouseNo] = React.useState("");
  const [lineOne, setLineOne] = React.useState("");
  const [lineTwo, setLineTwo] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [isDefault, setIsDefault] = React.useState(false);

  const [update, setUpdate] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [toggle, setToggle] = React.useState("outlined");

  const toggleButton = () => {
    if (!isDefault) {
      console.log("contained");
      setIsDefault(true);
      setToggle("contained");
    } else {
      console.log("outlined");
      setIsDefault(false);
      setToggle("outlined");
    }
  };

  const handlePopUp = (event) => {
    // console.log("handled click from login button");
    setOpen(true);
    event.stopPropagation();
  };

  const closePopup = () => {
    // console.log("handled close from login button");
    setOpen(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setUpdate(false);
    setError(false);
  };

  const [errorMsg, setErrorMsg] = React.useState("");

  const submitEvent = async () => {
    if (
      houseNo == null ||
      lineOne == null ||
      lineTwo == null ||
      pincode == null
    )
      setError(true);
    else {
      let body = {
        door_no: houseNo,
        line_one: lineOne,
        line_two: lineTwo,
        pincode: pincode,
        is_default: isDefault,
      };

      await axios({
        url: "/user/address/add",
        method: "post",
        baseURL: "http://localhost:8082",
        headers: {
          "x-session": session.sessionId,
        },
        params: {
          customer_id: session.user.userId,
        },
        data: body,
      })
        .then((response) => {
          console.log("update successful");
          setUpdate(true);
          setOpen(false);
          sleep(3000);
          window.location.reload();
        })
        .catch((error) => {
          console.log("[UserProfile] unable to update profile " + error);
          setErrorMsg(error.response.data.message);
          console.log("errMsg -> ", errorMsg);
          console.log(errorMsg != null && errorMsg != "");
          setError(true);
        });
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" size="large" onClick={handlePopUp}>
        + Add New Address
      </Button>
      <Dialog
        open={open}
        onClose={closePopup}
        disableRestoreFocus={true}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            closePopup();
          },
        }}
      >
        <DialogTitle>Address Details</DialogTitle>
        <DialogContent>
          <DialogContentText>Add your address details below</DialogContentText>

          <Divider
            sx={{
              marginTop: "10px",
            }}
          />
          <TextField
            required
            id="outlined-basic"
            label="House No."
            variant="outlined"
            sx={{
              marginTop: "35px",
              width: "500px",
            }}
            onChange={(event) => {
              setHouseNo(event.target.value);
            }}
          />

          <TextField
            required
            id="outlined-basic"
            label="Line 1"
            variant="outlined"
            sx={{
              marginTop: "35px",
              width: "500px",
            }}
            onChange={(event) => {
              setLineOne(event.target.value);
            }}
          />

          <TextField
            required
            id="outlined-basic"
            label="Line 2"
            variant="outlined"
            sx={{
              marginTop: "35px",
              width: "500px",
            }}
            onChange={(event) => {
              setLineTwo(event.target.value);
            }}
          />

          <TextField
            required
            id="outlined-basic"
            label="Pincode"
            variant="outlined"
            sx={{
              marginTop: "35px",
              width: "500px",
            }}
            onChange={(event) => {
              setPincode(event.target.value);
            }}
          />

          <Button
            variant={toggle}
            size="small"
            onClick={toggleButton}
            sx={{
              marginTop: "30px",
            }}
          >
            Is Default ?
          </Button>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={submitEvent}>
            Submit
          </Button>
          <Button onClick={closePopup}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={update} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Profile updated successfully...!
        </Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMsg != null && errorMsg != ""
            ? errorMsg
            : "Error updating profile. Please try again in a few minutes!"}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
