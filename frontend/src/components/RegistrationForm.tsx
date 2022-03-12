import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registrationActions } from "../store/RegistrationSlice";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface Props {
  role: string;
}

const RegistrationForm = ({ role }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const dispatch = useDispatch();

  const validate = yup.object({
    firstName: yup
      .string()
      .min(2, "Must be 2 characters or more")
      .max(20, "Can't be longer than 20 characters")
      .required("First name is required"),
    lastName: yup
      .string()
      .min(2, "Must be 2 characters or more")
      .max(20, "Can't be longer than 20 characters")
      .required("Last name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  interface IRegistrationRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }

  const registrationForm: IRegistrationRequest = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role,
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={(values) => {
        registrationForm.firstName = values.firstName;
        registrationForm.lastName = values.lastName;
        registrationForm.email = values.email;
        registrationForm.password = values.password;
        console.log(registrationForm);
        dispatch(registrationActions.register(registrationForm));
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <>
          <Form onSubmit={handleSubmit}>
            <Row className="my-0">
              <Col>
                <Form.Group className="my-3" controlId="formikControl1">
                  <InputGroup>
                    <InputGroup.Text>
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.firstName && !errors.firstName}
                      isInvalid={touched.firstName && !!errors.firstName}
                    />
                    {touched.firstName === true || errors.firstName ? (
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    ) : null}
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="my-3" controlId="formikControl2">
                  <InputGroup>
                    <InputGroup.Text>
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.lastName && !errors.lastName}
                      isInvalid={touched.lastName && !!errors.lastName}
                    />
                    {touched.lastName && errors.lastName ? (
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    ) : null}
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formikControl3">
              <InputGroup>
                <InputGroup.Text>
                  <MdEmail />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                />
                {touched.email && errors.email ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                ) : null}
              </InputGroup>
            </Form.Group>

            <Form.Group className="my-3" controlId="formikControl4">
              <InputGroup>
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
                <Form.Control
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Choose your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                <InputGroup.Text
                  className="toggle-show"
                  onClick={(e: any) => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : null}
              </InputGroup>
            </Form.Group>

            <Form.Group className="my-3" controlId="formikControl5">
              <InputGroup>
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
                <Form.Control
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.confirmPassword && !errors.confirmPassword}
                  isInvalid={
                    touched.confirmPassword && !!errors.confirmPassword
                  }
                />
                <InputGroup.Text
                  className="toggle-show"
                  onClick={(e: any) =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                >
                  {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
                {touched.confirmPassword && errors.confirmPassword ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                ) : null}
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit" className="float-right">
              Create Account
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default RegistrationForm;
