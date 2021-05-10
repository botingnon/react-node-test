import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Row, Col, Card, Form, FormControl, InputGroup } from "react-bootstrap";

import { selectedFarm } from "../../store/reducers/App";

const Offer = () => {
  const location = useLocation();
  const method = location.pathname.split("/").pop();
  const farm = useSelector(selectedFarm);
  const price = farm ? farm.price : 0;
  const total_area = farm ? farm.total_area : 0;
  const yield_estimation = farm ? farm.yield_estimation : 0;
  const maxOffer = (total_area * yield_estimation) / 60;

  const [total, setTotal] = useState(price * 1);
  const [qtde, setQtde] = useState(1);

  const isError = qtde > maxOffer;

  useEffect(() => {
    setTotal(qtde * price);
  }, [farm, price, qtde]);

  /**
   * Handler change Yield
   * @function handlerChange
   * @param {Event} e - Change event
   */
  function handlerChange({ target }) {
    setQtde(parseFloat(target.value));
  }

  return (
    farm && (
      <Card>
        <Card.Header>Offer {method}</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Price
              </Form.Label>
              <Col sm="10">
                <InputGroup className="mb-3">
                  <FormControl type="number" defaultValue={price} readOnly />
                  <InputGroup.Append>
                    <InputGroup.Text>$/sac</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Yield
              </Form.Label>
              <Col sm="10">
                <InputGroup className="mb-3">
                  <FormControl
                    type="number"
                    min="1"
                    max={maxOffer}
                    value={qtde || ""}
                    onChange={handlerChange}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>sac</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
                {isError && (
                  <Form.Text className="text-muted text-danger">
                    Maximum production of {yield_estimation * total_area} ton -{" "}
                    {maxOffer.toFixed(2)} sac.
                  </Form.Text>
                )}
              </Col>
            </Form.Group>

            {!isError && (
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Total
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    value={"$" + (total ? total : "")}
                  />
                </Col>
              </Form.Group>
            )}
          </Form>
        </Card.Body>
      </Card>
    )
  );
};

export default Offer;
