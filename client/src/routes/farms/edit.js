import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import {
  selectFarmById,
  fetchFarms,
  addUpdateFarm,
  selectFarmIds
} from "../../store/reducers/Farms";

import {
  resetAdapter,
  selectAll
} from "../../store/reducers/NdviPrecipitation";

import Header from "../../components/Header";
import NdviPrecipitation from "../../components/FarmEdit/NdviPrecipitation";

const FarmsEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const { farm_id } = useParams();
  const farm = useSelector(state => selectFarmById(state, farm_id));
  const farmNvdiPrecipitation = useSelector(selectAll);
  const farmStatus = useSelector(state => state.farms.status);
  const error = useSelector(state => state.farms.error);
  const [farmForm, setfarmForm] = useState({
    farm_id: 0,
    name: "",
    latitude: "",
    longitude: "",
    culture: "",
    variety: "",
    total_area: "",
    yield_estimation: "",
    price: "",
    geoJson: ""
  });

  const ids = useSelector(state => selectFarmIds(state));
  let nextId = Math.max(...ids, 0) + 1;

  useEffect(() => {
    if (farmStatus === "idle") {
      dispatch(fetchFarms());
    }

    if (farmStatus === "succeeded") {
      setfarmForm({
        ...farmForm,
        ...farm,
        geoJson: farm && farm.geoJson ? JSON.stringify(farm.geoJson) : ""
      });
      nextId = Math.max(...ids) + 1;
    }

    dispatch(resetAdapter());
  }, [farmStatus, dispatch]);

  /**
   * Handle the input change and changes the form state
   * @function handleChange
   * @param {String} key - Form field key
   * @returns {Function} On change event handler
   */
  const handleChange = key => ({ target }) => {
    setfarmForm({ ...farmForm, [key]: target.value });
  };

  /**
   * Handle the submit form
   * @function handleSubmit
   * @returns {Function} On submit event handler
   */
  const handleSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      let { farm_id } = farmForm;
      if (farm_id === 0) {
        farm_id = nextId;
      }
      const data = {
        ...farmForm,
        farm_id,
        price: parseFloat(farmForm.price),
        latitude: parseFloat(farmForm.latitude),
        longitude: parseFloat(farmForm.longitude),
        total_area: parseFloat(farmForm.total_area),
        yield_estimation: parseFloat(farmForm.yield_estimation),
        geoJson: farmForm.geoJson ? JSON.parse(farmForm.geoJson) : null,
        ndvi_precipitation: farmNvdiPrecipitation || []
      };

      dispatch(addUpdateFarm(data));
      history.push("/app/farms");
    }

    setValidated(true);
  };

  if (farmStatus === "loading") {
    return <div className="loader">Loading...</div>;
  } else if (farmStatus === "failed") {
    return <div>{error}</div>;
  } else {
    return (
      <>
        <Header info={false} />
        <Row className="mt-3">
          <Col>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Farm
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Farm"
                    required
                    value={farmForm.name}
                    onChange={handleChange("name")}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Latitude
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Latitude"
                    required
                    value={farmForm.latitude}
                    onChange={handleChange("latitude")}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Longitude
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Longitude"
                    required
                    value={farmForm.longitude}
                    onChange={handleChange("longitude")}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Culture
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Culture"
                    required
                    value={farmForm.culture}
                    onChange={handleChange("culture")}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Variety
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Variety"
                    required
                    value={farmForm.variety}
                    onChange={handleChange("variety")}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Total area
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Total area"
                    required
                    value={farmForm.total_area}
                    onChange={handleChange("total_area")}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Yield estimation
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Yield estimation"
                    required
                    value={farmForm.yield_estimation}
                    onChange={handleChange("yield_estimation")}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Price
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Price"
                    required
                    value={farmForm.price}
                    onChange={handleChange("price")}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  geoJSON
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="textarea"
                    placeholder="geoJSON"
                    required
                    value={farmForm.geoJson}
                    onChange={handleChange("geoJson")}
                    rows={5}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                  <NdviPrecipitation farm_id={farm_id} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button
                    type="button"
                    className="mr-5"
                    onClick={() => history.push("/app/farms")}
                    variant="danger"
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit form</Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
};

export default withRouter(FarmsEdit);
