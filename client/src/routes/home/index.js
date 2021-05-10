import React from "react";
import { Col, Row } from "react-bootstrap";

import Header from "../../components/Header";
import Map from "../../components/Map";
import FarmList from "../../components/FarmList";

const Home = () => {
  return (
    <>
      <Header info={false} />
      <Row className="mt-3">
        <Col>
          <Map />
        </Col>
        <Col>
          <FarmList />
        </Col>
      </Row>
    </>
  );
};

export default Home;
