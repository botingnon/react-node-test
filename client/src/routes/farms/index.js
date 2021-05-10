import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Table, Button } from "react-bootstrap";
import { withRouter, useHistory } from "react-router-dom";

import {
  fetchFarms,
  selectAllFarms,
  deleteFarm
} from "../../store/reducers/Farms";

import Header from "../../components/Header";
import ModalConfirm from "../../components/FarmEdit/ModalConfirm";

const FarmsList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const farms = useSelector(selectAllFarms);
  const farmStatus = useSelector(state => state.farms.status);
  const error = useSelector(state => state.farms.error);
  const [show, setShow] = useState(false);
  const [farm, setFarm] = useState(null);

  useEffect(() => {
    if (farmStatus === "idle") {
      dispatch(fetchFarms());
    }
  }, [farms, farmStatus, dispatch]);

  let content;

  if (farmStatus === "loading") {
    content = (
      <tr>
        <td colSpan="7">loading...</td>
      </tr>
    );
  } else if (farmStatus === "succeeded") {
    if (farms.length === 0) {
      content = (
        <tr>
          <td colSpan="7">Insert new farm</td>
        </tr>
      );
    } else {
      content = farms.map(renderFarmItem);
    }
  } else if (farmStatus === "failed") {
    content = <div>{error}</div>;
  }

  /**
   * Click edit button
   * @function handleEdit
   * @param {object} farm - farm object
   */
  const handleEdit = farm => {
    history.push(`/app/farms/${farm.farm_id}/edit`);
  };

  /**
   * Click delete button
   * @function handleDelete
   * @param {object} farm - farm object
   */
  const handleDelete = farm => {
    setFarm(farm);
    setShow(true);
  };

  /**
   * Click close modal button
   * @function handlerModelClose
   */
  const handlerModelClose = () => {
    setFarm(null);
    setShow(false);
  };

  /**
   * Click confirm modal button
   * @function handlerModelConfirm
   */
  const handlerModelConfirm = async () => {
    await dispatch(deleteFarm(farm));
    setFarm(null);
    setShow(false);
  };

  /**
   * @function renderFarmItem
   * @param {farm} farm - Farm object
   * @param {number} index
   */
  function renderFarmItem(farm, index) {
    return (
      <tr key={index}>
        <td>{farm.name}</td>
        <td>{farm.culture}</td>
        <td>{farm.variety}</td>
        <td>{farm.total_area}</td>
        <td>{farm.yield_estimation}</td>
        <td>{farm.price.toFixed(2, 10)}</td>
        <td width="180" className="text-center">
          <Button variant="success" size="sm" onClick={() => handleEdit(farm)}>
            edit
          </Button>{" "}
          <Button variant="danger" size="sm" onClick={() => handleDelete(farm)}>
            delete
          </Button>{" "}
        </td>
      </tr>
    );
  }

  return (
    <>
      <Header info={false} />
      <Row className="mt-3">
        <Col>
          <Button
            variant="success"
            size="sm"
            onClick={() => history.push("/app/farms/0/edit")}
          >
            new farm
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Farm</th>
                <th>Culture</th>
                <th>Variety</th>
                <th>Total Area</th>
                <th>Yield Estimation</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </Table>
        </Col>
      </Row>
      <ModalConfirm
        show={show}
        onClose={handlerModelClose}
        onConfirm={handlerModelConfirm}
      />
    </>
  );
};

export default withRouter(FarmsList);
