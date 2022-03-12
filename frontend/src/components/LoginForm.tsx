import { SyntheticEvent, useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions } from "../store/AuthenticationSlice";
import { MdMail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    dispatch(authActions.login(data));
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
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

        <Form.Group className="my-3" controlId="password">
          <InputGroup>
            <InputGroup.Text>
              <FaLock />
            </InputGroup.Text>
            <Form.Control
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputGroup.Text
              className="toggle-show"
              onClick={(e: any) => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <div className="link-container">
          <a href="/forgot-password">Forgot your password?</a>
        </div>
        <div className="btn-container mt-3">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
