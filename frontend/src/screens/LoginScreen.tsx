import { SyntheticEvent, useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/AuthenticationSlice";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootStateOrAny) => state.auth.isLoggedIn
  );

  const navigate = useNavigate();

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    dispatch(authActions.login(data));
    navigate("/dashboard");
  };

  if (isLoggedIn) {
    navigate("/dashboard");
  }

  return (
    <FormContainer>
      <h1>Login</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
