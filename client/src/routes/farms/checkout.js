import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import { fetchFarms, selectAllFarms } from "../../store/reducers/Farms";
import {
  paymentMethod,
  selectedFarm,
  setSelectedFarm,
  fetchGeocode
} from "../../store/reducers/App";

import Header from "../../components/Header";
import Offer from "../../components/FarmCheckout/Offer";
import PaymentMethod from "../../components/FarmCheckout/PaymentMethod";
import PayPal from "../../components/FarmCheckout/PayPal";
import CreditCard from "../../components/FarmCheckout/CreditCard";

const FarmsCheckout = () => {
  const dispatch = useDispatch();
  const radioValue = useSelector(paymentMethod);
  const { farm_id } = useParams();
  const farms = useSelector(selectAllFarms);
  const farm = useSelector(selectedFarm);
  const farmStatus = useSelector(state => state.farms.status);
  const error = useSelector(state => state.farms.error);

  useEffect(() => {
    if (farm || !farm_id) {
      return;
    }

    if (farmStatus === "idle") {
      dispatch(fetchFarms());
    }

    if (farms.length) {
      const farm = farms.filter(item => item.farm_id == farm_id).pop();
      if (farm) {
        dispatch(setSelectedFarm(farm));
        dispatch(fetchGeocode(farm));
      }
    }
  }, [farms, farmStatus, dispatch]);

  let content;
  if (farmStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (farmStatus === "failed") {
    content = <div>{error}</div>;
  } else {
    content = (
      <>
        <Header info={true} />
        <Row className="mt-3">
          <Col>
            <Row>
              <Col>
                <Offer />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <PaymentMethod />
              </Col>
            </Row>
          </Col>
          <Col>
            {radioValue === "1" && <PayPal />}
            {radioValue === "2" && <CreditCard />}
          </Col>
        </Row>
      </>
    );
  }

  return <>{content}</>;
};

export default FarmsCheckout;
