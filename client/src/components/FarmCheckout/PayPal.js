import React from "react";
import { Card, Form, Button, Image } from "react-bootstrap";

const PayPal = () => {
  return (
    <Card>
      <Card.Header>Login Pay Pal</Card.Header>
      <Card.Body className="text-center">
        <Image
          src="/paypal-logo.png"
          width="150"
          rounded
          className="mt-2 mb-4"
        />

        <Form>
          <Form.Group>
            <Form.Control type="email" placeholder="Enter Adrress" />
          </Form.Group>
          <Form.Group>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" block>
            Log In
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PayPal;
