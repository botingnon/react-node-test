import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Accordion, Button, Card, ListGroup } from "react-bootstrap";

const FarmList = props => {
  const { farm } = props;
  const history = useHistory();

  /**
   * Handle the input click and go to buy page
   * @function handleClickBuy
   * @returns {Function} On click event handler
   */
  const handleClickBuy = () => {
    history.push(`/app/farms/${farm.farm_id}/buy`);
  };

  /**
   * Handle the input click and go to bid page
   * @function handleClickBid
   * @returns {Function} On click event handler
   */
  const handleClickBid = () => {
    history.push(`/app/farms/${farm.farm_id}/bid`);
  };

  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle
          as={Card.Header}
          variant="link"
          eventKey={farm.farm_id}
          className="text-uppercase"
        >
          {farm.name}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={farm.farm_id}>
        <Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <h6>
                Culture
                <small className="text-muted ml-3">{farm.culture}</small>
              </h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>
                Variety
                <small className="text-muted ml-3">{farm.variety}</small>
              </h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>
                Area
                <small className="text-muted ml-3">{farm.total_area} ha</small>
              </h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>
                Yield estimation
                <small className="text-muted ml-3">
                  {farm.yield_estimation} ton/ha
                </small>
              </h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>
                Total
                <small className="text-muted ml-3">
                  {farm.total_area * farm.yield_estimation}
                </small>
              </h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>
                Price
                <small className="text-muted ml-3">${farm.price}</small>
              </h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                variant="success"
                className="mr-3"
                onClick={handleClickBuy}
              >
                buy now
              </Button>
              <Button variant="primary" onClick={handleClickBid}>
                bid
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

FarmList.propTypes = {
  farm: PropTypes.object
};

export default withRouter(FarmList);
