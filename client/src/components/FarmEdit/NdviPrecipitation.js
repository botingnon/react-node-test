import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Table } from "react-bootstrap";
import moment from "moment";
import uuid from "react-uuid";

import {
  fetchData,
  selectAll,
  addNew,
  remove
} from "../../store/reducers/NdviPrecipitation";

import ModalNdvi from "./ModalNdvi";

import "../../styles/ndvitable.css";

const NdviPrecipitation = props => {
  const { farm_id } = props;
  const dispatch = useDispatch();
  const rows = useSelector(selectAll);
  const status = useSelector(state => state.ndviprecipitation.status);
  const error = useSelector(state => state.ndviprecipitation.error);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (status === "idle" && farm_id > 0) {
      dispatch(fetchData(farm_id));
    }
  }, [farm_id, status, dispatch]);

  /**
   * Click close modal button
   * @function handlerModelClose
   */
  const handlerModelClose = () => {
    setShow(false);
  };

  /**
   * Click confirm modal button
   * @function handlerModelConfirm
   */
  const handlerModelConfirm = item => {
    setShow(false);
    item._id = uuid();

    dispatch(addNew(item));
  };

  /**
   * Click add button
   * @params farm_id
   * @function handleAdd
   */
  const handleAdd = () => {
    setShow(true);
  };

  /**
   * Click delete button
   * @params id
   * @function handleDelete
   */
  const handleDelete = id => {
    dispatch(remove(id));
  };

  let content;

  if (status === "loading") {
    content = <div className="loading">Loading...</div>;
  } else if (status === "succeeded" || status === "idle") {
    content = (
      <>
        <ModalNdvi
          show={show}
          onClose={handlerModelClose}
          onConfirm={handlerModelConfirm}
        />
        <Card>
          <Card.Header>
            <h5 className="float-left">NDVI - Precipitation</h5>
            <Button
              variant="primary"
              className="float-right"
              size="sm"
              onClick={handleAdd}
            >
              Add new
            </Button>
          </Card.Header>
          <Card.Body className="p-0 table-ndvi">
            <Table hover size="sm" className="m-0" responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>NDVI</th>
                  <th>Precipitation</th>
                  <th width="50">Action</th>
                </tr>
              </thead>
              <tbody>{rows.map(renderRow)}</tbody>
            </Table>
          </Card.Body>
        </Card>
      </>
    );
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  function renderRow(item, index) {
    return (
      <tr key={index}>
        <td>{moment(item.date).format("MM/DD/YYYY")}</td>
        <td>{item.ndvi}</td>
        <td>{item.precipitation}</td>
        <td>
          <Button
            variant="danger"
            className="float-right"
            size="sm"
            onClick={() => handleDelete(item._id)}
          >
            delete
          </Button>
        </td>
      </tr>
    );
  }

  return <>{content}</>;
};

NdviPrecipitation.propTypes = {
  farm_id: PropTypes.string
};

export default NdviPrecipitation;
