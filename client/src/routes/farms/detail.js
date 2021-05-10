import React from "react";
import { Col, Row } from "react-bootstrap";

import Header from "../../components/Header";
import Map from "../../components/Map";
import FarmDetail from "../../components/FarmDetail";

const FarmsDetail = () => {
  return (
    <>
      <Header info={true} />
      <Row className="mt-3">
        <Col>
          <Map />
        </Col>
        <Col>
          <FarmDetail />
        </Col>
      </Row>
    </>
  );
};

export default FarmsDetail;
