import React from "react";
import { Button, TextField, MenuItem } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";

export default function Profile({ userInfo, session }) {
  const genderOptions = [
    {
      label: "Male",
      value: 1,
    },

    {
      label: "Female",
      value: 0,
    },
  ];

  const defaultOption = () => {
    if (userInfo.gender != null) return userInfo.gender;
  };

  const [enable, setEnable] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [username, setUsername] =
    userInfo.username === null
      ? React.useState("-")
      : React.useState(userInfo.username);

  const [gender, setGender] =
    userInfo.gender === null
      ? React.useState("-")
      : React.useState(userInfo.gender);

  const [mail, setMail] =
    userInfo.email === null
      ? React.useState("-")
      : React.useState(userInfo.email);

  const [altmail, setAltmail] =
    userInfo.alt_mail === null
      ? React.useState("-")
      : React.useState(userInfo.alt_mail);

  const [altmobile, setAltmobile] =
    userInfo.alt_mobile === null
      ? React.useState("-")
      : React.useState(userInfo.alt_mobile);

  const [mobile, setMobile] =
    userInfo.mobile === null
      ? React.useState("-")
      : React.useState(userInfo.mobile);

  const [dob, setDob] =
    userInfo.dob === null
      ? React.useState(dayjs())
      : React.useState(dayjs(userInfo.dob));

  const [location, setLocation] =
    userInfo.home_location === null
      ? React.useState("-")
      : React.useState(userInfo.home_location);

  const toggleState = async () => {
    console.log("toggled state -> ", enable);

    if (
      enable &&
      ((username !== userInfo.username && username !== "-") ||
        (gender !== userInfo.gender && gender !== "-") ||
        (mail !== userInfo.email && mail !== "-") ||
        (altmail !== userInfo.alt_mail && altmail !== "-") ||
        (mobile !== userInfo.mobile && mobile !== "-") ||
        (altmobile !== userInfo.alt_mobile && altmobile !== "-") ||
        (dob !== userInfo.dob && dob !== "-") ||
        (location !== userInfo.home_location && location !== "-"))
    ) {
      let formattedDob =
        dob.get("year") + "-" + dob.get("month") + "-" + dob.get("date");
      let body = {
        gender: gender,
        alt_mail: altmail,
        mobile: mobile,
        alt_mobile: altmobile,
        dob: formattedDob,
        home_location: location,
      };

      Object.keys(body)
        .filter((key) => body[key] == "-")
        .forEach((key) => delete body[key]);

      await axios({
        url: "/user/profile/update",
        method: "put",
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
        })
        .catch((error) => {
          console.log("[UserProfile] unable to update profile" + error);
          setError(true);
        });
    }

    //Toggle button state
    setEnable(!enable);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setUpdate(false);
    setError(false);
  };

  const details = {
    width: "100%",
    padding: "5%",
  };

  return (
    <React.Fragment>
      <table style={details}>
        <tbody>
          <tr
            style={{
              lineHeight: "80px",
            }}
          >
            <td>Full Name</td>
            <td>
              <TextField
                id="standard-basic"
                value={username}
                variant="standard"
                disabled
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </td>
          </tr>

          <tr
            style={{
              lineHeight: "80px",
            }}
          >
            <td>Gender</td>
            <td>
              <TextField
                id="standard-basic"
                select
                label="Please Select a Gender"
                sx={{ width: "200px" }}
                defaultValue={defaultOption}
                disabled={!enable}
                onChange={(event) => {
                  setGender(event.target.value);
                }}
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </td>
          </tr>

          <tr
            style={{
              lineHeight: "80px",
            }}
          >
            <td>Mail</td>
            <td>
              <TextField
                id="standard-basic"
                value={mail}
                variant="standard"
                disabled
                onChange={(event) => {
                  setMail(event.target.value);
                }}
              />
            </td>
          </tr>

          <tr
            style={{
              lineHeight: "80px",
            }}
          >
            <td>Alternate Mail</td>
            <td>
              <TextField
                id="standard-basic"
                value={altmail}
                variant="standard"
                disabled={!enable}
                onChange={(event) => {
                  setAltmail(event.target.value);
                }}
              />
            </td>
          </tr>

          <tr
            style={{
              lineHeight: "80px",
            }}
          >
            <td>Mobile Number</td>
            <td>
              <TextField
                id="standard-basic"
                value={mobile}
                variant="standard"
                disabled={!enable}
                onChange={(event) => {
                  setMobile(event.target.value);
                }}
              />
            </td>
          </tr>

          <tr
            style={{
              lineHeight: "80px",
            }}
          >
            <td>Alternate Mobile Number</td>
            <td>
              <TextField
                id="standard-basic"
                value={altmobile}
                variant="standard"
                disabled={!enable}
                onChange={(event) => {
                  setAltmobile(event.target.value);
                }}
              />
            </td>
          </tr>

          <tr
            style={{
              lineHeight: "80px",
            }}
          >
            <td>Date of Birth</td>
            <td>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disabled={!enable}
                  value={dob}
                  onChange={(newValue) => setDob(newValue)}
                />
              </LocalizationProvider>
            </td>
          </tr>

          <tr
            style={{
              lineHeight: "80px",
            }}
          >
            <td>Location</td>
            <td>
              <TextField
                id="standard-basic"
                value={location}
                variant="standard"
                disabled={!enable}
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <Button
        style={{
          width: "25%",
          marginLeft: "5%",
        }}
        variant="outlined"
        size="large"
        onClick={toggleState}
      >
        {!enable ? "EDIT" : "SUBMIT"}
      </Button>

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
          Error updating profile. Please try again in a few minutes!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
