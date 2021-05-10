import React from "react";
import { Card, Form, Button } from "react-bootstrap";

const CreditCard = () => {
  return (
    <Card>
      <Card.Header>Credit Card</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Control type="text" placeholder="Card Number" />
          </Form.Group>
          <Form.Group>
            <Form.Control type="text" placeholder="Name" />
          </Form.Group>
          <Button variant="primary" block>
            Pay
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreditCard;
