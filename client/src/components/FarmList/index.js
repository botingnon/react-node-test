import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Accordion } from "react-bootstrap";

import { fetchFarms, selectAllFarms } from "../../store/reducers/Farms";
import {
  activeSearch,
  selectedFarm,
  setSelectedFarm,
  fetchGeocode
} from "../../store/reducers/App";

import FarmItem from "./FarmItem";
import Search from "./Search";

const FarmList = () => {
  const dispatch = useDispatch();
  const search = useSelector(activeSearch);
  const farm = useSelector(selectedFarm);
  const farms = useSelector(selectAllFarms);
  const farmsFiltered = farms.filter(item => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.culture.toLowerCase().includes(search.toLowerCase())
    );
  });
  const farmStatus = useSelector(state => state.farms.status);
  const error = useSelector(state => state.farms.error);

  useEffect(() => {
    if (farmStatus === "idle") {
      dispatch(fetchFarms());
    }

    if (farmsFiltered.length) {
      dispatch(setSelectedFarm(farmsFiltered[0]));
      dispatch(fetchGeocode(farmsFiltered[0]));
    }
  }, [farms, farmStatus, dispatch]);

  /**
   * Handle select farm
   * @params {number} farm_id
   * @function selectItem
   */
  function selectItem(farm_id) {
    if (!farm_id) return;

    const farm = farms.filter(item => item.farm_id === farm_id).pop();
    dispatch(setSelectedFarm(farm));
    dispatch(fetchGeocode(farm));
  }

  let content;

  if (farmStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (farmStatus === "succeeded") {
    if (farmsFiltered.length === 0) {
      content = (
        <>
          <Search />
          <div>Farm not found</div>
        </>
      );
    } else {
      const rows = farmsFiltered.map(renderFarmItem);
      const farm_id = farm ? farm.farm_id : farmsFiltered[0].farm_id;
      content = (
        <>
          <Search />
          <Accordion defaultActiveKey={farm_id} onSelect={selectItem}>
            {rows}
          </Accordion>
        </>
      );
    }
  } else if (farmStatus === "failed") {
    content = <div>{error}</div>;
  }

  function renderFarmItem(farm, index) {
    return <FarmItem key={index} farm={farm} />;
  }

  return <>{content}</>;
};

export default FarmList;
