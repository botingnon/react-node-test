import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, ButtonGroup, ToggleButton } from "react-bootstrap";

import { setPaymentMethod, paymentMethod } from "../../store/reducers/App";

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const radioValue = useSelector(paymentMethod);
  const radios = [
    { name: "Pay Pal", value: "1" },
    { name: "Credit Card", value: "2" }
  ];

  return (
    <Card>
      <Card.Header>Pay with</Card.Header>
      <Card.Body>
        <ButtonGroup toggle>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="outline-primary"
              size="lg"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={e => dispatch(setPaymentMethod(e.currentTarget.value))}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
};

export default PaymentMethod;
