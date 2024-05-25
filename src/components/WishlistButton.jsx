import * as React from "react";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";

export default function WishlistButton({ session, product_id }) {
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [alreadyPresent, setAlreadyPresent] = React.useState(false);

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

  const handleAddToWishlist = async () => {
    //Axios Request
    console.log("Add to wishlist triggered...!");

    await axios({
      url: "/wishlist/add",
      method: "post",
      baseURL: "http://localhost:8082",
      headers: {
        "x-session": session.sessionId,
      },
      data: {
        customer_id: session.user.userId,
        product_id: product_id,
      },
    })
      .then((response) => {
        console.log(
          "[Wishlist] result - " + JSON.stringify(response.data, null, 4)
        );

        if (response.data.code === "WL000") setAlreadyPresent(true);
        else setAdd(true);
      })
      .catch((error) => {
        console.log("[Wishlist] " + error);
        setError(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAdd(false);
    setAlreadyPresent(false);
    setError(false);
  };

  return (
    <React.Fragment>
      {session && (
        <React.Fragment>
          <Button
            size="large"
            fontSize="large"
            color="primary"
            variant="outlined"
            onClick={handleAddToWishlist}
          >
            Wishlist
          </Button>

          <Snackbar open={add} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Item successfully Added to Wishlist...!
            </Alert>
          </Snackbar>

          <Snackbar
            open={alreadyPresent}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Item already present in Wishlist...!
            </Alert>
          </Snackbar>

          <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Error adding to Wishlist. Please try again in a few minutes!
            </Alert>
          </Snackbar>
        </React.Fragment>
      )}

      {!session && (
        <React.Fragment>
          <Button
            size="large"
            fontSize="large"
            color="primary"
            variant="outlined"
            onClick={handleLoginPopUp}
          >
            Wishlist
          </Button>

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
                Please login to continue. If your account doesn't exist it will
                be automatically created with your google account.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="error"
                startIcon={React.cloneElement(<GoogleIcon />)}
                href="/login/google"
              >
                Google
              </Button>
              <Button onClick={closeLoginPopup}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
