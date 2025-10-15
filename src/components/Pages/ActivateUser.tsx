import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authApi } from "../../Api/authApi";
import FormTemplate from "./FormTemplate";

const ActivateUser = () => {
  const { uid, token } = useParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const activate = async () => {
      try {
        await authApi.activateUser(uid, token);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };
    activate();
  }, [uid, token]);

  return (
    <FormTemplate title="Account Activation">
      {status === "loading" && <p>Activating your account...</p>}
      {status === "success" && <p>Your account has been activated successfully!</p>}
      {status === "error" && <p>Activation failed. Please check your link or contact support.</p>}
    </FormTemplate>
  );
};

export default ActivateUser;
