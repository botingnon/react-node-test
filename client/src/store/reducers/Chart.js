import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit";
import uuid from "react-uuid";

import { fecthChartData } from "../../service/farm";

const chartAdapter = createEntityAdapter({
  selectId: () => uuid()
});

const initialState = chartAdapter.getInitialState({
  status: "idle",
  error: null
});

export const fetchChart = createAsyncThunk(
  "farms/fetchChart",
  async farm_id => {
    return await fecthChartData(farm_id);
  }
);

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchChart.pending]: state => {
      state.status = "loading";
    },
    [fetchChart.fulfilled]: (state, action) => {
      state.status = "succeeded";
      chartAdapter.upsertMany(state, action.payload);
    },
    [fetchChart.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    }
  }
});

export default chartSlice.reducer;

export const {
  selectAll: selectAllChart,
  selectById: selectChartById
} = chartAdapter.getSelectors(state => state.chart);
