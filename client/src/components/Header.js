import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import { Navbar, Nav, Form, Dropdown, Image } from "react-bootstrap";

import { logout } from "../service/auth";
import { userData, setUser } from "../store/reducers/User";
import { selectedFarm } from "../store/reducers/App";

const Header = props => {
  const { info } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const farm = useSelector(selectedFarm);
  const user = useSelector(userData);

  /**
   * Logout user
   * @function handleLogout
   * @param {Event} e - Submit event
   */
  const handleLogout = async e => {
    e.preventDefault();
    e.stopPropagation();

    logout();

    dispatch(
      setUser({
        name: "",
        email: ""
      })
    );

    history.go("/");
  };

  return (
    <>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/">
          <Image src="/logo192.png" width="45" rounded />
        </Navbar.Brand>
        {info && (
          <Nav className="mr-auto">
            <Navbar.Text>
              <h3>{farm && farm.name}</h3>
            </Navbar.Text>
          </Nav>
        )}

        <Navbar.Collapse className="justify-content-end">
          <Form inline>
            {info && (
              <Nav className="mr-3">
                <Navbar.Text className="truncate">
                  {farm && farm.geocode}
                </Navbar.Text>
              </Nav>
            )}

            <Dropdown>
              <Dropdown.Toggle variant="success" className="text-uppercase">
                {user.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/app/home">Home</Dropdown.Item>
                <Dropdown.Item href="/app/challenge">Challange</Dropdown.Item>
                <Dropdown.Item href="/app/farms">Farms edit</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

Header.propTypes = {
  info: PropTypes.bool
};

export default withRouter(Header);
