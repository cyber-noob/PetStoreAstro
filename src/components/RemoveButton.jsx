import * as React from "react";
import { Button } from "@mui/material";
import axios from "axios";

export default function RemoveButton({ address, session }) {
  const removeItem = async () => {
    await axios({
      url: "/user/address/remove",
      method: "delete",
      baseURL: "http://localhost:8082",
      headers: {
        "x-session": session.sessionId,
      },
      params: {
        customer_id: session.user.userId,
        id: address["id"],
      },
    })
      .then(async (response) => {
        console.log("update successful");
        location.reload();
      })
      .catch((error) => {
        console.log("[UserProfile] unable to update profile " + error);
      });
  };

  return (
    <React.Fragment>
      <Button variant="outlined" size="large" onClick={removeItem}>
        Remove
      </Button>
    </React.Fragment>
  );
}
