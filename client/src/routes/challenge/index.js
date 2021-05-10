import React, { useState } from "react";
import { Button, Col, InputGroup, Form, Row } from "react-bootstrap";

import Header from "../../components/Header";
import * as api from "../../service/challenge";

const Challenge = () => {
  const [validated, setValidated] = useState(true);
  const [code, setCode] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");

  /**
   * Handle the input change and changes the code state
   * @function handleCode
   * @returns {Function} On change event handler
   */
  const handleCode = ({ target }) => setCode(target.value);

  /**
   * Handle the form submit and encode code string
   * @function handleCode
   * @returns {Function} On submit event handler
   */
  const handleEncode = async event => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (form.checkValidity() === false) {
      return;
    }

    setEncoded("");
    setDecoded("");

    const encode = await api.encode(code);

    setEncoded(encode);
  };

  /**
   * Handle the input click and decode code string
   * @function handleCode
   * @returns {Function} On click event handler
   */
  const handleDecode = async () => {
    const decode = await api.decode(encoded);
    setDecoded(decode);
  };

  return (
    <>
      <Header info={false} />
      <Row className="mt-3">
        <Col>
          <Form noValidate validated={validated} onSubmit={handleEncode}>
            <InputGroup className="mb-3">
              <Form.Control
                type="number"
                min="1"
                max="99999999"
                name="code"
                required
                value={code}
                onChange={handleCode}
                placeholder="numeric code (max. 8 length)"
              />
              <InputGroup.Append>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={code.length > 8}
                >
                  encode
                </Button>
              </InputGroup.Append>
              <Form.Control.Feedback type="invalid">
                numeric code with max. 8 length
              </Form.Control.Feedback>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={encoded}
            readOnly
          />
        </Col>
        <Col className="text-center">
          <Button
            variant="primary"
            onClick={handleDecode}
            disabled={encoded.length === 0}
          >
            decode
          </Button>
        </Col>
        <Col>
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={decoded}
            readOnly
          />
        </Col>
      </Row>
    </>
  );
};

export default Challenge;
