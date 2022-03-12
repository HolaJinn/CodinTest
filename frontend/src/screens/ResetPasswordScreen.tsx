import React, { SyntheticEvent, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import "./ResetPassword.scss";
import { resetPasswordService } from "../services/authService";

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [searchParam] = useSearchParams();
  const token = searchParam.get("token");

  const navigate = useNavigate();

  const request = {
    password,
  };

  const handleReset = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (password.length >= 6) {
      if (password === confirmPassword) {
        try {
          await resetPasswordService(request, token);
          setSuccess(true);
          setError(false);
        } catch (error: any) {
          setSuccess(false);
          setError(true);
          setErrorMessage(error.response.data);
        }
      } else {
        setSuccess(false);
        setError(true);
        setErrorMessage("Password must match");
      }
    } else {
      setSuccess(false);
      setError(true);
      setErrorMessage("Your password should be longer than 6 characters");
    }
  };

  return (
    <Container>
      <div className="reset-password-container">
        <div className="reset-password-section">
          <h2>reset your password</h2>
          <Form onSubmit={handleReset}>
            <Form.Group className="my-3" controlId="password">
              <InputGroup>
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="my-3" controlId="confirmPassword">
              <InputGroup>
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
            <div className="btn-container mt-3">
              <Button variant="primary" type="submit" className="btn btn-sm">
                Reset
              </Button>
            </div>
            {success && (
              <div>
                <div className="alert alert-success mt-2">
                  Your password has changed
                </div>
                <Button
                  variant="primary"
                  type="submit"
                  className="btn btn-sm"
                  onClick={(e) => navigate("/candidate/login")}
                >
                  Login
                </Button>
              </div>
            )}
            {error && (
              <div className="alert alert-danger mt-2">{errorMessage}</div>
            )}
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default ResetPasswordScreen;
