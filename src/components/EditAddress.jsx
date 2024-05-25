import * as React from "react";

import { Button, Divider, TextField, Snackbar, Alert } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme } from "@mui/material";
import axios from "axios";

export default function EditAddress({ session, address }) {
  const [open, setOpen] = React.useState(false);
  const [houseNo, setHouseNo] =
    address["door_no"] != null
      ? React.useState(address["door_no"])
      : React.useState("");
  const [lineOne, setLineOne] =
    address["line_one"] != null
      ? React.useState(address["line_one"])
      : React.useState("");
  const [lineTwo, setLineTwo] =
    address["line_two"] != null
      ? React.useState(address["line_two"])
      : React.useState("");
  const [pincode, setPincode] =
    address["pincode"] != null
      ? React.useState(address["pincode"])
      : React.useState("");
  const [isDefault, setIsDefault] =
    address["is_default"] != null && address["is_default"] == 0
      ? React.useState(false)
      : React.useState(true);

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

  const sleep = async (delay) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  const handlePopUp = async (event) => {
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
        url: "/user/address/update",
        method: "put",
        baseURL: "http://localhost:8082",
        headers: {
          "x-session": session.sessionId,
        },
        params: {
          customer_id: session.user.userId,
          id: address["id"],
        },
        data: body,
      })
        .then( async (response) => {
          console.log("update successful");
          setUpdate(true);
          setOpen(false);

          await sleep(3000);
          location.reload();
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
      <Button
        sx={{ width: "40%" }}
        variant="outlined"
        size="large"
        onClick={handlePopUp}
      >
        Edit
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
        <DialogTitle>Edit Details</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit your address details below</DialogContentText>

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
            value={houseNo}
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
            value={lineOne}
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
            value={lineTwo}
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
            value={pincode}
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
