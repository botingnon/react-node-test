import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/App";
import userReducer from "./reducers/User";
import farmsReducer from "./reducers/Farms";
import chartReducer from "./reducers/Chart";
import ndviPrecipitation from "./reducers/NdviPrecipitation";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    farms: farmsReducer,
    chart: chartReducer,
    ndviprecipitation: ndviPrecipitation
  }
});
