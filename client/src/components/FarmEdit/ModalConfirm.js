import React from "react";
import { PropTypes } from "prop-types";
import { Modal, Button } from "react-bootstrap";

const ModalConfirm = props => {
  const { show } = props;

  return (
    <Modal show={show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>Confirm exclusion from the farm?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          No
        </Button>
        <Button variant="danger" onClick={props.onConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ModalConfirm.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default ModalConfirm;
