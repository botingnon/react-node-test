import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "../../service/auth";
import { PropTypes } from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Button";

import { setUser } from "../../store/reducers/User";

import "../../styles/login.css";

const Login = () => {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    email: "admin@admin.com",
    password: "admin"
  });
  const [errors, setErrors] = useState(false);

  /**
   * Handle the input change and changes the form state
   * @function handleChange
   * @param {String} key - Form field key
   * @returns {Function} On change event handler
   */
  const handleChange = key => ({ target }) => {
    setLoginForm({ ...loginForm, [key]: target.value });
  };

  /**
   * Submit the login form and handles the response
   * @function handleSubmit
   * @param {Event} e - Submit event
   */
  const handleSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();

    const { email, password } = loginForm;
    try {
      setErrors(false);

      const userData = await authenticate(email, password);
      dispatch(setUser(userData));

      document.location = "/";
    } catch (e) {
      dispatch(setUser(null));
      if (e.status == 401) {
        const response = await e.json();
        setErrors(response.message);
        return;
      }

      console.error(e);
    }
  };

  /**
   * Validation form fields
   */
  function validateForm() {
    const { email, password } = loginForm;

    return email.length > 0 && password.length > 0;
  }

  return (
    <div className="Login">
      <Form>
        <Form.Group size="lg" controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            name="email"
            value={loginForm.email}
            onChange={handleChange("email")}
            placeholder="admin@admin.com"
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            onChange={handleChange("password")}
            value={loginForm.password}
            autoComplete="off"
          />
        </Form.Group>

        <Button
          block
          size="lg"
          type="button"
          disabled={!validateForm()}
          onClick={handleSubmit}
        >
          Login
        </Button>

        {errors && (
          <Alert block variant="danger">
            {errors}
          </Alert>
        )}
      </Form>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.object
};

export default withRouter(Login);
