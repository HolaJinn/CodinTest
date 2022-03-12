import React, { SyntheticEvent, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { MdMail } from "react-icons/md";
import "./ForgotPassword.scss";
import { sendResetPasswordToken } from "../services/authService";

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [verifiying, setVerifiying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const request = {
    email,
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setVerifiying(true);

    try {
      await sendResetPasswordToken(request);
      setVerifiying(false);
      setSuccess(true);
      setError(false);
      setErrorMessage("");
    } catch (error: any) {
      console.log(error);
      setSuccess(false);
      setError(true);
      setVerifiying(false);
      setErrorMessage(error?.message);
    }
  };

  return (
    <Container>
      <div className="forgot-password-container">
        <div className="forgot-password-section">
          <h2>Verify your email</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-3" controlId="email">
              <InputGroup>
                <InputGroup.Text>
                  <MdMail />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
            <div className="btn-container mt-3">
              <Button variant="primary" type="submit" className="btn btn-sm">
                Send Verification
              </Button>
            </div>
            {verifiying && (
              <span className="spinner-border spinner-border-sm mr-1 mt-2"></span>
            )}
            {success && (
              <div className="alert alert-success mt-2">
                A verification link is sent to your email
              </div>
            )}
            {error && !verifiying && (
              <div className="alert alert-danger mt-2">{errorMessage}</div>
            )}
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default ForgetPasswordScreen;
