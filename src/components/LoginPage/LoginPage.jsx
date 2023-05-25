import LoginForm from "../LoginForm/LoginForm";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push("/registration");
          }}
        >
          Register
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
