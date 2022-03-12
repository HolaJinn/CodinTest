import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { verificationActions } from "../store/EmailVerificationSlice";

const EmailVerification = () => {
  const [searchParam] = useSearchParams();
  const verification = useSelector(
    (state: RootStateOrAny) => state.verification
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const code = searchParam.get("code");
  console.log(code);

  useEffect(() => {
    dispatch(verificationActions.verify(code));
  }, [code, dispatch]);

  return (
    <Container>
      {verification.verifiying && (
        <span className="spinner-border spinner-border-sm mr-1"></span>
      )}
      {verification.success && (
        <>
          <h1 className="alert alert-success">{verification.message}</h1>
          <Button onClick={(e) => navigate("/candidate/login")}>
            Go to login
          </Button>
        </>
      )}
      {verification.error && (
        <>
          <h1 className="alert alert-danger">{verification.message}</h1>
        </>
      )}
    </Container>
  );
};

export default EmailVerification;
