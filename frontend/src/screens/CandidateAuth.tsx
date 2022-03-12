import React, { useEffect } from "react";
import { Fade, Tab, Tabs } from "react-bootstrap";
import RegistrationForm from "../components/RegistrationForm";
import "./CandidateAuth.scss";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { RootStateOrAny, useSelector } from "react-redux";

interface Props {
  path: string;
}

const CandidateAuth = ({ path }: Props) => {
  const register = useSelector((state: RootStateOrAny) => state.register);
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoggedIn) {
      localStorage.setItem("token", auth.token);
      navigate("/candidate/dashboard");
    }
  });

  return (
    <div className="auth-container">
      <h1>CodinTest</h1>
      <h2>For Developers</h2>
      <p>Practice coding, prepare for interviews, and get hired.</p>
      <div className="tab-container">
        <Tabs
          defaultActiveKey={path}
          transition={Fade}
          id="tabs"
          className="mb-3 nav nav-tabs justify-content-center"
          onSelect={(key) => navigate(`/candidate/${key}/`)}
          variant="pills"
        >
          <Tab eventKey="signup" title="Sign Up">
            <RegistrationForm role={"CANDIDATE"} />
            <br />
            {register.registering && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            {!register.registering && register.success && (
              <div className="alert alert-success">{register.message}</div>
            )}

            {!register.registering && register.error && (
              <div className="alert alert-danger">
                {register.message.message}
              </div>
            )}
          </Tab>
          <Tab eventKey="login" title="Login">
            <LoginForm />
            {auth.logging && (
              <span className="spinner-border spinner-border-sm mr-1 mt-2"></span>
            )}
            {!auth.logging && auth.error && (
              <div className="alert alert-danger mt-2">
                {auth.message.message}
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default CandidateAuth;
