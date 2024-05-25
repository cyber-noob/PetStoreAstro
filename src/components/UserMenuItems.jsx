import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function AccountMenu({ profilePic, session }) {

  const [anchorEl, setAnchorEl] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const myaccountPop = Boolean(anchorEl);
  const handleClick = (event) => {
    // console.log("handled click from profile");
    // console.log("anchorEl => ", anchorEl)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    // console.log("handled close from profile");
    // console.log(open);
    setAnchorEl(null);
  };

  const loginPop = Boolean(open);
  const handleLoginPopUp = (event) => {
    // console.log("handled click from login button");
    setOpen(true);
    event.stopPropagation();
  };

  const closeLoginPopup = () => {
    // console.log("handled close from login button");
    setOpen(false);
  };

  const myaccount = () => {
    location.href = "/myaccount";
  };

  const wishlist = () => {
    location.href = "/wishlist";
  };

  const orders = () => {
    location.href = "/orders";
  };

  const logout = () => {
    console.log("performing logout");
    axios({
      url: "/logout",
      method: "POST",
    })
      .then((response) => {
        console.log("logout data => ", response);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleGoogleLogin = async (GoogleUser) => {
    console.log("google auth token: ", GoogleUser);
    const id_token = GoogleUser["credential"];

    const res = await axios({
      url: "/api/auth/react",
      method: "GET",
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    })
      .then((response) => {
        console.log("logout data => ", response);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <Tooltip title="Account settings" onClick={handleClick}>
        <IconButton
          sx={{
            padding: 0,
            margin: 0,
          }}
          aria-controls={myaccountPop ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={myaccountPop ? "true" : undefined}
        >
          <Avatar
            src={profilePic}
            sx={{ width: "1em", height: "1em", color: "blue[500]" }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={myaccountPop}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            ".MuiList-root": {
              width: "200px",
            },
            "& .MuiAvatar-root": {
              width: 30,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        disableRestoreFocus={true}
      >
        {session && (
          <MenuItem onClick={myaccount}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" color="primary" />
            </ListItemIcon>
            My account
          </MenuItem>
        )}

        {!session && (
          <MenuItem onClick={handleLoginPopUp}>
            <ListItemIcon>
              <Button fontSize="medium" color="primary" variant="contained">
                LOGIN
              </Button>
            </ListItemIcon>
          </MenuItem>
        )}

        <Dialog
          open={loginPop}
          onClose={closeLoginPopup}
          disableRestoreFocus={true}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              closeLoginPopup();
            },
          }}
        >
          <DialogTitle>Login/SignUp</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please login to continue. If your account doesn't exist it will be
              automatically created with your google account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            <GoogleOAuthProvider clientId="183611527273-2ejm3gl7km2q4mc6n8slht1i23f38ps1.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>

            <Button onClick={closeLoginPopup}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Divider />

        <MenuItem onClick={orders}>
          <ListItemIcon>
            <ReceiptLongIcon fontSize="small" color="primary" />
          </ListItemIcon>
          My Orders
        </MenuItem>

        <MenuItem onClick={wishlist}>
          <ListItemIcon>
            <FavoriteIcon fontSize="small" color="primary" />
          </ListItemIcon>
          Wishlist
        </MenuItem>

        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" color="primary" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
