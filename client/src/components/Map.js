import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useSelector } from "react-redux";

import { selectedFarm } from "../store/reducers/App";

import "../styles/map.css";

const Map = () => {
  const history = useHistory();
  const farm = useSelector(selectedFarm);
  const [map, setMap] = useState(null);
  const zoom = 14;

  useEffect(() => {
    if (!farm || !map) return;

    map.setView([farm.latitude, farm.longitude], zoom);
  }, [farm]);

  const style = () => {
    return {
      color: "#aaa",
      weight: 1,
      fillOpacity: 0.7,
      fillColor: "#ccc"
    };
  };

  /**
   * Click event, redirect to detail pages
   * @function handleClick
   */
  const handleClick = () => {
    history.push(`/app/farms/${farm.farm_id}/detail`);
  };

  return (
    farm && (
      <MapContainer
        center={[farm.latitude, farm.longitude]}
        zoom={zoom}
        scrollWheelZoom={false}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {farm.geoJson && (
          <GeoJSON
            key={farm.farm_id}
            data={farm.geoJson}
            style={style}
            eventHandlers={{
              click: handleClick
            }}
          />
        )}
      </MapContainer>
    )
  );
};

export default withRouter(Map);
