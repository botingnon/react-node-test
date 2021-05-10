import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchFarms, selectAllFarms } from "../../store/reducers/Farms";
import {
  selectedFarm,
  setSelectedFarm,
  fetchGeocode
} from "../../store/reducers/App";

import PanelInfo from "./PanelInfo";
import Chart from "./Chart";

const FarmDetail = () => {
  const dispatch = useDispatch();
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
        <Chart farm_id={farm_id} />
        <PanelInfo farm={farm} />
      </>
    );
  }

  return <>{content}</>;
};

export default FarmDetail;
