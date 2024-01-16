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

export default function AccountMenu( {profilePic, session} ) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log("handled click from profile");
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log("handled close from profile");
    setAnchorEl(null);
  };

  const wishlist = () => {
    location.href = '/wishlist';
  }

  const myaccount = () => {
    location.href = '/myaccount';
  }
  
  return (
    <React.Fragment>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          sx={{
            padding: 0,
            margin: 0,
          }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar src={profilePic} sx={{ width: 30, height: 30 }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
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
      >
        {/* <a style={{"padding": "3%"}}>Hey Welcome back...!</a> */}
        {session && (
          <MenuItem onClick={myaccount}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" color="primary" />
            </ListItemIcon>
            My account
          </MenuItem>
        )}

        {!session && (
          <MenuItem onClick={myaccount}>
            <ListItemIcon>
              <Button fontSize="medium" color="primary" variant="contained">
                LOGIN
              </Button>
            </ListItemIcon>
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ReceiptLongIcon fontSize="small" color="primary" />
          </ListItemIcon>
          Orders
        </MenuItem>
        <MenuItem onClick={wishlist}>
          <ListItemIcon>
            <FavoriteIcon fontSize="small" color="primary" />
          </ListItemIcon>
          Wishlist
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" color="primary" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
