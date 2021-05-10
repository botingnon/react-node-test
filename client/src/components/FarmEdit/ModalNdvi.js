import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const ModalNdvi = props => {
  const { show, onClose, onConfirm } = props;

  const initialState = () => ({
    date: "",
    ndvi: "",
    precipitation: ""
  });

  const [formData, setFormData] = useState(initialState());

  /**
   * Handle the input change and changes the form state
   * @function handleChange
   * @param {String} key - Form field key
   * @returns {Function} On change event handler
   */
  const handleChange = key => ({ target }) => {
    setFormData({ ...formData, [key]: target.value });
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add NDVI - Precipitation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm="4">
              Date
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="date"
                placeholder="Date"
                value={formData.date}
                onChange={handleChange("date")}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="4">
              NDVI
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                step=".01"
                placeholder="NDVI"
                value={formData.nvdi}
                onChange={handleChange("ndvi")}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="4">
              Precipitation
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                step=".01"
                placeholder="Precipitation"
                value={formData.precipitation}
                onChange={handleChange("precipitation")}
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            onConfirm(formData);
            setFormData(initialState());
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ModalNdvi.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default ModalNdvi;
